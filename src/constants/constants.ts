import axios from "axios";

export const BaseAxios = axios.create({
  baseURL: "http://13.204.131.57:9999/rxhms-api/",
  headers: {
    "Content-Type": "Application/json",
    // client_id: "AURAVE_MOBILE",
    // channel_id: "AURAVE_MOBILE",
 },

});







BaseAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access detected. Token might be expired.");

    //   const token = store.getState().jwtToken?.token;

    //   if (!token) {
    //     console.log("No token found. Redirecting to login or triggering logout.");
    //     // store.dispatch(logoutUser()); // Optional
    //   } else {
    //     console.log("Token exists but is likely expired or invalid.");
    //     // Add refresh token logic here if implemented
    //   }
    }

    return Promise.reject(error);
  }
);

export const GenerateOtpForLogin = 'security/auth/generate-otp';
export const LoginWithMobile = 'security/auth/mob-login';
export const RegisterUser = 'security/auth/create/customer';
export const LoginWithEmail = 'security/auth/email-login';
export const ValidateOtp = 'security/auth/validate-otp';
export const GenerateOtpForForgotPwd = 'security/auth/otp-forgot-pwd';
export const ValidateOtpForForgotPwd = 'security/auth/validate-otp';
export const ResetPassword = 'security/auth/reset-pwd';

