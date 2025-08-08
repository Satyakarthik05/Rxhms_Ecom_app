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

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  quantity: string;
}

interface Reminder {
  id: string;
  medicineIds: string[];
  title: string;
  time: string;
  interval: string;
}

const mockStorage = {
  reminders: [] as Reminder[],
  medicines: [] as Medicine[],

  async saveReminders(reminders: Reminder[]) {
    this.reminders = reminders;
  },
  async loadReminders() {
    return this.reminders;
  },
  async deleteReminder(id: string) {
    this.reminders = this.reminders.filter(r => r.id !== id);
  },
  async saveMedicines(medicines: Medicine[]) {
    this.medicines = medicines;
  },
  async loadMedicines() {
    return this.medicines;
  },
  async deleteMedicine(id: string) {
    this.medicines = this.medicines.filter(m => m.id !== id);
  }
};

const MedicineReminderScreen = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [currentMedicine, setCurrentMedicine] = useState<Medicine>({ 
    id: '', 
    name: '', 
    dosage: '', 
    quantity: '' 
  });
  const [editingMedicineId, setEditingMedicineId] = useState<string | null>(null);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);

  const [title, setTitle] = useState('Take Medicine');
  const [firstTime, setFirstTime] = useState(new Date());
  const [repeatEvery, setRepeatEvery] = useState('24');
  const [repeatUnit, setRepeatUnit] = useState<'minutes' | 'hours' | 'days'>('days');
  const [repeatCount, setRepeatCount] = useState('5');
  const [showPicker, setShowPicker] = useState(false);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [savedReminders, savedMedicines] = await Promise.all([
        mockStorage.loadReminders(),
        mockStorage.loadMedicines()
      ]);
      setReminders(savedReminders);
      setMedicines(savedMedicines);
    };
    loadData();
  }, []);

  const resetMedicineForm = () => {
    setCurrentMedicine({ id: '', name: '', dosage: '', quantity: '' });
    setEditingMedicineId(null);
  };

  const resetReminderForm = () => {
    setTitle('Take Medicine');
    setFirstTime(new Date());
    setRepeatEvery('24');
    setRepeatUnit('days');
    setRepeatCount('5');
    setSelectedMedicines([]);
    setEditingReminderId(null);
  };

  const toggleMedicineSelection = (id: string) => {
    setSelectedMedicines(prev => 
      prev.includes(id) 
        ? prev.filter(medId => medId !== id) 
        : [...prev, id]
    );
  };

  const addOrUpdateMedicine = async () => {
    const { name, dosage, quantity } = currentMedicine;
    if (!name || !dosage || !quantity) {
      Alert.alert('Error', 'Please fill all medicine fields');
      return;
    }

    let updated;
    if (editingMedicineId) {
      updated = medicines.map(m => 
        m.id === editingMedicineId ? { ...currentMedicine, id: editingMedicineId } : m
      );
    } else {
      const newMed = { ...currentMedicine, id: Date.now().toString() };
      updated = [...medicines, newMed];
    }

    setMedicines(updated);
    await mockStorage.saveMedicines(updated);
    resetMedicineForm();
    setShowMedicineModal(false);
  };

  const editMedicine = (id: string) => {
    const medicine = medicines.find(m => m.id === id);
    if (medicine) {
      setCurrentMedicine(medicine);
      setEditingMedicineId(id);
      setShowMedicineModal(true);
    }
  };

  const deleteMedicine = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this medicine?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            const updated = medicines.filter(m => m.id !== id);
            setMedicines(updated);
            await mockStorage.saveMedicines(updated);
          }
        }
      ]
    );
  };

  const saveReminders = async () => {
    if (selectedMedicines.length === 0) {
      Alert.alert('Error', 'Please select at least one medicine');
      return;
    }

    const unitMs =
      repeatUnit === 'days' ? 24 * 60 * 60 * 1000 :
      repeatUnit === 'hours' ? 60 * 60 * 1000 :
      60 * 1000;

    const intervalMs = parseInt(repeatEvery) * unitMs;
    const count = parseInt(repeatCount);
    const newReminders: Reminder[] = [];

    for (let i = 0; i < count; i++) {
      const time = new Date(firstTime.getTime() + i * intervalMs);
      const id = `reminder_${Date.now()}_${i}`;

      newReminders.push({
        id,
        title,
        time: time.toISOString(),
        interval: `${repeatEvery} ${repeatUnit}`,
        medicineIds: selectedMedicines
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
    resetReminderForm();
    setShowReminderModal(false);
    Alert.alert('Success', 'Reminders saved successfully!');
  };

  const editReminder = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      setTitle(reminder.title);
      setFirstTime(new Date(reminder.time));
      
      const [intervalValue, intervalUnit] = reminder.interval.split(' ');
      setRepeatEvery(intervalValue);
      setRepeatUnit(intervalUnit as 'minutes' | 'hours' | 'days');
      
      setSelectedMedicines(reminder.medicineIds);
      setEditingReminderId(id);
      setShowReminderModal(true);
    }
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

  const renderMedicineItem = ({ item }: { item: Medicine }) => (
    <View style={styles.medicineCard}>
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDetails}>{item.quantity} {item.dosage}</Text>
      </View>
      <View style={styles.medicineActions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => editMedicine(item.id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteMedicine(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReminderItem = ({ item }: { item: Reminder }) => (
    <View style={styles.reminderCard}>
      <View style={styles.reminderInfo}>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text style={styles.reminderTime}>
          {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.reminderDetails}>
          Repeats every {item.interval}
        </Text>
        <Text style={styles.reminderMeds}>
          {item.medicineIds.map(id => {
            const med = medicines.find(m => m.id === id);
            return med ? `${med.name} (${med.quantity} ${med.dosage})` : '';
          }).join(', ')}
        </Text>
      </View>
      <View style={styles.reminderActions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => editReminder(item.id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteReminder(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.doneButton]}
          onPress={() => markAsDone(item.id)}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Medicine Reminder</Text>
          <Text style={styles.subtitle}>Manage your medications and reminders</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Medicines</Text>
            <TouchableOpacity 
              style={[styles.button, styles.addButton]}
              onPress={() => {
                resetMedicineForm();
                setShowMedicineModal(true);
              }}
            >
              <Text style={styles.buttonText}>Add Medicine</Text>
            </TouchableOpacity>
          </View>
          
          {medicines.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💊</Text>
              <Text style={styles.emptyText}>No medicines added yet</Text>
            </View>
          ) : (
            <FlatList
              data={medicines}
              renderItem={renderMedicineItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Reminders</Text>
            <TouchableOpacity 
              style={[styles.button, styles.addButton]}
              onPress={() => {
                resetReminderForm();
                setShowReminderModal(true);
              }}
              disabled={medicines.length === 0}
            >
              <Text style={styles.buttonText}>Add Reminder</Text>
            </TouchableOpacity>
          </View>
          
          {reminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>⏰</Text>
              <Text style={styles.emptyText}>No reminders set yet</Text>
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

      {/* Medicine Modal */}
      <Modal
        visible={showMedicineModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          setShowMedicineModal(false);
          resetMedicineForm();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingMedicineId ? 'Edit Medicine' : 'Add New Medicine'}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => {
                setShowMedicineModal(false);
                resetMedicineForm();
              }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Medicine Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Paracetamol"
              placeholderTextColor="#aaa"
              value={currentMedicine.name}
              onChangeText={(text) => setCurrentMedicine({ ...currentMedicine, name: text })}
            />

            <Text style={styles.label}>Dosage Type</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. tablet, mg, ml"
              placeholderTextColor="#aaa"
              value={currentMedicine.dosage}
              onChangeText={(text) => setCurrentMedicine({ ...currentMedicine, dosage: text })}
            />

            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 1, 2, 500"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={currentMedicine.quantity}
              onChangeText={(text) => setCurrentMedicine({ ...currentMedicine, quantity: text })}
            />

            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={addOrUpdateMedicine}
            >
              <Text style={styles.buttonText}>
                {editingMedicineId ? 'Update Medicine' : 'Add Medicine'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Reminder Modal */}
      <Modal
        visible={showReminderModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          setShowReminderModal(false);
          resetReminderForm();
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
                setShowReminderModal(false);
                resetReminderForm();
              }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Reminder Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Morning Dose"
              placeholderTextColor="#aaa"
              value={title}
              onChangeText={setTitle}
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
                {['minutes', 'hours', 'days'].map(unit => (
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
              placeholder="e.g. 3"
              placeholderTextColor="#aaa"
              value={repeatCount}
              onChangeText={setRepeatCount}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Select Medicines</Text>
            {medicines.length === 0 ? (
              <Text style={styles.warningText}>Please add medicines first</Text>
            ) : (
              <View style={styles.medicinesList}>
                {medicines.map(med => (
                  <TouchableOpacity
                    key={med.id}
                    style={[
                      styles.medicineInReminder,
                      selectedMedicines.includes(med.id) && styles.selectedMedicine
                    ]}
                    onPress={() => toggleMedicineSelection(med.id)}
                  >
                    <Text style={styles.medicineInReminderText}>
                      {med.name} ({med.quantity} {med.dosage})
                    </Text>
                    {selectedMedicines.includes(med.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={saveReminders}
              disabled={selectedMedicines.length === 0}
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
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  doneButton: {
    backgroundColor: '#FF9800',
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
  medicineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  medicineDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  medicineActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  reminderTime: {
    fontSize: 14,
    color: '#3498db',
    marginTop: 4,
    fontWeight: '500',
  },
  reminderDetails: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 4,
  },
  reminderMeds: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 4,
    fontStyle: 'italic',
  },
  reminderActions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
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
  warningText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 8,
  },
  medicinesList: {
    marginTop: 8,
  },
  medicineInReminder: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedMedicine: {
    backgroundColor: '#e3f2fd',
    borderColor: '#3498db',
    borderWidth: 1,
  },
  medicineInReminderText: {
    fontSize: 14,
    color: '#2d3436',
  },
  checkmark: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicineReminderScreen;