import { UserDetail } from "./userole";
import { Option } from "./common";

export class Doctor extends UserDetail {
        constructor() {
        super();
    }
}



export class Approver extends UserDetail {
    constructor() {
        super();
    }
}
export class DoctorOptions extends Option {
    constructor() {
        super();
    }
}
export class SurguryTypeOptions extends Option {
    constructor() {
        super();
    }
}
export class OperationTypeOptions extends Option {
    constructor() {
        super();
    }
}

export class Disease extends UserDetail {
    decease_code?: string;
    decease_type_name?: string;
    description?: string;
    created_by?: string;
    modified_by?: string;
}
//building
export class Building {
    building_name: string;
    building_location: string;
    description?: string;
}

 

export class Approverr {
    approver_id: string;
    approver_type: string;
    delegate_id?: string;
    is_delegate?:boolean;
    created_by?;string;
    modified_by?:string;
    status?;boolean;
}
//Approval
// export class Approval {
//     approval_status_name: string;
//     approval_status_type: string;
//     created_by?: string;
//     modified_by?: string;
// }



export class User {
    first_name: string;
    last_name: string;
    user_name?: string;
    password?:any;
}

export class UserType {
    role_name:string;
    role_description:string;
    created_by?: string;
    modified_by?: string;
}

export class ApprovalModal {
     approval_status_name: string;
    approval_status_type: string;
    created_by?: string;
    modified_by?: string;
    ID?:string;
    status?:boolean;
    constructor() {
    }
}
export class Floor extends UserDetail {
    floor_name: string;
    created_by?: string;
    modified_by?: string;
    constructor() {
        super();
    }
}

export class BuildingOptions extends Option {
    Name: string;
    ID: string;
    // export class BuildingOptions extends Option{
    //     building_name: string;
    //     building_id: string;
    //     Description: string;
    // >>>>>>> c77069ca944ca0863121ca8f9a2af37298d67a48
    //     constructor() {
    //         super();
    //     }
}

export class FloorOptions extends Option {
    floor_name: string;
    building_id: string;
    Description: string;
    constructor() {
        super();
    }
}
export class WardOptions extends Option {
    floor_name: string;
    building_id: string;
    Description: string;
    constructor() {
        super();
    }
}
export class wardTypeOptions extends Option {
    constructor() {
        super();
    }
}
export class deliveryTypeOptions extends Option {
    constructor() {
        super();
    }
}
export class Ward {
    ward_name: string;
    description: string;
    beds: number;
    floor_id: string;
    constructor() {

    }
}

export class Surgery {
    surgery_type_name: string;
    description: string;
    constructor() {

    }
}

export class AdmissionType {
    admission_type_name: string;
    admission_type_code: string;
    admission_type_desc: string;
    constructor() {
    }
}

export class DischargeType {
    discharge_type_name: string;
    description: string;
    constructor() {
    }
}

export class DischargeCertificate{
    patient_id?:string = '';
    admission_id?:string = '';
    relationship?:string = '';
    final_diagonysis?:string = '';
    discharge_note?:string = '';
    advise_on_discharge?:string = '';
    created_by?:string = '';
    modified_by?:string = '';
        constructor(){

    }
}

export class DeliveryType {
    delivery_type_name: string;
    description: string;
    constructor() {
    }
}

export class OperationType {
    operation_type_name: string;
    description: string;
    constructor() {
    }
}

export class PregnantTreatment {
    pregnant_name: string;
    description: string;
    constructor() {
    }
}

export class VaccineType {
    vaccine_name: string;
    description: string;
    constructor() {
    }
}
export class fileupload {
    // assignfor: string;
    // assignto: string;
    description: string;
    Reffered_Doctor:string;
    file:any;
    pateint_reg_no:any;
    constructor() {
    }
}

