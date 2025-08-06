import { GenderType } from "./enums";

export interface CustomerMaster {
  id?: string;
  uhid?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  username?: string | null | undefined;
  gender: GenderType;     
  dob: string;             // ISO date string, e.g. "YYYY-MM-DD"
  mobileNumber: string;
  emailId: string;
  referredBy?: number | null;  // Using number for Long, nullable if needed
  registeredOn?: string | null;     // ISO date-time string, e.g. "YYYY-MM-DDTHH:mm:ss"
  parentId?: number | null;
}
