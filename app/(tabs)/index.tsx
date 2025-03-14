import React, { useState, useRef } from 'react';
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
  const daysHeaderScrollRef = useRef<ScrollView>(null);
  const classesScrollRef = useRef<ScrollView>(null);

  const handleHorizontalScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    // Sync the other ScrollView
    if (event.target === classesScrollRef.current) {
      daysHeaderScrollRef.current?.scrollTo({ x: scrollX, animated: false });
    } else {
      classesScrollRef.current?.scrollTo({ x: scrollX, animated: false });
    }
  };

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
        {/* Header Row - Fixed on top */}
        <View style={styles.headerRow}>
          {/* Empty cell for top-left corner */}
          <View style={[styles.cell, styles.headerCell, styles.cornerCell]}>
            <Text style={styles.headerText}>Time</Text>
          </View>

          {/* Day Headers - Scrollable horizontally */}
          <ScrollView
            ref={daysHeaderScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daysHeaderScrollView}
            contentContainerStyle={styles.daysHeaderContent}
            onScroll={handleHorizontalScroll}
            scrollEventThrottle={16}>
            {DAYS.map((day) => (
              <View key={day} style={[styles.cell, styles.headerCell, styles.dayHeaderCell]}>
                <Text style={styles.headerText}>
                  {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Main Content Area - Scrollable both directions */}
        <ScrollView
          style={styles.mainScrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            {/* Time Column - Fixed on left */}
            <View style={styles.timeColumn}>
              {CLASS_TIMES.map((time, index) => (
                <View key={index} style={[styles.cell, styles.timeCell]}>
                  <Text style={styles.timeText}>{time.start}</Text>
                  <Text style={styles.timeText}>{time.end}</Text>
                </View>
              ))}
            </View>

            {/* Class Columns - Scrollable horizontally */}
            <ScrollView
              ref={classesScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.classesScrollView}
              onScroll={handleHorizontalScroll}
              scrollEventThrottle={16}>
              {DAYS.map((day) => (
                <View key={day} style={styles.dayColumn}>
                  {TIMETABLE[day as keyof typeof TIMETABLE].map((subject, index) => {
                    const dayEvents = getEventsByDayAndClass(day, index + 1);
                    return (
                      <View
                        key={index}
                        style={[
                          styles.cell,
                          styles.classCell,
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
          </View>
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
  headerText: {
    fontSize: 16,
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
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    zIndex: 2,
  },
  cornerCell: {
    width: 80,
    height: 40,
  },
  daysHeaderScrollView: {
    flex: 1,
  },
  daysHeaderContent: {
    flexDirection: 'row',
  },
  dayHeaderCell: {
    width: 140,
    height: 40,
  },
  mainScrollView: {
    flex: 1,
  },
  contentContainer: {
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
  classesScrollView: {
    flex: 1,
  },
  dayColumn: {
    width: 140,
  },
  cell: {
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
  timeCell: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  classCell: {
    height: 100,
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
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});