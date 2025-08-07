import axios, { AxiosRequestConfig } from "axios";
import { getLocalData, getLocalText } from "../utils/utils";

export const BaseAxios = axios.create({
  baseURL: "http://13.204.131.57:9999/rxhms-api/",
  headers: {
    "Content-Type": "Application/json",
     client_id: "RXHMS_ECOM_APP",
    //  channel_id: "AURAVE_MOBILE",
 },

});




BaseAxios.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    // Don't add auth headers for logout
    if (config.url?.includes(Logout)) {
      return config;
    }

    const username = await getLocalText('username');
    const token = await getLocalData('token');
    console.log("token from headers", token);
    config.headers = {
      ...config.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(username && { username }),
    };
        console.log("config from headers", config);

    return config;
  },
  (error) => Promise.reject(error)
);


BaseAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access detected. Token might be expired.");
      const username = await getLocalText('username');
      console.log("username frm headers", username)
     const token = await getLocalData('token');
console.log("tooken frm headers", token)
      if (!token) {
        console.log("No token found. Redirecting to login or triggering logout.");
        // store.dispatch(logoutUser()); // Optional
      } else {
        console.log("Token exists but is likely expired or invalid.");
        // Add refresh token logic here if implemented
      }
    }

    return Promise.reject(error);
  }
);


// BaseAxios.interceptors.request.use(
//   async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
   

//    const username = await getLocalText('username');
// const token = await getLocalText('token');
//     // Safely set headers only if values exist
//     config.headers = {
//       ...config.headers,
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...(username && { username }),
//     };

//     // console.log("API Request Headers:", config.headers);

//     return config;
//   },
//   (error) => Promise.reject(error)
// );





// BaseAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       console.log("Unauthorized access detected. Token might be expired.");

//       const token = await getLocalText('token');

//       if (!token) {
//         console.log("No token found. Redirecting to login or triggering logout.");
//         // store.dispatch(logoutUser()); // Optional
//       } else {
//         console.log("Token exists but is likely expired or invalid.");
//         // Add refresh token logic here if implemented
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// Authentication related endpoints
export const GenerateOtpForLogin = 'security/auth/generate-otp';
export const LoginWithMobile = 'security/auth/mob-login';
export const RegisterUser = 'security/auth/create/customer';
export const LoginWithEmail = 'security/auth/email-login';
export const ValidateOtp = 'security/auth/validate-otp';
export const GenerateOtpForForgotPwd = 'security/auth/otp-forgot-pwd';
export const ValidateOtpForForgotPwd = 'security/auth/validate-otp';
export const ResetPassword = 'security/auth/reset-pwd';
export const Logout = 'security/auth/logout';
export const ChangePassword = 'security/auth/change-pwd';

// Customer related endpoints
export const GetCustomerDetails = 'customer/profile/get/my-details';
export const CreateAddOnCustomer = 'customer/profile/create-addon-customer';
export const GetAddonCustomers = (username: string) => `customer/profile/dependents/by-username/${username}`;


export const getAuthHeaders = async () =>{
const username = await getLocalText('username');
    const token = await getLocalData('token');
    console.log("token from headers", token);
    const headers = {
       "Content-Type": "Application/json",
     client_id: "RXHMS_ECOM_APP",

      ...(token && { Authorization: `Bearer ${token}` }),
      ...(username && { username }),
    };
        console.log("headers from headers", headers);

    return headers;
}
   
  
