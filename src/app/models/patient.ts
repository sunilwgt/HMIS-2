import { UserDetail } from "./userole";
import { Option } from "./common";

export class Patient {
  public patient_first_name: string;
  public patient_registration_no: string;
  public patient_last_name: string;
  public patient_sex: string = '';
  public patient_dob: string = '';
  public patient_age: number = 0;
  public Reffered_Doctor: string;
  public patient_address: string;
  // public patient_state : string = '';
  public patient_city: string = '';
  public patient_phone: string = '';
  public patient_name: string = '';
  public patient_id?: string = '';
  public nationality?: string = '';
  public religion?: string = '';
  public police_station?: string = '';

  constructor() { }

}
export class OtCreate {

  // public patient_name: string = ''
  // public patient_registration_no: string = ''
  // public patient_sex: string = '';
  // public patient_dob: string = '';
  // public patient_age: string = '';
  public ID?: string;
  public admission_id: string;
  public patient_id: string;
  public operation_type_id: string;
  public operation_datetime?: string;
  public operation_date?: string;

  public operation_time?: string;
  public surgery_type_id: string;
  public Doctor_Under?: string;
  //public surgeon: string;
  public consent_note?: string;
  public doctor_id: string;
  public anesthesiologist_id: string;
  public purpose_of_surgery: string;
  public assisting_doctor_id: string;
  public special_instruction: string;
  public patient_operation_start: string;
  public patient_operation_end?: string;
  public created_by: string;
  public modified_by: string;
  public status?: boolean;
  public Is_Released_to_Bed?: boolean;
  constructor() { }

}

export class Prescription extends UserDetail {
  date: Date = new Date();
  patient_name: string;
  patient_age: number;
  patient_phone_no: number;
  patient_sex: string;
  patient_history?: string;
  doctor_id: string;
  patient_id: string;
  note?: string;
  created_by?: string;
  modified_by?: string;
  ID?: string;
  status?: boolean;
  constructor() {
    super();
  }
}



export class patientListOption extends Option {
  label: string;
  value: string;
  id: string;
  constructor() {
    super();
  }
}
