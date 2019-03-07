import { Registration } from "./registration";
import { ISelectOption } from "../interfaces/ISelectOption";
import { Option } from "./common";
import { extend } from "webdriver-js-extender";

export class Admission extends Registration {
  $id?: string;
  ID?: string;
  patient_id?: string;
  admission_type?: string;
  diagonosed_in: string;
  progressive_in_year: string;
  from_health_unit: string;
  discharge_date: string;
  discharge_type: string;
  discharge_instruction: string;
  admission_notes: string;
  Is_allergic: boolean;
  bed_days: string
  Is_malnutritious: boolean;
  ward_number: string;
  index_number: number;
  admission_sequence: string;
  created_on: string;
  modified_on: string;
  created_by: string;
  modified_by: string;
  hmis_patient_base: Array<any>;
  hmis_patient_admission_ext: Array<PatientAdmissionExt>;
  hmis_patient_operation: Array<any>;

  constructor() {
    super();
  }
}

export class PatientAdmissionExt {
  $id?: string
  patient_admission_id?: string;
  attribute_name: string;
  attribute_value: string;
  ID?: string;
  hmis_patient_admission_base?: any;

  constructor() {

  }
}

export class StateList {
  constructor() {
  }
}

export class StateListOption extends Option {
  constructor() {
    super();
  }
}
export class PackageListOption extends Option {
  label: string;
  value: string;
  id: string;
  others?: number;
  constructor() {
    super();
  }
}
export class PriceListOption extends Option {
  label: string;
  value: number;
  id: string;
  others?: number = 1;
  constructor() {
    super();
  }
}
export class AdmissionTypeListOption extends Option {
  constructor() {
    super();
  }
}

export class PatientSelectionOption implements ISelectOption {
  label: string;
  value: string;


  constructor(public data: any) {
  }
}

export class AdmissionModel {
  Company_Name: string;
  Doctor_Under: string;
  Reffered_By: string;
  Reffered_By_Number: number;
  Reffered_Doctor: string;
  abnormal_bleeding: boolean;
  abnormal_bleeding_comment: string;
  admission_type: string;
  anesthetic_diculty: boolean;
  anesthetic_diculty_comment: string;
  body_height: number;
  body_weight: number;
  cardiac_surgery: boolean;
  cardiac_surgery_comment: string;
  dose: any;
  drink_alcohol: boolean;
  drink_alcohol_comment: string;
  emergency_person: string;
  emergency_person_contact: number;
  govt_id_number: string;
  govt_id_type: string;
  has_alergy: boolean;
  heart_disease: boolean;
  heart_disease_comment: string;
  heart_murmur: boolean;
  heart_murmur_comment: string;
  hospital_borne_infection: boolean;
  hospital_borne_infection_comment: string;
  insurance_coverage: number;
  insurance_number: number;
  kidney_disease: boolean;
  kidney_disease_comment: string;
  liver_disease_comment: string;
  medical_condition_details: string;
  medications: any;
  name_of_gurdian: string;
  package: string;
  patient_city: string;
  patient_medications: boolean;
  patient_nationality: string;
  patient_police_station: string;
  patient_registration_no: string;
  patient_religion: string;
  patient_state: string;
  ph_of_gurdian: number;
  previous_operation: boolean;
  previous_operation_comment: string;
  reaction: any;
  relation_with_patient: string;
  smoking: boolean;
  smoking_comment: string;
  substance: any;
  time_taken: any;
  name_of_pharmacy: string;
  ph_of_pharmacy: number;
  anticoagulants_or_blood_thinning: boolean;
  anticoagulants_or_blood_thinning_comment: string;
  mobile_aids: boolean;
  mobile_aids_comment: string;
  diculties_with_daily_living: boolean;
  diculties_with_daily_living_comment: string;
  community_services: boolean;
  community_services_comment: string;
  constructor() { }
}
export class AdmissionModelExtData {
  patient_nationality: string = '';
  patient_religion: string = '';
  body_height: number = 0;
  body_weight: number = 0;
  Reffered_By: string = '';
  Reffered_By_Number: number = 0;
  Reffered_Doctor: string = '';
  govt_id_number: string = '';
  govt_id_type: string = '';
  name_of_gurdian: string = '';
  ph_of_gurdian: number = 0;
  patient_city: string = '';
  patient_state: string = '';
  patient_police_station: string = '';
  emergency_person: string = '';
  emergency_person_contact: number = 0;
  relation_with_patient: string = '';
}
export class AdmissionMainModel {
  ID?: string;
  admission_id?: string;
  patient_id?: string;
  admission_type: string = '';
  admission_notes: string = '';
  ward_number: string = '';
  reffered_doctor_id: string = '';
  //admission_sequence:string = '';
  created_on: Date;
  modified_on: Date;
  //doctor_id: string = '';
  //package_id: string = '';
  //hmis_patient_admission_ext: any = [];
  //patient_nationality: string = '';
  //patient_religion: string = '';
  body_height: number = 0;
  body_weight: number = 0;
  //Reffered_By: string = '';
  //Reffered_By_Number: number = 0;
  //doctor_id?: string = '';
  govt_id_value: string = '';
  govt_id_type: string = '';
  name_of_gurdian: string = '';
  gurdian_ph_number: number = 0;
  //patient_city: string = '';
  //patient_state: string = '';
  //patient_police_station: string = '';
  emergency_contact_person: string = '';
  emergency_contact_person_ph: number = 0;
  relationship_with_patient: string = '';
  building_id: string = '';
  floor_id: string = '';
  bed_number: string = '';
  created_by: string = '';
  modified_by: string = '';
  // Company_Name?: string;
  // insurance_number?: string;
  // insurance_coverage?: string;
  doctor_id?: string = '';
  doctor_name: string;
  //referred_doctor_id?: string = '';
  /*  patient_city: string;
   patient_medications: boolean;
   patient_nationality: string;
   patient_police_station: string;
   patient_registration_no: string;
   patient_religion: string; */
  patient_dob: Date = new Date();
  // patient_name: string = '';
  // patient_age: string = '';
  //patient_religion: string = '';
  // patient_sex: string
  //bed_no: string = '';
  //patient_address: string = '';
  patient_blood_group: string = '';
  //admitted_on: string;
  //patient_registration_no: string = '';
  //discharge_date: string = '';
  //discharge_type: string = '';
  //discharge_instruction: string
  //created_by:string='';
  //modified_by:string='';


}

export class ArrangeAdmissionModel {

}

export class billingModel {
  package_id?: string;
  package_amount?: string;
  admission_id?: string;
  created_by?: string;
  modified_by?: string;
}

export class advanceBillingModel {
  patient_id?: string;
  admission_id?: string;
  advance_paid_by?: string;
  advance_amount?: string;
  advance_payment_mode?: string;
  created_by?: string;
  modified_by?: string;
}

export class Discharge {
  patient_id?: string;
  admission_sequence?: string;
  patient_registration_no?: string;
  relation_of?: string;
  doctor_name?: string;
  discharge_advice?: string;
  final_diagnosis?: string;
  treatment_advice?: string;
  discharge_date?: string;
}
