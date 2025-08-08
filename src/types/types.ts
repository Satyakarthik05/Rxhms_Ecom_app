import { UserProfile, DietPlan } from '../nric_modules/HealthTools/types/diet';


export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined; 
  PatientLogin: undefined;
  Register: undefined; 
  Home: { username: string; role: 'DOCTOR' | 'PATIENT'; id: number };
  CallSetup: undefined;
  VideoCallScreen: undefined;
  HealthHome: undefined;
  ProfileForm: undefined;
  Loading: { profile: UserProfile };
  DietPlan: { dietPlan: DietPlan };
  BMICalculator: undefined;
  BreatheChallenge: undefined;
  MedicineReminderScreen: undefined;
  WaterReminderScreen: undefined;
};

export interface User {
 
  id?: number;
  username: string;
  password: string;
  fullName: string;
  role: 'DOCTOR' | 'PATIENT';
}
