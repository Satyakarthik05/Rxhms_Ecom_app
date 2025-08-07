import { AddressMaster } from "./AddressMaster";
import { AddressType } from "./enums";


export interface CustomerAddress {
  id: string;
  customerId: string;
  title: string;
  addressType: AddressType;
  address: AddressMaster;
  isDefault: boolean;
  username: string;
  addressTypes: string[]; // Assuming list of strings
}