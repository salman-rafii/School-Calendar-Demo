import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { TIMETABLE, CLASS_TIMES, useTimetableStore } from '../../store/timetableStore';
import { AddEventModal } from '../../components/AddEventModal';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const COLORS = {
  Chinese: '#fecaca',
  Math: '#bfdbfe',
  English: '#bbf7d0',
  Chemistry: '#ddd6fe',
  Biology: '#fde68a',
  'Scientific reading': '#fed7aa',
  'Science and Creative Thinking': '#c7d2fe',
  'Living Technology': '#a5b4fc',
  'Alternative Learning': '#fecaca',
  History: '#bfdbfe',
  Taiwanese: '#bbf7d0',
  Society: '#ddd6fe',
  PE: '#fde68a',
  Club: '#fed7aa',
  'Elective Subjects': '#c7d2fe',
};

export default function TimetableScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const events = useTimetableStore((state) => state.events);

  const getEventsByDayAndClass = (day: string, classNumber: number) => {
    return events.filter(
      (event) => event.day === day && event.classNumber === classNumber
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>School Timetable</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}>
          <Plus color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.timetableWrapper}>
        {/* Fixed Time Column */}
        <View style={styles.timeColumn}>
          <View style={[styles.cell, styles.headerCell]}>
            <Text style={styles.headerText}>Time</Text>
          </View>
          {CLASS_TIMES.map((time, index) => (
            <View key={index} style={[styles.cell, styles.timeCell]}>
              <Text style={styles.timeText}>{time.start}</Text>
              <Text style={styles.timeText}>{time.end}</Text>
            </View>
          ))}
        </View>

        {/* Scrollable Content */}
        <ScrollView style={styles.verticalScrollView}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
            contentContainerStyle={styles.scrollContent}>
            {DAYS.map((day) => (
              <View key={day} style={styles.dayColumn}>
                <View style={[styles.cell, styles.headerCell]}>
                  <Text style={styles.headerText}>
                    {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                  </Text>
                </View>
                {TIMETABLE[day as keyof typeof TIMETABLE].map((subject, index) => {
                  const dayEvents = getEventsByDayAndClass(day, index + 1);
                  return (
                    <View
                      key={index}
                      style={[
                        styles.cell,
                        { backgroundColor: COLORS[subject as keyof typeof COLORS] || '#f3f4f6' },
                      ]}>
                      <Text style={styles.subjectText}>{subject}</Text>
                      {dayEvents.map((event) => (
                        <View
                          key={event.id}
                          style={[
                            styles.eventBadge,
                            {
                              backgroundColor:
                                event.type === 'homework' ? '#6366f1' : '#ef4444',
                            },
                          ]}>
                          <Text style={styles.eventText}>{event.name}</Text>
                        </View>
                      ))}
                    </View>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </View>

      <AddEventModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6366f1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timetableWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  timeColumn: {
    width: 80,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 1,
  },
  verticalScrollView: {
    flex: 1,
  },
  horizontalScrollView: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'row',
  },
  dayColumn: {
    width: 140,
  },
  cell: {
    height: 100,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 4,
  },
  headerCell: {
    height: 40,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
  },
  timeCell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  subjectText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  eventBadge: {
    padding: 4,
    borderRadius: 4,
    marginTop: 2,
  },
  eventText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
});