export class WardType {
    ward_type_name: string;
    description: string;
    beds: string;
}
export class Packages {

}
export class OtType {

}
export class Bed {

}
export class Price {

}
export class Billing {
    ID?: string;
    patient_id?: string;
    admission_id?: string;
    opeeration_id?: string;
    total_amount: number;
    package_id?: string;
    due_amount: number;
    advance_amount: number;
    total: number;
    status: string;
    insurance_company_id?: string;
    created_by?: string;
    modified_by?: string;
    isAdjust?: boolean;
    approvalStatusId: string;
    ApproverId:string;
    approval_note:string;
}


export class PatientApproval{
    assigned_to:string;
    approval_status_id:string;
    admission_id:string;
    transaction_id?:string;
    patient_id?:string;
    transaction_type?:string;
    created_by?:string;
    modified_by?:string;
    notification_sent?:boolean;
    approval_note?:string;
    ID?:string;
    Dueamount?:Number;
    TotalAmount?:Number;
    
    
}
export class BedOptions extends Option {
    constructor() {
        super();
    };
}
export class NewBorn {


    $id?: string;
Discharged?: any;
ID?: String
OpenOT?: any;
TotalOT?: any;
admission_bed_id?: any;
admission_id?: any;
admission_notes?: any;
admission_sequence?: any;
admission_type?: any;
admission_type_name?: any;
bed_number?: any;
body_height?: any;
body_weight?: any;
building_id?: any;
building_name?: any;
created_by?: any;
created_on?: any;
discharge_date?: any;
doctor_name?: any;
doctor_under_id?: any;
emergency_contact_person?: any;
emergency_contact_person_address?: any;
emergency_contact_person_ph?: any;
floor_id?: any;
floor_name?: any;
govt_id_type?: any;
govt_id_value?: any;
gurdian_ph_number?: any;
modified_by?: any;
name_of_gurdian?: any;
nationality?: any;
patient_address?: any;
patient_age?: any;
patient_blood_group?: any;
patient_city?: any;
patient_dob?: any;
patient_first_name?: any;
patient_id?: any;
patient_last_name?: any;
patient_name?: any;
patient_phone?: any;
patient_registration_no?: any;
patient_sex?: any;
police_station?: any;
referred_doctor_id?: any;
referred_doctor_name?: any;
relationship_with_patient?: any;
religion?: any;
ward_name?: any;
ward_number?: any;
Is_malnutrition: boolean;
is_born_critical_illness: boolean
is_twin: boolean;
dob:any;
    constructor() {
        

    }
}

export class Liscence {
    constructor() {

    }
}


export class DischargeTypeOption extends Option {
    constructor() {
        super();
    };
}

export class DischargeModal {
    discharge_date?: string;
    discharge_type?: string;
    discharge_instruction?: string;
    patient_id?: string;
    admission_id?: string;
    created_by?: string;
    modified_by?: string;
    constructor() {
    }
    


}
export class BillingDistribution{
    patient_billing_id:string='';
    patient_admission_id:string='';
    patient_id:string='';
    created_by:string = '';
    modified_by:string = '';
    actual_cost_ward_medicine :number = 0;
    anaesthetic_machine_gasses_charges : number = 0;
    anaesthetist_charges : number = 0;
    assistance_charges :number = 0;
    bed_charges :number = 0;
    doctor_visit_charges :number = 0;
    dressing_charges :number = 0;
    emergency_management_charges :number = 0;
    extra_diet :number = 0;
    fluid_surgical_goods_cost :number = 0;
    investigation_charges : number = 0;
    labour_room_charges :number = 0;
    medicine_cost_during_operation :number = 0;
    misscellaneous_charges :number = 0;
    nebulization_charges :number = 0;
    operation_theatre_charges :number = 0;
    oxygen_inhalation_charges :number = 0;
    phototherapy_charges :number = 0;
    pulse_oxymeter_charges :number = 0;
    specialist_consultation_charges :number = 0;
    special_nursing_charges :number = 0;
    surgeon_charge :number = 0;
    warm_care_charges :number = 0;
constructor(){

}
}
export class BillSummery{
    compData:any;
    AdvanceBilling:any;
    billingModel:any;
    packageBilling:any;
    distributionBilling:any;
    priceList:any;
    individualCharges:any = [];
  
    constructor(){

    }
}
