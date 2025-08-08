import React, { useState,useEffect  } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DietPlan, UserProfile } from '../types/diet';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => Promise<DietPlan>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
   const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    mealsPerDay: 3,
    waterIntake: 8,
    medicalConditions: [],
    allergies: [],
    dietaryRestrictions: [],
    vitaminDeficiencies: [],
    cuisinePreferences: [],
    dislikedFoods: [],
  });

  const totalSteps = 6;

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  type ProfileFormNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileForm'>;
  const navigation = useNavigation<ProfileFormNavigationProp>();

  const handleArrayUpdate = (
    field: keyof UserProfile,
    value: string,
    checked: boolean,
  ) => {
    const currentArray = (profile[field] as string[]) || [];
    if (checked) {
      updateProfile({ [field]: [...currentArray, value] });
    } else {
      updateProfile({ [field]: currentArray.filter(item => item !== value) });
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
          // If profile exists, skip to diet plan
          const plan = await onSubmit(JSON.parse(savedProfile) as UserProfile);
          navigation.navigate('DietPlan', { dietPlan: plan });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, []);

  const handleSubmit = async () => {
    if (profile.name && profile.age && profile.height && profile.weight) {
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
        navigation.navigate('Loading', { profile: profile as UserProfile });
        const plan = await onSubmit(profile as UserProfile);
        navigation.navigate('DietPlan', { dietPlan: plan });
      } catch (error) {
        console.error('Error generating diet plan:', error);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Icon name="account" size={24} color="#10B981" />
              <Text style={styles.stepTitle}>Basic Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={profile.name || ''}
                onChangeText={text => updateProfile({ name: text })}
                placeholder="Enter your full name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={profile.age?.toString() || ''}
                onChangeText={text =>
                  updateProfile({ age: parseInt(text) || 0 })
                }
                placeholder="Your age"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    profile.gender === 'male' && styles.radioButtonSelected,
                  ]}
                  onPress={() => updateProfile({ gender: 'male' })}
                >
                  <Text
                    style={[
                      styles.radioText,
                      profile.gender === 'male' && styles.radioTextSelected,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    profile.gender === 'female' && styles.radioButtonSelected,
                  ]}
                  onPress={() => updateProfile({ gender: 'female' })}
                >
                  <Text
                    style={[
                      styles.radioText,
                      profile.gender === 'female' && styles.radioTextSelected,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    profile.gender === 'other' && styles.radioButtonSelected,
                  ]}
                  onPress={() => updateProfile({ gender: 'other' })}
                >
                  <Text
                    style={[
                      styles.radioText,
                      profile.gender === 'other' && styles.radioTextSelected,
                    ]}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                value={profile.height?.toString() || ''}
                onChangeText={text =>
                  updateProfile({ height: parseInt(text) || 0 })
                }
                placeholder="Height in centimeters"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={profile.weight?.toString() || ''}
                onChangeText={text =>
                  updateProfile({ weight: parseInt(text) || 0 })
                }
                placeholder="Current weight in kg"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Target Weight (kg) - Optional</Text>
              <TextInput
                style={styles.input}
                value={profile.targetWeight?.toString() || ''}
                onChangeText={text =>
                  updateProfile({ targetWeight: parseInt(text) || undefined })
                }
                placeholder="Target weight in kg"
                keyboardType="numeric"
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Icon name="run" size={24} color="#3B82F6" />
              <Text style={styles.stepTitle}>Activity Level & Goals</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Activity Level</Text>
              {[
                { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                { value: 'light', label: 'Light Activity', desc: 'Light exercise 1-3 days/week' },
                { value: 'moderate', label: 'Moderate Activity', desc: 'Moderate exercise 3-5 days/week' },
                { value: 'active', label: 'Active', desc: 'Heavy exercise 6-7 days/week' },
                { value: 'very_active', label: 'Very Active', desc: 'Very heavy exercise, physical job' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.radioButtonLarge,
                    profile.activityLevel === option.value && styles.radioButtonSelected,
                  ]}
                  onPress={() => updateProfile({ activityLevel: option.value as any })}
                >
                  <View style={styles.radioContent}>
                    <Text
                      style={[
                        styles.radioTextLarge,
                        profile.activityLevel === option.value && styles.radioTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text
                      style={[
                        styles.radioDesc,
                        profile.activityLevel === option.value && styles.radioDescSelected,
                      ]}
                    >
                      {option.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Goal</Text>
              {[
                { value: 'lose_weight', label: 'Lose Weight', desc: 'Reduce body weight and fat' },
                { value: 'maintain_weight', label: 'Maintain Weight', desc: 'Keep current weight stable' },
                { value: 'gain_weight', label: 'Gain Weight', desc: 'Increase overall body weight' },
                { value: 'muscle_gain', label: 'Build Muscle', desc: 'Increase muscle mass and strength' },
                { value: 'general_health', label: 'General Health', desc: 'Improve overall wellness' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.radioButtonLarge,
                    profile.goal === option.value && styles.radioButtonSelected,
                  ]}
                  onPress={() => updateProfile({ goal: option.value as any })}
                >
                  <View style={styles.radioContent}>
                    <Text
                      style={[
                        styles.radioTextLarge,
                        profile.goal === option.value && styles.radioTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text
                      style={[
                        styles.radioDesc,
                        profile.goal === option.value && styles.radioDescSelected,
                      ]}
                    >
                      {option.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Icon name="heart-pulse" size={24} color="#EF4444" />
              <Text style={styles.stepTitle}>Health Conditions</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Medical Conditions (Select all that apply)</Text>
              <View style={styles.checkboxContainer}>
                {[
                  'Diabetes', 'Hypertension', 'Heart Disease', 'High Cholesterol',
                  'Thyroid Issues', 'PCOS', 'Kidney Disease', 'Liver Disease',
                  'Arthritis', 'Osteoporosis', 'Anemia', 'Digestive Issues'
                ].map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.checkboxButton,
                      profile.medicalConditions?.includes(condition) && styles.checkboxButtonSelected,
                    ]}
                    onPress={() => handleArrayUpdate('medicalConditions', condition, !profile.medicalConditions?.includes(condition))}
                  >
                    <Text
                      style={[
                        styles.checkboxText,
                        profile.medicalConditions?.includes(condition) && styles.checkboxTextSelected,
                      ]}
                    >
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Known Vitamin Deficiencies</Text>
              <View style={styles.checkboxContainer}>
                {[
                  'Vitamin D', 'Vitamin B12', 'Iron', 'Vitamin C',
                  'Folate', 'Calcium', 'Magnesium', 'Zinc',
                  'Vitamin A', 'Vitamin E', 'Omega-3', 'Potassium'
                ].map((vitamin) => (
                  <TouchableOpacity
                    key={vitamin}
                    style={[
                      styles.checkboxButton,
                      profile.vitaminDeficiencies?.includes(vitamin) && styles.checkboxButtonSelected,
                    ]}
                    onPress={() => handleArrayUpdate('vitaminDeficiencies', vitamin, !profile.vitaminDeficiencies?.includes(vitamin))}
                  >
                    <Text
                      style={[
                        styles.checkboxText,
                        profile.vitaminDeficiencies?.includes(vitamin) && styles.checkboxTextSelected,
                      ]}
                    >
                      {vitamin}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Icon name="alert-circle" size={24} color="#F59E0B" />
              <Text style={styles.stepTitle}>Allergies & Restrictions</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Food Allergies</Text>
              <View style={styles.checkboxContainer}>
                {[
                  'Nuts', 'Dairy', 'Gluten', 'Shellfish',
                  'Eggs', 'Soy', 'Fish', 'Sesame',
                  'Peanuts', 'Tree Nuts', 'Wheat', 'None'
                ].map((allergy) => (
                  <TouchableOpacity
                    key={allergy}
                    style={[
                      styles.checkboxButton,
                      profile.allergies?.includes(allergy) && styles.checkboxButtonSelected,
                    ]}
                    onPress={() => handleArrayUpdate('allergies', allergy, !profile.allergies?.includes(allergy))}
                  >
                    <Text
                      style={[
                        styles.checkboxText,
                        profile.allergies?.includes(allergy) && styles.checkboxTextSelected,
                      ]}
                    >
                      {allergy}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dietary Restrictions</Text>
              <View style={styles.checkboxContainer}>
                {[
                  'Vegetarian', 'Vegan', 'Keto', 'Paleo',
                  'Mediterranean', 'Low Carb', 'Low Fat', 'Intermittent Fasting',
                  'Halal', 'Kosher', 'Raw Food', 'None'
                ].map((restriction) => (
                  <TouchableOpacity
                    key={restriction}
                    style={[
                      styles.checkboxButton,
                      profile.dietaryRestrictions?.includes(restriction) && styles.checkboxButtonSelected,
                    ]}
                    onPress={() => handleArrayUpdate('dietaryRestrictions', restriction, !profile.dietaryRestrictions?.includes(restriction))}
                  >
                    <Text
                      style={[
                        styles.checkboxText,
                        profile.dietaryRestrictions?.includes(restriction) && styles.checkboxTextSelected,
                      ]}
                    >
                      {restriction}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Icon name="food" size={24} color="#10B981" />
              <Text style={styles.stepTitle}>Food Preferences</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Cuisines</Text>
              <View style={styles.checkboxContainer}>
                {[
                  'Indian', 'Mediterranean', 'Asian', 'Mexican',
                  'Italian', 'American', 'Middle Eastern', 'Japanese',
                  'Thai', 'Greek', 'French', 'Chinese'
                ].map((cuisine) => (
                  <TouchableOpacity
                    key={cuisine}
                    style={[
                      styles.checkboxButton,
                      profile.cuisinePreferences?.includes(cuisine) && styles.checkboxButtonSelected,
                    ]}
                    onPress={() => handleArrayUpdate('cuisinePreferences', cuisine, !profile.cuisinePreferences?.includes(cuisine))}
                  >
                    <Text
                      style={[
                        styles.checkboxText,
                        profile.cuisinePreferences?.includes(cuisine) && styles.checkboxTextSelected,
                      ]}
                    >
                      {cuisine}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.doubleInputGroup}>
              <View style={styles.halfInputGroup}>
                <Text style={styles.label}>Preferred Meals per Day</Text>
                <View style={styles.selectContainer}>
                  <TextInput
                    style={styles.selectInput}
                    value={profile.mealsPerDay?.toString() || '3'}
                    onChangeText={text => updateProfile({ mealsPerDay: parseInt(text) || 3 })}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.halfInputGroup}>
                <Text style={styles.label}>Daily Water Intake (glasses)</Text>
                <View style={styles.selectContainer}>
                  <TextInput
                    style={styles.selectInput}
                    value={profile.waterIntake?.toString() || '8'}
                    onChangeText={text => updateProfile({ waterIntake: parseInt(text) || 8 })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Icon name="check-circle" size={24} color="#10B981" />
              <Text style={styles.stepTitle}>Review & Submit</Text>
            </View>

            <View style={styles.reviewContainer}>
              <Text style={styles.reviewTitle}>Profile Summary</Text>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Name:</Text>
                <Text style={styles.reviewValue}>{profile.name}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Age:</Text>
                <Text style={styles.reviewValue}>{profile.age} years</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Height:</Text>
                <Text style={styles.reviewValue}>{profile.height} cm</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Weight:</Text>
                <Text style={styles.reviewValue}>{profile.weight} kg</Text>
              </View>

              {profile.targetWeight && (
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Target Weight:</Text>
                  <Text style={styles.reviewValue}>
                    {profile.targetWeight} kg
                  </Text>
                </View>
              )}

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Gender:</Text>
                <Text style={styles.reviewValue}>{profile.gender}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Activity Level:</Text>
                <Text style={styles.reviewValue}>
                  {profile.activityLevel?.replace('_', ' ')}
                </Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Goal:</Text>
                <Text style={styles.reviewValue}>
                  {profile.goal?.replace('_', ' ')}
                </Text>
              </View>

              {profile.medicalConditions &&
                profile.medicalConditions.length > 0 && (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Conditions:</Text>
                    <Text style={styles.reviewValue}>
                      {profile.medicalConditions.join(', ')}
                    </Text>
                  </View>
                )}

              {profile.vitaminDeficiencies &&
                profile.vitaminDeficiencies.length > 0 && (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Vitamin Deficiencies:</Text>
                    <Text style={styles.reviewValue}>
                      {profile.vitaminDeficiencies.join(', ')}
                    </Text>
                  </View>
                )}

              {profile.allergies && profile.allergies.length > 0 && (
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Allergies:</Text>
                  <Text style={styles.reviewValue}>
                    {profile.allergies.join(', ')}
                  </Text>
                </View>
              )}

              {profile.dietaryRestrictions &&
                profile.dietaryRestrictions.length > 0 && (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Dietary Restrictions:</Text>
                    <Text style={styles.reviewValue}>
                      {profile.dietaryRestrictions.join(', ')}
                    </Text>
                  </View>
                )}

              {profile.cuisinePreferences &&
                profile.cuisinePreferences.length > 0 && (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Preferred Cuisines:</Text>
                    <Text style={styles.reviewValue}>
                      {profile.cuisinePreferences.join(', ')}
                    </Text>
                  </View>
                )}

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Meals per Day:</Text>
                <Text style={styles.reviewValue}>{profile.mealsPerDay}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Water Intake:</Text>
                <Text style={styles.reviewValue}>
                  {profile.waterIntake} glasses/day
                </Text>
              </View>
            </View>

            <View style={styles.noteBox}>
              <Icon name="lightbulb-on" size={20} color="#F59E0B" />
              <Text style={styles.noteText}>
                Our AI will analyze your profile and create a comprehensive diet
                plan tailored to your specific needs.
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            Step {currentStep} of {totalSteps}
          </Text>
          <Text style={styles.progressPercent}>
            {Math.round((currentStep / totalSteps) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStep / totalSteps) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Form Content */}
      <View style={styles.formContainer}>
        {renderStep()}

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            style={[
              styles.button,
              styles.buttonSecondary,
              currentStep === 1 && styles.buttonDisabled,
            ]}
          >
            <Text style={[styles.buttonText, styles.buttonSecondaryText]}>
              Previous
            </Text>
          </TouchableOpacity>

          {currentStep < totalSteps ? (
            <TouchableOpacity
              onPress={() =>
                setCurrentStep(Math.min(totalSteps, currentStep + 1))
              }
              style={[styles.button, styles.buttonPrimary]}
            >
              <Text style={[styles.buttonText, styles.buttonPrimaryText]}>
                Next
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, styles.buttonSubmit]}
            >
              <Text style={[styles.buttonText, styles.buttonSubmitText]}>
                Generate Diet Plan
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stepContainer: {
    marginBottom: 24,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#111827',
  },
  inputGroup: {
    marginBottom: 16,
  },
  doubleInputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfInputGroup: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#4B5563',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  selectInput: {
    padding: 12,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  radioButtonLarge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#10B981',
  },
  radioContent: {
    flexDirection: 'column',
  },
  radioText: {
    fontSize: 14,
    color: '#4B5563',
  },
  radioTextLarge: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  radioDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  radioDescSelected: {
    color: '#E5E7EB',
  },
  radioTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: '48%',
    alignItems: 'center',
  },
  checkboxButtonSelected: {
    backgroundColor: '#10B981',
  },
  checkboxText: {
    fontSize: 14,
    color: '#4B5563',
  },
  checkboxTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  reviewContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewLabel: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  reviewValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'right',
  },
  noteBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteText: {
    fontSize: 14,
    color: '#92400E',
    marginLeft: 12,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonPrimary: {
    backgroundColor: '#10B981',
  },
  buttonSecondary: {
    backgroundColor: '#E5E7EB',
  },
  buttonSubmit: {
    backgroundColor: '#047857',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPrimaryText: {
    color: 'white',
  },
  buttonSecondaryText: {
    color: '#4B5563',
  },
  buttonSubmitText: {
    color: 'white',
  },
});

export default UserProfileForm;