import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, Edit2 } from 'lucide-react-native';
import { format, isToday } from 'date-fns';
import { useTimetableStore, TIMETABLE, CLASS_TIMES, getDayOfWeek } from '../../store/timetableStore';

export default function HomeworkScreen() {
  const { events, removeEvent, updateEvent } = useTimetableStore();
  const [editingEventId, setEditingEventId] = React.useState<string | null>(null);
  const [editedName, setEditedName] = React.useState<string>('');

  // Sort events by date and class number
  const sortedEvents = [...events].sort((a, b) => {
    // Sort by date first
    const dateComparison = a.date.getTime() - b.date.getTime();
    if (dateComparison !== 0) return dateComparison;

    // Then by class number
    return a.classNumber - b.classNumber;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Homework</Text>
      <ScrollView style={styles.scrollView}>
        {sortedEvents.map((event) => {
          const dayName = getDayOfWeek(event.date);
          const today = isToday(event.date);

          return (
            <View
              key={event.id}
              style={[
                styles.eventCard,
                today && styles.todayEventCard
              ]}>
              <View style={styles.eventHeader}>
                <View>
                  <Text style={styles.dateText}>
                    {format(event.date, 'EEE, MMM d')}
                    {today && <Text style={styles.todayBadge}> Today</Text>}
                  </Text>
                  <Text style={styles.timeText}>
                    {CLASS_TIMES[event.classNumber - 1].start} -{' '}
                    {CLASS_TIMES[event.classNumber - 1].end}
                  </Text>
                </View>
                {editingEventId !== event.id ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setEditingEventId(event.id);
                        setEditedName(event.name);
                      }}
                      style={[styles.editButton, { marginRight: 8 }]}
                    >
                      <Edit2 size={20} color="#6366f1" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeEvent(event.id)}
                      style={styles.deleteButton}
                    >
                      <Trash2 size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => removeEvent(event.id)}
                    style={styles.deleteButton}
                  >
                    <Trash2 size={20} color="#ef4444" />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.subjectText}>
                {TIMETABLE[dayName as keyof typeof TIMETABLE][event.classNumber - 1]}
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
              {
                editingEventId === event.id ? (
                  <>
                    <TextInput
                      style={[styles.eventNameText, { borderColor: '#ccc', borderWidth: 1, padding: 4 }]}
                      value={editedName}
                      onChangeText={setEditedName}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                      <TouchableOpacity
                        onPress={() => setEditingEventId(null)}
                        style={[styles.cancelButton, { marginRight: 8 }]}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          updateEvent(event.id, { name: editedName });
                          setEditingEventId(null);
                        }}
                        style={styles.saveButton}
                      >
                        <Text style={styles.buttonText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <TouchableOpacity onLongPress={() => {
                    setEditingEventId(event.id);
                    setEditedName(event.name);
                  }}>
                    <Text style={styles.eventNameText}>{event.name}</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          );
        })}
        {events.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No homework yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add new events from the calendar tab
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todayEventCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  todayBadge: {
    color: '#6366f1',
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  editButton: {
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
  cancelButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});