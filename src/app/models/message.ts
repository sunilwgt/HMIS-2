export class MessageType {
  type?: string
  msgstring: string;
  data?: any;
  id?: string | number;
  option?: string;
  constructor() { }
}

export const USER_NAME: string = "username";
export const PASSWORD: string = "password";
export const MISSMATCH: string = "missmatch";
export const FIRSTNAME: string = "firstname";
export const LASTNAME: string = "lastname";
export const PATIENTSEX: string = "sex";
export const BPLHOLDER: string = "bplholder";
export const CONSENTSIGNED: string = "consentSigned";
export const BLOODOPTION: string = "bloodoption";
export const PHONENO: string = "phoneNumber";
export const DATEOFBIRTH: string = "datOfBirth";
export const AGE: string = "age";
export const REFERREDDOCTOR: string = "refferedDoctor";
export const GOVTIDTYPE: string = "govtIDType";
export const GOVTIDNUMBER: string = "govtIDNumber";
export const CONTACTPERSON: string = "contactPersonEmergency";
export const CONTACTPERSONNUMBER: string = "contactPersonNumber";