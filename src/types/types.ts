// Define the type for the navigation stack params (add more as needed)
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Signup: {phoneNumber?: string}; // Optional phoneNumber for Signup
  OtpVerifyScreen: {
    phoneNumber: string;
  };

  MobileLogin: undefined
  ForgotPasswordScreen: undefined;
  ForgotOtpScreen: undefined;
  ResetPasswordScreen: undefined;
};