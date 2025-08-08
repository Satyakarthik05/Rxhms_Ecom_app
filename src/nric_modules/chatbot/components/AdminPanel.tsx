import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, Save, X, Database } from 'lucide-react-native';
import { Question } from '../types/Question';

interface AdminPanelProps {
  questions: Question[];
  addQuestion: (parentId: string | null, text: string) => void;
  updateQuestion: (id: string, text: string) => void;
  deleteQuestion: (id: string) => void;
  findQuestionById: (id: string) => Question | null;
  saveQuestions: () => Promise<void>;
  isLoading: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  questions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  findQuestionById,
  saveQuestions,
  isLoading
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [addingParentId, setAddingParentId] = useState<string | null>(null);
  const [newQuestionText, setNewQuestionText] = useState('');

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const startEditing = (question: Question) => {
    setEditingId(question.id);
    setEditText(question.text);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      updateQuestion(editingId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const startAdding = (parentId: string | null) => {
    setAddingParentId(parentId);
    setNewQuestionText('');
  };

  const saveNewQuestion = () => {
    if (newQuestionText.trim()) {
      addQuestion(addingParentId, newQuestionText.trim());
      setAddingParentId(null);
      setNewQuestionText('');
    }
  };

  const cancelAdd = () => {
    setAddingParentId(null);
    setNewQuestionText('');
  };

  const handleSaveToDatabase = async () => {
    try {
      await saveQuestions();
      Alert.alert('Success', 'Questions saved to database successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save questions to database');
    }
  };

  const renderQuestion = (question: Question, level: number = 0) => {
    const isExpanded = expandedItems.has(question.id);
    const hasChildren = question.children.length > 0;
    const isEditing = editingId === question.id;
    const isAddingChild = addingParentId === question.id;

    return (
      <View key={question.id} style={[styles.questionContainer, level > 0 && styles.childQuestion]}>
        <View style={[
          styles.questionContent,
          { backgroundColor: level > 0 ? `rgba(59, 130, 246, ${0.05 * level})` : 'white' }
        ]}>
          <View style={styles.questionHeader}>
            <View style={styles.questionLeft}>
              {hasChildren && (
                <TouchableOpacity
                  onPress={() => toggleExpanded(question.id)}
                  style={styles.expandButton}
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </TouchableOpacity>
              )}
              
              <View style={styles.questionTextContainer}>
                {isEditing ? (
                  <View style={styles.editContainer}>
                    <TextInput
                      value={editText}
                      onChangeText={setEditText}
                      style={styles.editInput}
                      onSubmitEditing={saveEdit}
                    />
                    <TouchableOpacity
                      onPress={saveEdit}
                      style={styles.saveButton}
                    >
                      <Save size={14} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={cancelEdit}
                      style={styles.cancelButton}
                    >
                      <X size={14} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.questionTextRow}>
                    <Text style={[styles.questionText, question.isRoot && styles.rootQuestionText]}>
                      {question.text}
                    </Text>
                    <View style={styles.levelBadge}>
                      <Text style={styles.levelBadgeText}>Level {question.level}</Text>
                    </View>
                    {question.isRoot && (
                      <View style={styles.rootBadge}>
                        <Text style={styles.rootBadgeText}>ROOT</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>

            {!isEditing && (
              <View style={styles.questionActions}>
                <TouchableOpacity
                  onPress={() => startAdding(question.id)}
                  style={styles.actionButton}
                >
                  <Plus size={16} color="#16a34a" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => startEditing(question)}
                  style={styles.actionButton}
                >
                  <Edit2 size={16} color="#2563eb" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Delete Question',
                      'Are you sure you want to delete this question and all its children?',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', onPress: () => deleteQuestion(question.id) }
                      ]
                    );
                  }}
                  style={styles.actionButton}
                >
                  <Trash2 size={16} color="#dc2626" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {isAddingChild && (
            <View style={styles.addContainer}>
              <TextInput
                value={newQuestionText}
                onChangeText={setNewQuestionText}
                placeholder="Enter new question text..."
                style={styles.addInput}
                onSubmitEditing={saveNewQuestion}
              />
              <TouchableOpacity
                onPress={saveNewQuestion}
                style={styles.addSaveButton}
              >
                <Save size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelAdd}
                style={styles.addCancelButton}
              >
                <X size={16} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {hasChildren && isExpanded && (
          <View style={styles.childrenContainer}>
            {question.children.map((child) => renderQuestion(child, level + 1))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel - Question Management</Text>
        <Text style={styles.headerSubtitle}>Manage your chatbot questions and conversation flows</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => startAdding(null)}
          style={styles.addRootButton}
        >
          <Plus size={20} color="white" />
          <Text style={styles.buttonText}>Add Root Question</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSaveToDatabase}
          disabled={isLoading}
          style={[styles.saveToDbButton, isLoading && styles.disabledButton]}
        >
          <Database size={20} color="white" />
          <Text style={styles.buttonText}>{isLoading ? 'Saving...' : 'Save to Database'}</Text>
        </TouchableOpacity>
      </View>

      {addingParentId === null && (
        <View style={styles.addRootContainer}>
          <View style={styles.addRootInputContainer}>
            <TextInput
              value={newQuestionText}
              onChangeText={setNewQuestionText}
              placeholder="Enter new root question text..."
              style={styles.addRootInput}
              onSubmitEditing={saveNewQuestion}
            />
            <TouchableOpacity
              onPress={saveNewQuestion}
              style={styles.addRootSaveButton}
            >
              <Save size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelAdd}
              style={styles.addRootCancelButton}
            >
              <X size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.questionsList}>
        {questions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No questions found. Add your first root question to get started!</Text>
          </View>
        ) : (
          questions.map((question) => renderQuestion(question))
        )}
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Quick Tips:</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Root questions are the starting points for conversations</Text>
          <Text style={styles.tipItem}>• Click the arrow to expand/collapse question trees</Text>
          <Text style={styles.tipItem}>• Use the + button to add child questions at any level</Text>
          <Text style={styles.tipItem}>• Edit questions inline by clicking the edit button</Text>
          <Text style={styles.tipItem}>• Delete questions removes all child questions too</Text>
          <Text style={styles.tipItem}>• Remember to click "Save to Database" after making changes</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  addRootButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveToDbButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#a78bfa',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  addRootContainer: {
    marginBottom: 16,
  },
  addRootInputContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  addRootInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
  },
  addRootSaveButton: {
    backgroundColor: '#16a34a',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addRootCancelButton: {
    backgroundColor: '#6b7280',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionsList: {
    marginBottom: 24,
  },
  questionContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  childQuestion: {
    marginLeft: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#bfdbfe',
  },
  questionContent: {
    padding: 16,
    backgroundColor: 'white',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  expandButton: {
    padding: 4,
    borderRadius: 4,
  },
  questionTextContainer: {
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: '#16a34a',
    padding: 8,
    borderRadius: 4,
  },
  cancelButton: {
    backgroundColor: '#6b7280',
    padding: 8,
    borderRadius: 4,
  },
  questionTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  questionText: {
    fontWeight: '500',
    color: '#374151',
  },
  rootQuestionText: {
    color: '#1d4ed8',
  },
  levelBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  levelBadgeText: {
    fontSize: 12,
    color: '#4b5563',
  },
  rootBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rootBadgeText: {
    fontSize: 12,
    color: '#1d4ed8',
    fontWeight: 'bold',
  },
  questionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
  },
  addContainer: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  addInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  addSaveButton: {
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCancelButton: {
    backgroundColor: '#6b7280',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childrenContainer: {
    paddingLeft: 16,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: '#6b7280',
    textAlign: 'center',
  },
  tipsContainer: {
    padding: 16,
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    marginBottom: 24,
  },
  tipsTitle: {
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  tipsList: {
    gap: 4,
  },
  tipItem: {
    fontSize: 14,
    color: '#1e40af',
  },
});