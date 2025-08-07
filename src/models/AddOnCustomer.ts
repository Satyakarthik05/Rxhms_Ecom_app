import { CustomerMaster } from "./CustomerMaster";

export interface AddOnCustomer {


    id: string | null,
    primaryId: string,
    customer: CustomerMaster,
    relationship: string,
    addedOn: string | null



}

