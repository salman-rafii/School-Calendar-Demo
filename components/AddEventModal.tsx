import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { format } from 'date-fns';
import Modal from 'react-native-modal';
import { useTimetableStore } from '../store/timetableStore';

interface AddEventModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedClass: {
    date: Date;
    classNumber: number;
    subject: string;
  } | null;
}

export function AddEventModal({ isVisible, onClose, selectedClass }: AddEventModalProps) {
  const [eventName, setEventName] = useState('');
  const addEvent = useTimetableStore((state) => state.addEvent);

  const handleSubmit = () => {
    if (eventName.trim() && selectedClass) {
      addEvent({
        date: selectedClass.date,
        classNumber: selectedClass.classNumber,
        name: eventName.trim(),
        type: 'homework', // Default type
      });
      onClose();
      setEventName('');
    }
  };

  if (!selectedClass) return null;

  const formattedDate = format(selectedClass.date, 'EEE, MMM d');

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.modal}
      backdropTransitionOutTiming={0}
      useNativeDriver={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subject}>{selectedClass.subject}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>

        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={setEventName}
          placeholder="Event name"
          autoFocus
          placeholderTextColor="#9ca3af"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, !eventName.trim() && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!eventName.trim()}>
            <Text style={styles.addButtonText}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '85%',
    padding: 0,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  input: {
    fontSize: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  addButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#6366f1',
  },
  disabledButton: {
    backgroundColor: '#c7d2fe',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});