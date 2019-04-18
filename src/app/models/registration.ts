import { Option } from "./common";

export class Registration {
  $id?: string;
  ID?: string;
  patient_registration_no?: string;
  patient_first_name?: string;
  patient_last_name?: string;
  patient_phone?: string;
  additiona_info?: string;
  patient_dob?: string; // "25-JUN-1978",
  patient_blood_type?: string;
  Is_Bpl_holder?: boolean;
  Is_Past_History?: string;
  Is_Medicine_Adverse_Effect?: string;
  Reffered_Doctor?: string;
  Is_Consent_Signed?: boolean;
  patient_sex?: string;

  patient_notes?: string;

  patient_city?: string;
  patient_address?: string;

  hmis_patient_ext?: Array<PatientExt>;
  patient_age?: number;
  govt_id_type?: string;
  govt_id_number?: string;
  reffered_doctor?: string;
  patient_state?: string;
  emergency_person?: string;
  emergency_person_contact?: string;
  patient_police_station?: string;
  patient_post_office?: string;
  patient_dist?: string;
  patient_profession?: string;
  patient_age_unit: string;
  // Referred to
  // age
  // father name
  // is father alive
  // mother name
  // is father alive
  // is parents together
  // has insurance
  // Relation with patient

  // state
  // Contact person in case of emergency
  // contact phone no


  // dateofbirth:string;
  // dob?:DOB;
  // phoneNo:number

  // age?:number;


  constructor() {

  }
}

export class DOB {
  day: number;
  month: number;
  year: number;

  constructor() {

  }

  get dobInStr() {
    return this.day.toString() + this.month.toString() + this.year.toString();
  }
}

export class CompDataInfo {
  propname: string;
  newval: any;
  comptypeid?: number;
  comptypename?: string;
  extraprops?: any;

  constructor() {

  }
}

export class PatientExt {
  $id?: string
  patient_id?: string;
  attribute_name: string;
  attribute_value: string;
  ID?: string;
  hmisPatientBase?: null;

  govt_id_type?: string;
  govt_id_number?: string;
  emergency_person?: string;
  emergency_person_contact?: string;
  constructor() {

  }
}

export class PatientOption extends Option {
  id: string;
  value: string;
  patientobj: Registration;

  constructor() {
    super()
  }

}
