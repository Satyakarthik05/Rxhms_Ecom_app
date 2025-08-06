export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Signup: {
    phoneNumber?: string
  };
  OtpVerifyScreen: {
    phoneNumber?: string;
  };

  MobileLogin: undefined
  ForgotPasswordScreen: {phoneNumber?: string}; 
  ForgotOtpScreen: {phoneNumber?: string}; 
  ResetPasswordScreen: {
  phoneNumber?: string;
};
Profile: undefined;
AddMemberScreen: {customer?: any};
};