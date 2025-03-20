import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react-native';
import { format, isToday, isSameDay } from 'date-fns';
import {
  TIMETABLE,
  CLASS_TIMES,
  useTimetableStore,
  getDayOfWeek,
  getDateForDay
} from '../../store/timetableStore';
import { AddEventModal } from '../../components/AddEventModal';

const DAYS_INDEX = [0, 1, 2, 3, 4]; // Monday to Friday indices
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
  const [selectedClass, setSelectedClass] = useState<{ date: Date; classNumber: number; subject: string } | null>(null);
  const {
    events,
    currentWeekStart,
    goToNextWeek,
    goToPreviousWeek,
    resetToCurrentWeek
  } = useTimetableStore();

  const daysHeaderScrollRef = useRef<ScrollView>(null);
  const classesScrollRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false);

  const handleDaysHeaderScroll = (event: any) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    const scrollX = event.nativeEvent.contentOffset.x;
    classesScrollRef.current?.scrollTo({ x: scrollX, animated: false });
    setTimeout(() => {
      isScrolling.current = false;
    }, 50);
  };

  const handleClassesScroll = (event: any) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    const scrollX = event.nativeEvent.contentOffset.x;
    daysHeaderScrollRef.current?.scrollTo({ x: scrollX, animated: false });
    setTimeout(() => {
      isScrolling.current = false;
    }, 50);
  };

  const getEventsByDateAndClass = (date: Date, classNumber: number) => {
    return events.filter(
      (event) => isSameDay(event.date, date) && event.classNumber === classNumber
    );
  };

  const handleClassPress = (date: Date, classNumber: number, subject: string) => {
    setSelectedClass({ date, classNumber, subject });
    setIsModalVisible(true);
  };

  const formatDayHeader = (date: Date) => {
    const isCurrentDay = isToday(date);
    return (
      <View style={styles.dayHeaderContent}>
        <Text style={[styles.dayText, isCurrentDay && styles.currentDayText]}>
          {format(date, 'EEE')}
        </Text>
        <Text style={[styles.dateText, isCurrentDay && styles.currentDayText]}>
          {format(date, 'd')}
        </Text>
        {isCurrentDay && <View style={styles.currentDayIndicator} />}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>School Calendar</Text>
          <View style={styles.navigationControls}>
            <TouchableOpacity onPress={resetToCurrentWeek} style={styles.todayButton}>
              <CalendarDays size={20} color="#6366f1" />
              <Text style={styles.todayButtonText}>Today</Text>
            </TouchableOpacity>
            <View style={styles.weekNavigation}>
              <TouchableOpacity onPress={goToPreviousWeek} style={styles.navButton}>
                <ChevronLeft size={24} color="#4b5563" />
              </TouchableOpacity>
              <Text style={styles.weekText}>
                {format(currentWeekStart, 'MMM d')} - {format(getDateForDay(currentWeekStart, 4), 'MMM d')}
              </Text>
              <TouchableOpacity onPress={goToNextWeek} style={styles.navButton}>
                <ChevronRight size={24} color="#4b5563" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.timetableWrapper}>
          <View style={styles.headerRow}>
            <View style={[styles.cell, styles.headerCell, styles.cornerCell]}>
              <Text style={styles.headerText}>Time</Text>
            </View>

            <ScrollView
              ref={daysHeaderScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.daysHeaderScrollView}
              contentContainerStyle={styles.daysHeaderContent}
              onScroll={handleDaysHeaderScroll}
              scrollEventThrottle={1}
              directionalLockEnabled
              snapToInterval={140}
              pagingEnabled={false}
              disableIntervalMomentum={true}
              decelerationRate="fast">
              {DAYS_INDEX.map((dayIndex) => {
                const date = getDateForDay(currentWeekStart, dayIndex);
                return (
                  <View
                    key={dayIndex}
                    style={[
                      styles.cell,
                      styles.headerCell,
                      styles.dayHeaderCell,
                      isToday(date) && styles.currentDayHeaderCell
                    ]}>
                    {formatDayHeader(date)}
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <ScrollView
            style={styles.mainScrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <View style={styles.timeColumn}>
                {CLASS_TIMES.map((time, index) => (
                  <View key={index} style={[styles.cell, styles.timeCell]}>
                    <Text style={styles.timeText}>{time.start}</Text>
                    <Text style={styles.timeText}>{time.end}</Text>
                  </View>
                ))}
              </View>

              <ScrollView
                ref={classesScrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.classesScrollView}
                onScroll={handleClassesScroll}
                scrollEventThrottle={2}
                directionalLockEnabled
                snapToInterval={140}
                pagingEnabled={false}
                disableIntervalMomentum={true}
                decelerationRate="fast">
                {DAYS_INDEX.map((dayIndex) => {
                  const date = getDateForDay(currentWeekStart, dayIndex);
                  const dayName = getDayOfWeek(date);
                  return (
                    <View key={dayIndex} style={styles.dayColumn}>
                      {TIMETABLE[dayName as keyof typeof TIMETABLE].map((subject, index) => {
                        const dayEvents = getEventsByDateAndClass(date, index + 1);
                        return (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.cell,
                              styles.classCell,
                              isToday(date) && styles.currentDayCell,
                              { backgroundColor: COLORS[subject as keyof typeof COLORS] || '#f3f4f6' },
                            ]}
                            onPress={() => handleClassPress(date, index + 1, subject)}>
                            <Text style={styles.subjectText}>{subject}</Text>
                            <View style={styles.eventsContainer}>
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
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>

      {selectedClass && (
        <AddEventModal
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setSelectedClass(null);
          }}
          selectedClass={selectedClass}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  todayButtonText: {
    marginLeft: 4,
    fontWeight: '500',
    color: '#6366f1',
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 8,
  },
  weekText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    marginTop: 2,
  },
  currentDayText: {
    color: '#6366f1',
    fontWeight: 'bold',
  },
  currentDayIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366f1',
  },
  dayHeaderContent: {
    alignItems: 'center',
  },
  timetableWrapper: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    zIndex: 2,
    width: '100%',
    maxWidth: 780,
  },
  cornerCell: {
    width: 80,
    height: 60,
  },
  daysHeaderScrollView: {
    flex: 1,
  },
  daysHeaderContent: {
    flexDirection: 'row',
  },
  dayHeaderCell: {
    width: 140,
    height: 60,
  },
  currentDayHeaderCell: {
    borderBottomColor: '#6366f1',
    borderBottomWidth: 2,
  },
  currentDayCell: {
    borderLeftColor: '#6366f1',
    borderLeftWidth: 2,
    borderRightColor: '#6366f1',
    borderRightWidth: 2,
  },
  mainScrollView: {
    flex: 1,
    width: '100%',
    maxWidth: 780,
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
    height: 60,
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
  eventsContainer: {
    marginTop: 4,
  },
  eventBadge: {
    padding: 4,
    borderRadius: 4,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
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