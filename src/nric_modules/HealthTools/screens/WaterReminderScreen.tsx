import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  FlatList
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Reminder {
  id: string;
  title: string;
  time: string;
  interval: string;
  amount: string;
}

const mockStorage = {
  reminders: [] as Reminder[],

  async saveReminders(reminders: Reminder[]) {
    this.reminders = reminders;
  },
  async loadReminders() {
    return this.reminders;
  },
  async deleteReminder(id: string) {
    this.reminders = this.reminders.filter(r => r.id !== id);
  }
};

const WaterReminderScreen = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState('Drink Water');
  const [amount, setAmount] = useState('250');
  const [firstTime, setFirstTime] = useState(new Date());
  const [repeatEvery, setRepeatEvery] = useState('2');
  const [repeatUnit, setRepeatUnit] = useState<'hours' | 'days'>('hours');
  const [repeatCount, setRepeatCount] = useState('8');
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const savedReminders = await mockStorage.loadReminders();
      setReminders(savedReminders);
    };
    loadData();
  }, []);

  const resetForm = () => {
    setTitle('Drink Water');
    setAmount('250');
    setFirstTime(new Date());
    setRepeatEvery('2');
    setRepeatUnit('hours');
    setRepeatCount('8');
    setEditingReminderId(null);
  };

  const saveReminders = async () => {
    if (!title || !amount || !repeatEvery || !repeatCount) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const unitMs = repeatUnit === 'days' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
    const intervalMs = parseInt(repeatEvery) * unitMs;
    const count = parseInt(repeatCount);
    const newReminders: Reminder[] = [];

    for (let i = 0; i < count; i++) {
      const time = new Date(firstTime.getTime() + i * intervalMs);
      const id = `water_reminder_${Date.now()}_${i}`;

      newReminders.push({
        id,
        title,
        time: time.toISOString(),
        interval: `${repeatEvery} ${repeatUnit}`,
        amount
      });
    }

    let allReminders;
    if (editingReminderId) {
      allReminders = reminders.map(r => 
        r.id === editingReminderId ? 
        { ...newReminders[0], id: editingReminderId } : r
      );
    } else {
      allReminders = [...reminders, ...newReminders];
    }

    setReminders(allReminders);
    await mockStorage.saveReminders(allReminders);
    resetForm();
    setShowModal(false);
    Alert.alert('Success', 'Water reminders saved successfully!');
  };

  const editReminder = (reminder: Reminder) => {
    setTitle(reminder.title);
    setAmount(reminder.amount);
    setFirstTime(new Date(reminder.time));
    
    const [intervalValue, intervalUnit] = reminder.interval.split(' ');
    setRepeatEvery(intervalValue);
    setRepeatUnit(intervalUnit as 'hours' | 'days');
    
    setEditingReminderId(reminder.id);
    setShowModal(true);
  };

  const deleteReminder = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            const updated = reminders.filter(r => r.id !== id);
            setReminders(updated);
            await mockStorage.saveReminders(updated);
          }
        }
      ]
    );
  };

  const markAsDone = async (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    await mockStorage.saveReminders(updated);
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFirstTime(selectedDate);
    }
  };

  const renderReminderItem = ({ item }: { item: Reminder }) => (
    <View style={styles.reminderCard}>
      <View style={styles.reminderInfo}>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text style={styles.reminderAmount}>{item.amount}ml</Text>
        <Text style={styles.reminderTime}>
          {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.reminderDetails}>
          Repeats every {item.interval}
        </Text>
      </View>
      <View style={styles.reminderActions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => editReminder(item)}
        >
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteReminder(item.id)}
        >
          <Icon name="delete" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.doneButton]}
          onPress={() => markAsDone(item.id)}
        >
          <Icon name="check" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Water Intake Reminder</Text>
          <Text style={styles.subtitle}>Stay hydrated throughout the day</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Reminders</Text>
            <TouchableOpacity 
              style={[styles.button, styles.addButton]}
              onPress={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              <Text style={styles.buttonText}>Add Reminder</Text>
            </TouchableOpacity>
          </View>
          
          {reminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💧</Text>
              <Text style={styles.emptyText}>No water reminders set yet</Text>
            </View>
          ) : (
            <FlatList
              data={reminders}
              renderItem={renderReminderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Reminder Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          setShowModal(false);
          resetForm();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingReminderId ? 'Edit Reminder' : 'Add New Reminder'}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Reminder Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Morning Hydration"
              placeholderTextColor="#aaa"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Water Amount (ml)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 250"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.label}>Reminder Time</Text>
            <TouchableOpacity 
              onPress={() => setShowPicker(true)} 
              style={styles.timePickerButton}
            >
              <Text style={styles.timePickerText}>
                {firstTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={firstTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onTimeChange}
              />
            )}

            <Text style={styles.label}>Repeat Every</Text>
            <View style={styles.repeatContainer}>
              <TextInput
                style={[styles.input, styles.repeatInput]}
                placeholder="e.g. 2"
                placeholderTextColor="#aaa"
                value={repeatEvery}
                onChangeText={setRepeatEvery}
                keyboardType="numeric"
              />
              <View style={styles.unitRow}>
                {['hours', 'days'].map(unit => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      styles.unitOption, 
                      repeatUnit === unit && styles.unitOptionSelected
                    ]}
                    onPress={() => setRepeatUnit(unit as any)}
                  >
                    <Text style={[
                      styles.unitText,
                      repeatUnit === unit && styles.unitTextSelected
                    ]}>
                      {unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text style={styles.label}>Number of Times to Repeat</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 8"
              placeholderTextColor="#aaa"
              value={repeatCount}
              onChangeText={setRepeatCount}
              keyboardType="numeric"
            />

            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={saveReminders}
            >
              <Text style={styles.buttonText}>
                {editingReminderId ? 'Update Reminder' : 'Save Reminder'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#3498db',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  doneButton: {
    backgroundColor: '#FF9800',
    padding: 8,
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: '#3498db',
    marginTop: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    color: '#95a5a6',
    fontSize: 16,
  },
  reminderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  reminderAmount: {
    fontSize: 14,
    color: '#3498db',
    marginTop: 4,
    fontWeight: '500',
  },
  reminderTime: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  reminderDetails: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 4,
  },
  reminderActions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333',
  },
  modalContent: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    color: '#2d3436',
    fontSize: 16,
    marginBottom: 8,
  },
  timePickerButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    marginBottom: 16,
  },
  timePickerText: {
    fontSize: 16,
    color: '#2d3436',
    textAlign: 'center',
  },
  repeatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  repeatInput: {
    flex: 1,
  },
  unitRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  unitOption: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  unitOptionSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  unitText: {
    color: '#2d3436',
    fontSize: 14,
  },
  unitTextSelected: {
    color: 'white',
    fontWeight: '500',
  },
});

export default WaterReminderScreen;