import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { TIMETABLE, CLASS_TIMES, useTimetableStore } from '../store/timetableStore';

interface AddEventModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function AddEventModal({ isVisible, onClose }: AddEventModalProps) {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedClass, setSelectedClass] = useState(1);
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<'homework' | 'quiz'>('homework');
  const addEvent = useTimetableStore((state) => state.addEvent);

  const handleSubmit = () => {
    if (eventName.trim()) {
      addEvent({
        day: selectedDay,
        classNumber: selectedClass,
        name: eventName.trim(),
        type: eventType,
      });
      Keyboard.dismiss();
      onClose();
      setEventName('');
      setSelectedDay('monday');
      setSelectedClass(1);
      setEventType('homework');
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        Keyboard.dismiss();
        onClose();
      }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
      backdropTransitionOutTiming={0}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      avoidKeyboard={false}
      coverScreen={false}>
      <KeyboardAvoidingView style={styles.contentContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={20}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.title}>Add New Event</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Select Day:</Text>
              <View style={styles.buttonGroup}>
                {Object.keys(TIMETABLE).map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      selectedDay === day && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedDay(day)}>
                    <Text
                      style={[
                        styles.dayButtonText,
                        selectedDay === day && styles.selectedButtonText,
                      ]}>
                      {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Select Class:</Text>
              <View style={styles.classButtonsContainer}>
                {Array.from({ length: TIMETABLE[selectedDay as keyof typeof TIMETABLE].length }, (_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.classButton,
                      selectedClass === i + 1 && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedClass(i + 1)}>
                    <Text
                      style={[
                        styles.classButtonText,
                        selectedClass === i + 1 && styles.selectedButtonText,
                      ]}>
                      {i + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Class Preview:</Text>
              <Text style={styles.preview}>
                {TIMETABLE[selectedDay as keyof typeof TIMETABLE][selectedClass - 1]}
              </Text>
              <Text style={styles.timePreview}>
                {CLASS_TIMES[selectedClass - 1].start} - {CLASS_TIMES[selectedClass - 1].end}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Event Type:</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    eventType === 'homework' && styles.selectedButton,
                  ]}
                  onPress={() => setEventType('homework')}>
                  <Text
                    style={[
                      styles.typeButtonText,
                      eventType === 'homework' && styles.selectedButtonText,
                    ]}>
                    Homework
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    eventType === 'quiz' && styles.selectedButton,
                  ]}
                  onPress={() => setEventType('quiz')}>
                  <Text
                    style={[
                      styles.typeButtonText,
                      eventType === 'quiz' && styles.selectedButtonText,
                    ]}>
                    Quiz
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Event Name:</Text>
              <TextInput
                style={styles.input}
                value={eventName}
                onChangeText={setEventName}
                placeholder="Enter event name"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                autoFocus={false}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Event</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  selectedButton: {
    backgroundColor: '#6366f1',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#4b5563',
  },
  selectedButtonText: {
    color: 'white',
  },
  classButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  classButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  classButtonText: {
    fontSize: 16,
    color: '#4b5563',
  },
  preview: {
    fontSize: 16,
    color: '#4b5563',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
  },
  timePreview: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#4b5563',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});