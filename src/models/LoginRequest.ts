export interface LoginRequest {
    username?: string;
    emailId?: string;
    password?: string;
    mobileNumber?: string;
    txnId: string;
    otp: string;

}