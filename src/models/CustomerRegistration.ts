import { GenderType } from "./enums";

export interface CustomerRegistration {
	
	firstName: string;
	middleName: string;
	lastName: string;
	username: string;
	dispalayName: string;
	gender: GenderType;
	dob: string;
	mobileNumber: string;
	emailId: string;
	password: string;

}