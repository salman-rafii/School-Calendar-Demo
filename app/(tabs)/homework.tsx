import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2 } from 'lucide-react-native';
import { useTimetableStore, TIMETABLE, CLASS_TIMES } from '../../store/timetableStore';

export default function HomeworkScreen() {
  const { events, removeEvent } = useTimetableStore();

  const sortedEvents = [...events].sort((a, b) => {
    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.classNumber - b.classNumber;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Homework & Quizzes</Text>
      <ScrollView style={styles.scrollView}>
        {sortedEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View>
                <Text style={styles.dayText}>
                  {event.day.charAt(0).toUpperCase() + event.day.slice(1)}
                </Text>
                <Text style={styles.timeText}>
                  {CLASS_TIMES[event.classNumber - 1].start} -{' '}
                  {CLASS_TIMES[event.classNumber - 1].end}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeEvent(event.id)}
                style={styles.deleteButton}>
                <Trash2 size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
            <Text style={styles.subjectText}>
              {TIMETABLE[event.day as keyof typeof TIMETABLE][event.classNumber - 1]}
            </Text>
            <View
              style={[
                styles.eventBadge,
                {
                  backgroundColor:
                    event.type === 'homework' ? '#6366f1' : '#ef4444',
                },
              ]}>
              <Text style={styles.eventTypeText}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Text>
            </View>
            <Text style={styles.eventNameText}>{event.name}</Text>
          </View>
        ))}
        {events.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No homework or quizzes yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add new events from the timetable tab
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  subjectText: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 8,
  },
  eventBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  eventTypeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  eventNameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
});