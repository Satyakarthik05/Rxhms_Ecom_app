import { CustomerMaster } from "./CustomerMaster";

export interface AddonRequest {
       primaryCustomerId?: string,
		relationship: string,
		customer: CustomerMaster
}