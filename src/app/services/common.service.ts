import { Injectable, EventEmitter } from '@angular/core';
import { Option, RadioData, ApproveOption, ApprovalOption, userOption, userpermissionOption } from '../models/common';
import { Subject } from 'rxjs/Subject';
import { Department, DepartmentType, DepartmentOption, DepartmentTypeOption} from '../models/department';
import { Floor, FloorOptions, Ward, Doctor, DoctorOptions, WardOptions, SurguryTypeOptions, OperationTypeOptions, BedOptions, wardTypeOptions, Billing, DischargeType, DischargeTypeOption, Building, BuildingOptions, DeliveryType, deliveryTypeOptions, DischargeModal, BillingDistribution } from '../models/opd';
import { StateList, StateListOption, PatientSelectionOption, PackageListOption, AdmissionTypeListOption, ArrangeAdmissionModel, AdmissionMainModel, advanceBillingModel } from '../models/admission';
import { ISelectOption } from '../interfaces/ISelectOption';
import { Patient, patientListOption, OtCreate, Prescription } from '../models/patient';
import { HelperFunction } from '../utils/helper-function.service';
import { DatePipe } from '@angular/common';
import { HmisApisService } from './hmis-apis.service';
declare var jsPDF: any;
@Injectable()
export class CommonService {
  private _cmnObserver: Subject<any> = new Subject();
  admdateobserever:any;
  regdateObserver:any;
  DepartmentType: any;
  WardType: any;
  Department: any;
  Approve:any;
  Approval:any;
  User:any;
  Userpermission:any;
  Building: any;
  Floor: any;
  patients: any;
  bed: any;
  minisidebar: boolean = false;
  selectedWard: string;
  selectedFloor: string;
  dischargeList: any;
  deliveryList: any;
  patientData: any;
  //deleteHandler: EventEmitter<any> = new EventEmitter();
  permittedrole:any;

  constructor(private helperFunc: HelperFunction, public datepipe: DatePipe) { }

  setpermissionrole(pname){
    this.permittedrole = pname;
      }
      
      getpermissionrole(){
        return this.permittedrole;
      }

  get bloodOptions(): Array<Option> {
    return [
      { label: "Please select", id: 0, value: 0, indexno: 0 },
      { label: "A+", id: 1, value: 'A+', indexno: 1 },
      { label: "A-", id: 2, value: 'A-', indexno: 2 },
      { label: "B+", id: 3, value: 'B+', indexno: 3 },
      { label: "B-", id: 4, value: 'B-', indexno: 4 },
      { label: "AB+", id: 5, value: 'AB+', indexno: 5 },
      { label: "AB-", id: 6, value: 'AB-', indexno: 6 },
      { label: "O+", id: 7, value: 'O+', indexno: 7 },
      { label: "O-", id: 8, value: 'O-', indexno: 8 },
    ]
  }


  convertdate(from , to) {
    const fromdate = from.getDate();
    const frommonth = from.toLocaleString('en-us', { month: 'short' });
    const fromyear = from.getFullYear()
   const convertedfromdate = fromdate + "-" + frommonth + "-" + fromyear;
    const todate = to.getDate();
    const tomonth = to.toLocaleString('en-us', { month: 'short' });
    const toyear = to.getFullYear()
    const convertedtodate = todate + "-" + tomonth + "-" + toyear;
    return { from:convertedfromdate , to:convertedtodate}
  }

  setdateforadmissionsearch(f,t){
    this.admdateobserever = {from:f , to:t};
  }

  admobserver() {
    return this.admdateobserever;
  }

  setdateforregsearch(f,t){
    this.regdateObserver = {from:f , to:t};
  }

  regdateobserver() {
    return this.regdateObserver;
  }
  get govtIdType(): Array<Option> {
    return [
      { label: "Please select", id: 0, value: 0, indexno: 0 },
      { label: "Aadhar card", id: 1, value: 'aadharCard', indexno: 1 },
      { label: "Voter Id", id: 2, value: 'voterId', indexno: 2 },
      { label: "Driving licence", id: 3, value: 'drivingLicence', indexno: 3 },
      { label: "Ration card", id: 4, value: 'rationCard', indexno: 4 },
    ]
  }

  get radioYesNoOptions(): Array<RadioData> {
    let arr: Array<RadioData> = [];
    arr.push(this.getNewObj("Yes", true, 1));
    arr.push(this.getNewObj("No", false, 2))

    return arr;
  }

  getNewObj(label: string, value: boolean, id: number): RadioData {
    let rd: RadioData = new RadioData();
    rd.label = label;
    rd.value = value;
    rd.id = id;
    return rd;
  }

  get genderOptions(): Array<RadioData> {
    return [
      { label: "Male", value: "Male", id: 1 },
      { label: "Female", value: "Female", id: 2 },
      { label: "Transgender", value: "Transgender", id: 3 }
    ]
  }
  get IsAdjust(): Array<RadioData> {
    return [{ label: "", value: "True", id: 1 }]
  }
  get nationalityOption(): Array<Option> {
    return [
      { label: "Indian", value: "Indian", id: 1 },
      { label: "Bangladesi", value: "Bangladesi", id: 2 },
      { label: "Other", value: "Other", id: 3 }
    ];
  }
  get religionOption(): Array<Option> {
    return [
      { label: "Hindu", value: "Hindu", id: 1 },
      { label: "Muslims", value: "Muslims", id: 2 },
      { label: "Sikh", value: "Sikh", id: 3 },
      { label: "chistan", value: "chistan", id: 4 },
      { label: "Budhist", value: "Budhist", id: 5 },
      { label: "Jainist", value: "Jainist", id: 6 }
    ];
  }

  get paymentModeOption(): Array<Option> {
    return [
      { label: "Please select", id: 0, value: 0, indexno: 0 },
      { label: "Cash", id: 1, value: 'Cash', indexno: 1 },
      { label: "POS", id: 2, value: 'POS', indexno: 2 },
      { label: "Credit/Debit", id: 3, value: 'Credit/Debit', indexno: 3 }
    ]
  }

  get relationWithOption(): Array<Option> {
    return [
      { label: "Father", value: "Father", id: 1 },
      { label: "Mother", value: "Mother", id: 2 },
      { label: "Son", value: "Son", id: 3 },
      { label: "Wife", value: "Wife", id: 4 },
      { label: "Brother", value: "Brother", id: 5 },
      { label: "Wife", value: "Wife", id: 6 },
      { label: "Neibour", value: "Neibour", id: 7 },
      { label: "Other", value: "Other", id: 8 }
    ];
  }
  get insuranceCompanyOption(): Array<Option> {
    return [
      { label: "Sastya sathi", value: "Sastya sathi", id: 1 },
      { label: "RSBI", value: "RSBI", id: 2 },
    ];
  }
  get admitedby(): Array<RadioData> {
    return [
      { label: "Patient", value: "Patient", id: 1 },
      { label: "Guardian", value: "Guardian", id: 2 },
      { label: "relative", value: "relative", id: 3 },
      { label: "Other (Specify)", value: "other", id: 4 }
    ]
  }

  public publishEvt(data: any): void {
    this._cmnObserver.next(data);
  }

  get cmnObserver() {
    return this._cmnObserver.asObservable();
  }


  get status(): Array<RadioData> {
    return [
      { label: "Active", value: "Active", id: 1 },
      { label: "Inactive", value: "Inactive", id: 2 },
    ]
  }

  get reimbursement(): Array<RadioData> {
    return [
      { label: "Yes", value: "Yes", id: 1 },
      { label: "No", value: "No", id: 2 },
    ]
  }

  get stateOptions(): Array<Option> {
    return [
      { label: "WestBengal", id: 1, value: "WestBengal", indexno: 0 },
    ]
  }

  public departmentTypeOption(data: Department): Array<DepartmentTypeOption> {
    let deaprtmentTypeArray: Array<DepartmentTypeOption> = [];
    this.DepartmentType = data;
    for (let val of this.DepartmentType) {
      let dTOpt: DepartmentTypeOption = new DepartmentTypeOption();
      dTOpt.label = val.Name;
      dTOpt.value = val.ID;
      deaprtmentTypeArray.push(dTOpt);
    }
    return deaprtmentTypeArray;
  }

  public departmentOption(data: DepartmentType): Array<DepartmentOption> {
    let deaprtmentArray: Array<DepartmentOption> = [];
    this.Department = data;
    for (let val of this.Department) {
      let dOpt: DepartmentOption = new DepartmentOption();
      dOpt.label = val.department_name;
      dOpt.value = val.ID;
      deaprtmentArray.push(dOpt);
    }
    return deaprtmentArray;
  }

  public approveOption(data): Array<ApproveOption> {
    let approveArray: Array<ApproveOption> = [];
    this.Approve = data;
    for (let val of this.Approve) {
      let d : ApproveOption = new ApproveOption();
      d.label = val.Name;
      d.value = val.ID;
      approveArray.push(d);
    }
    return approveArray;
  }


  public approvalOption(data): Array<ApprovalOption> {
    let approvalArray: Array<ApprovalOption> = [];
    this.Approval = data;
    for (let val of this.Approval) {
      let d : ApprovalOption = new ApprovalOption();
      d.label = val.approval_status_name;
      d.value = val.ID;
      approvalArray.push(d);
    }
    return approvalArray;
  }

  public usersOption(data): Array<userOption> {
    let usersArray: Array<userOption> = [];
    this.User = data;
    for (let val of this.User) {
      let d : userOption = new userOption();
      d.label = val.Name;
      d.value = val.ID;
      usersArray.push(d);
    }
    return usersArray;
  }

  public userspermissionOption(data): Array<userpermissionOption> {
    let usersArray: Array<userpermissionOption> = [];
    this.Userpermission = data;
    for (let val of this.Userpermission) {
      let d : userpermissionOption = new userpermissionOption();
      d.label = val.Name;
      d.value = val.ID;
      usersArray.push(d);
    }
    return usersArray;
  }

  public buildingOption(data: Building): Array<BuildingOptions> {
    let buildingArray: Array<BuildingOptions> = [];
    this.Building = data;
    for (let val of this.Building) {
      let dOpt: BuildingOptions = new BuildingOptions();
      dOpt.label = val.Name;
      dOpt.value = val.ID;
      buildingArray.push(dOpt);
    }
    return buildingArray;
  }

  public floorOption(data: Ward): Array<FloorOptions> {
    let floorArray: Array<FloorOptions> = [];
    this.Floor = data;
    for (let val of this.Floor) {
      let dOpt: FloorOptions = new FloorOptions();
      dOpt.label = val.Name;
      dOpt.value = val.ID;
      floorArray.push(dOpt);
    }
    return floorArray;
  }
  public wardOption(data: Ward): Array<WardOptions> {
    let wardArray: Array<WardOptions> = [];
    this.Floor = data;
    for (let val of this.Floor) {
      let dOpt: WardOptions = new WardOptions();
      dOpt.label = val.Name;
      dOpt.value = val.ID;
      wardArray.push(dOpt);

    }
    return wardArray;
  }
  public wardTypeOption(data: Ward): Array<wardTypeOptions> {
    let wardTypeArray: Array<wardTypeOptions> = [];
    this.WardType = data;
    for (let val of this.WardType) {
      let wdOpt: wardTypeOptions = new wardTypeOptions();
      wdOpt.label = val.ward_type_name;
      wdOpt.value = val.ID;
      wardTypeArray.push(wdOpt);
    }
    return wardTypeArray;
  }

  public doctorListOptions(data: any): Array<DoctorOptions> {
    let doctorArray: Array<DoctorOptions> = [];
    for (let val of data) {
      let dOpt: DoctorOptions = new DoctorOptions();
      dOpt.label = val.Name
      // val.first_name + ' ' + val.last_name;
      dOpt.value = val.ID;
      doctorArray.push(dOpt);
    }
    return doctorArray;
  }
  public surguryTypeListOptions(data: any): Array<SurguryTypeOptions> {
    let surguryArray: Array<SurguryTypeOptions> = [];
    for (let val of data) {
      let dOpt: SurguryTypeOptions = new SurguryTypeOptions();
      dOpt.label = val.Name;
      dOpt.value = val.ID;
      surguryArray.push(dOpt);
    }
    return surguryArray;
  }
  public operationTypeListOptions(data: any): Array<OperationTypeOptions> {
    let optTypeArray: Array<OperationTypeOptions> = [];
    for (let val of data) {
      let dOpt: OperationTypeOptions = new OperationTypeOptions();
      dOpt.label = val.Name;
      dOpt.value = val.ID;
      optTypeArray.push(dOpt);
    }
    return optTypeArray;
  }

  public stateListOption(data: any): Array<StateListOption> {
    let stateListArray: Array<StateListOption> = [];
    for (let val of data) {
      let sOpt: StateListOption = new StateListOption();
      sOpt.label = val.state_name;
      sOpt.value = val.ID;
      stateListArray.push(sOpt);
    }
    return stateListArray;
  }
  public packageListOption(data: any): Array<RadioData> {
    let packageListArray: Array<RadioData> = [];
    for (let val of data) {
      let sOpt: RadioData = new RadioData();
      //sOpt.label = val.package_name + ' - ₹' + val.package_amount;
      sOpt.label = val.package_name;
      sOpt.value = val.ID;
      packageListArray.push(sOpt);
    }
    return packageListArray;
  }
  public admissionTypeListOption(data: any): Array<AdmissionTypeListOption> {
    let admissionTypeListArray: Array<AdmissionTypeListOption> = [];
    for (let val of data) {
      let sOpt: AdmissionTypeListOption = new AdmissionTypeListOption();
      sOpt.label = val.Name;
      sOpt.value = val.ID;
      admissionTypeListArray.push(sOpt);
    }
    return admissionTypeListArray;
  }
  public convertToPatientList(data: any): Array<ISelectOption> {
    let tArr: Array<ISelectOption> = []
    for (let v of data) {
      let pobj: ISelectOption = new PatientSelectionOption(v);
      pobj.label = v.patient_first_name;
      pobj.value = v.ID;
      tArr.push(pobj);
    }
    return tArr;
  }

  public patientListOption(data: any): Array<patientListOption> {
    let patientListArray: Array<patientListOption> = [];
    this.patients = data;
    for (let val of this.patients) {
      let pOpt: patientListOption = new patientListOption();
      pOpt.label = val.patient_first_name + ' ' + val.patient_last_name;
      pOpt.value = val.ID;
      patientListArray.push(pOpt);
    }
    return patientListArray;
  }

  public bedOptions(data: any): Array<BedOptions> {
    let bedArray: Array<BedOptions> = [];
    this.bed = data;
    for (let val of this.bed) {
      let dOpt: BedOptions = new BedOptions();
      var bedNumber = val.bed_number.split("-");
      dOpt.label = bedNumber[2] === undefined ? val.bed_number : bedNumber[2];
      dOpt.value = val.ID;
      bedArray.push(dOpt);
    }
    return bedArray;

  }

  public dischargeTypeListOption(data: any): Array<DischargeTypeOption> {
    let DischargeArray: Array<DischargeTypeOption> = [];
    this.dischargeList = data;
    for (let val of this.dischargeList) {
      let dOpt: DischargeTypeOption = new DischargeTypeOption();
      dOpt.label = val.Name;
      dOpt.value = val.ID;
      DischargeArray.push(dOpt);
    }
    return DischargeArray;
  }

  public deliveryTypeListOption(data: any): Array<deliveryTypeOptions> {
    let deliveryArray: Array<deliveryTypeOptions> = [];
    this.deliveryList = data;
    for (let val of this.deliveryList) {
      let dOpt: deliveryTypeOptions = new deliveryTypeOptions();
      dOpt.label = val.Name;
      dOpt.value = val.ID;
      deliveryArray.push(dOpt);
    }

    return deliveryArray;
  }

  public admissionFormObject(data: any) {
    let admissionObject = new Patient();
    admissionObject = data;
    var dob = data.patient_dob.split("T");
    //admissionObject.patient_dob = this.datepipe.transform(dob[0], 'dd-mm-yyyy');
    admissionObject.patient_dob = dob[0];
    admissionObject.patient_age = this.helperFunc.getCalculatedAge(dob[0]);
    admissionObject.patient_name = data.patient_first_name + ' ' + data.patient_last_name;
    admissionObject.patient_sex = data.patient_sex;
    admissionObject.patient_city = data.patient_city;
    admissionObject.nationality = data.nationality;
    admissionObject.religion = data.religion;
    admissionObject.police_station = data.police_station;

    return admissionObject;
  }

  public admissionUpdateFormObject(data: any) {
    let admissionUpdateObject = new AdmissionMainModel();
    admissionUpdateObject.ID = data.ID;
    admissionUpdateObject.name_of_gurdian = data.name_of_gurdian;
    admissionUpdateObject.gurdian_ph_number = data.gurdian_ph_number;
    admissionUpdateObject.emergency_contact_person = data.emergency_contact_person;
    admissionUpdateObject.emergency_contact_person_ph = data.emergency_contact_person_ph;
    admissionUpdateObject.relationship_with_patient = data.relationship_with_patient;
    admissionUpdateObject.doctor_id = data.doctor_under_id;
    admissionUpdateObject.govt_id_type = data.govt_id_type;
    admissionUpdateObject.govt_id_value = data.govt_id_value;
    admissionUpdateObject.body_height = data.body_height;
    admissionUpdateObject.body_weight = data.body_weight;
    admissionUpdateObject.admission_notes = data.admission_notes;
    admissionUpdateObject.floor_id = data.floor_id;
    admissionUpdateObject.ward_number = data.ward_number;
    admissionUpdateObject.bed_number = data.admission_bed_id;
    admissionUpdateObject.created_by = data.created_by;
    admissionUpdateObject.modified_by = data.modified_by;
    admissionUpdateObject.patient_id = data.patient_id;
    admissionUpdateObject.admission_type = data.admission_type;
    admissionUpdateObject.reffered_doctor_id = data.referred_doctor_id;
    admissionUpdateObject.patient_blood_group = data.patient_blood_group;
    admissionUpdateObject.patient_dob = data.patient_dob;
    admissionUpdateObject.building_id = data.building_id;
    //admissionUpdateObject.doctor_name = data.doctor_name;
    //admissionUpdateObject.patient_name = data.patient_first_name + ' ' + data.patient_last_name;
    //admissionUpdateObject.patient_age = data.patient_age;
    //admissionUpdateObject.patient_religion = data.religion;
    //admissionUpdateObject.patient_sex = data.patient_sex;
    //admissionUpdateObject.bed_no = data.bed_number;
    //admissionUpdateObject.patient_address = data.patient_address;
    //admissionUpdateObject.admitted_on = data.admitted_on;
    //admissionUpdateObject.patient_registration_no = data.patient_registration_no;
    //admissionUpdateObject.discharge_date = data.discharge_date;
    //admissionUpdateObject.discharge_type = data.discharge_type;
    //admissionUpdateObject.discharge_instruction = data.discharge_instruction;
    //admissionUpdateObject.admission_sequence = data.admission_sequence;
    return admissionUpdateObject;
  }

  public arrangeDataForAdvanceBilling(data: any) {
    let advanceBillingObject = new advanceBillingModel();
    advanceBillingObject.patient_id = data.registration_id;
    advanceBillingObject.admission_id = data.admission_id;
    advanceBillingObject.advance_paid_by = data.advance_paid_by;
    advanceBillingObject.advance_payment_mode = data.advance_payment_mode;
    advanceBillingObject.advance_amount = data.advance_amount;
    advanceBillingObject.created_by = data.created_by;
    advanceBillingObject.modified_by = data.modified_by;
    return advanceBillingObject;
  }

  public arrangeDataForOTModel(data: any) {
    let OTMOdelObject = new OtCreate();
    OTMOdelObject.admission_id = data.ID;
    OTMOdelObject.patient_id = data.patient_id;
    OTMOdelObject.operation_type_id = data.operation_type_id;
    OTMOdelObject.operation_datetime = this.datepipe.transform(data.operation_datetime, 'yyyy-MM-dd');
    OTMOdelObject.patient_operation_start = data.patient_operation_start;
    OTMOdelObject.surgery_type_id = data.surgery_type_id;
    OTMOdelObject.doctor_id = data.doctor_id;
    OTMOdelObject.anesthesiologist_id = data.anesthesiologist_id;
    OTMOdelObject.purpose_of_surgery = data.purpose_of_surgery;
    OTMOdelObject.assisting_doctor_id = data.assisting_doctor_id;
    OTMOdelObject.special_instruction = data.special_instruction;
    OTMOdelObject.Is_Released_to_Bed = true;
    OTMOdelObject.created_by = data.created_by;
    OTMOdelObject.modified_by = data.modified_by;
    return OTMOdelObject;
  }

  public arrangeDataForOTModelForUpdate(data: any) {
    let OTMOdelObject = new OtCreate();
    OTMOdelObject.ID = data.operation_id;
    OTMOdelObject.admission_id = data.admission_id;
    OTMOdelObject.patient_id = data.patient_id;
    OTMOdelObject.operation_type_id = data.operation_type_id;
    OTMOdelObject.operation_datetime = this.datepipe.transform(data.operation_datetime, 'yyyy-MM-dd');
    OTMOdelObject.patient_operation_start = data.patient_operation_start;
    OTMOdelObject.patient_operation_end = data.patient_operation_end;
    OTMOdelObject.surgery_type_id = data.surgery_type_id;
    OTMOdelObject.doctor_id = data.doctor_id;
    OTMOdelObject.anesthesiologist_id = data.anesthesiologist_id;
    OTMOdelObject.purpose_of_surgery = data.purpose_of_surgery;
    OTMOdelObject.assisting_doctor_id = data.assisting_doctor_id;
    OTMOdelObject.special_instruction = data.special_instruction;
    OTMOdelObject.created_by = data.created_by;
    OTMOdelObject.modified_by = data.modified_by;
    OTMOdelObject.status = true;
    return OTMOdelObject;
  }

  public arrangeDataForPrescription(data: any) {
    let prescriptionModelObject = new Prescription();
    // prescriptionModelObject.patient_name = data.patient_first_name+' '+data.patient_last_name;
    // prescriptionModelObject.patient_age = data.patient_age;
    // prescriptionModelObject.patient_phone_no = data.patient_phone;
    // prescriptionModelObject.patient_sex = data.patient_sex;
    prescriptionModelObject.patient_history = data.patient_history;
    prescriptionModelObject.doctor_id = data.doctor_id;
    prescriptionModelObject.patient_id = data[0].ID;
    prescriptionModelObject.date = data.date;
    prescriptionModelObject.note = data.note;
    return prescriptionModelObject;
  }

  public arrangeDataForPrescriptionForUpdate(data: any) {
    let prescriptionModelObject = new Prescription();
    // prescriptionModelObject.patient_name = data.patient_first_name+' '+data.patient_last_name;
    // prescriptionModelObject.patient_age = data.patient_age;
    // prescriptionModelObject.patient_phone_no = data.patient_phone;
    // prescriptionModelObject.patient_sex = data.patient_sex;
    prescriptionModelObject.patient_history = data.patient_history;
    prescriptionModelObject.patient_id = data.patient_id;
    if (data.date === undefined) {
      prescriptionModelObject.date = data.date_of_prescription;
    } else {
      prescriptionModelObject.date = data.date;
    }
    if (data.doctor_id === undefined) {
      prescriptionModelObject.doctor_id = data.Reffered_Doctor;
    } else {
      prescriptionModelObject.doctor_id = data.doctor_id;
    }
    prescriptionModelObject.note = data.note;
    prescriptionModelObject.ID = data.ID;
    prescriptionModelObject.status = true;
    return prescriptionModelObject;
  }

  public IsReleaseToBed(data: any) {
    let OTMOdelObject = new OtCreate();
    OTMOdelObject.ID = data.operation_id;
    OTMOdelObject.admission_id = data.admission_id;
    OTMOdelObject.patient_id = data.patient_id;
    OTMOdelObject.operation_type_id = data.operation_type_id;
    OTMOdelObject.operation_datetime = this.datepipe.transform(data.operation_datetime, 'yyyy-MM-dd');
    OTMOdelObject.patient_operation_start = data.patient_operation_start;
    OTMOdelObject.patient_operation_end = data.patient_operation_end;
    OTMOdelObject.surgery_type_id = data.surgery_type_id;
    OTMOdelObject.doctor_id = data.doctor_id;
    OTMOdelObject.anesthesiologist_id = data.anesthesiologist_id;
    OTMOdelObject.purpose_of_surgery = data.purpose_of_surgery;
    OTMOdelObject.assisting_doctor_id = data.assisting_doctor_id;
    OTMOdelObject.special_instruction = data.special_instruction;
    if (data.Is_Released_to_Bed == false || data.Is_Released_to_Bed == null) {
      OTMOdelObject.Is_Released_to_Bed = true;
    } else {
      OTMOdelObject.Is_Released_to_Bed = false;
    }
    OTMOdelObject.status = true;
    return OTMOdelObject;
  }

  public updateBillingDistributionObject(data: any, patientId: string, patientAdmissionId: string, patientBillingId: string, model: BillingDistribution) {

    let distributionBill = model;
    for (let item of data) {
      if (item.labelName === "actual_cost_ward_medicine") {
        distributionBill.actual_cost_ward_medicine = item.value;
      }
      if (item.labelName === "anaesthetic_machine_gasses_charges") {
        distributionBill.anaesthetic_machine_gasses_charges = item.value
      }
      if (item.labelName === "anaesthetist_charges") {
        distributionBill.anaesthetist_charges = item.value;
      }
      if (item.labelName === "assistance_charges") {
        distributionBill.assistance_charges = item.value;
      }
      if (item.labelName === "bed_charges") {
        distributionBill.bed_charges = item.value;
      }
      if (item.labelName === "dressing_charges") {
        distributionBill.dressing_charges = item.value;
      }
      if (item.labelName === "doctor_visit_charges") {
        distributionBill.doctor_visit_charges = item.value;
      }
      if (item.labelName === "emergency_management_charges") {
        distributionBill.emergency_management_charges = item.value;
      }
      if (item.labelName === "extra_diet") {
        distributionBill.extra_diet = item.value;
      }
      if (item.labelName === "fluid_surgical_goods_cost") {
        distributionBill.fluid_surgical_goods_cost = item.value;
      }
      if (item.labelName === "investigation_charges") {
        distributionBill.investigation_charges = item.value;
      }
      if (item.labelName === "labour_room_charges") {
        distributionBill.labour_room_charges = item.value;
      }
      if (item.labelName === "medicine_cost_during_operation") {
        distributionBill.medicine_cost_during_operation = item.value;
      }
      if (item.labelName === "misscellaneous_charges") {
        distributionBill.misscellaneous_charges = item.value;
      }
      if (item.labelName === "nebulization_charges") {
        distributionBill.nebulization_charges = item.value;
      }
      if (item.labelName === "operation_theatre_charges") {
        distributionBill.operation_theatre_charges = item.value;
      }
      if (item.labelName === "oxygen_inhalation_charges") {
        distributionBill.oxygen_inhalation_charges = item.value;
      }
      if (item.labelName === "phototherapy_charges") {
        distributionBill.phototherapy_charges = item.value;
      }
      if (item.labelName === "pulse_oxymeter_charges") {
        distributionBill.pulse_oxymeter_charges = item.value;
      }
      if (item.labelName === "specialist_consultation_charges") {
        distributionBill.specialist_consultation_charges = item.value;
      }
      if (item.labelName === "special_nursing_charges") {
        distributionBill.special_nursing_charges = item.value;
      }
      if (item.labelName === "surgeon_charge") {
        distributionBill.surgeon_charge = item.value;
      }
      if (item.labelName === "warm_care_charges") {
        distributionBill.warm_care_charges = item.value;
      }
    }
    distributionBill.patient_billing_id = patientBillingId;
    distributionBill.patient_admission_id = patientAdmissionId;
    distributionBill.patient_id = patientId;
    return distributionBill;

  }

  public convertNumberToWords(amount: any) {

    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++ , j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + Number(n_array[j]);
            n_array[i] = 0;
          }
        }
      }
      var value;
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10;
        } else {
          value = n_array[i];
        }
        if (value != 0) {
          words_string += words[value] + " ";
        }
        if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Crores ";
        }
        if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    return words_string;
  }

  findAndReplace(string, target, replacement) {
    var i = 0, length = string.length;
    for (i; i < length; i++) {
      string = string.replace(target, replacement);
    }
    return string;
  }

  createPdfStructure(data: any, state: string) {
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);

    //set header of prescription
    var img = new Image;
    img.src = "app/images/left_logo.png";
    img.crossOrigin = "";

    doc.addImage(img.src, 'PNG', 50, 26, 60, 50);
    doc.addImage(img.src, 'PNG', 495, 26, 60, 50);

    doc.setFont("helvetica");
    doc.setFontType("bolduderline");
    doc.setTextColor(31, 132, 0);
    doc.setFontSize(35);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(196, 53, 404, 53);
    doc.text("JEEVANDEEP", 300, 50, 'center');

    doc.setFont("helvetica");
    doc.setFontType("italicunderline");
    doc.setTextColor(31, 132, 0);
    doc.setFontSize(20);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(115, 73, 490, 73);
    doc.text("SPECIAL CARE & DIAGNOSTIC CENTRE", 300, 70, 'center');

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(134, 0, 0);
    doc.setFontSize(10);
    doc.text("Bhakuri * P.O. Chakla * P.S.-Berhampore * Dist.- Murshidabad", 290, 90, 'center');

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(134, 0, 0);
    doc.setFontSize(12);
    doc.text("Phone: 03482-259055 ,9333311277, 9434229741", 290, 105, 'center');
    ///////////////////////////////////////body/////////////////////////////////////////////////////////////
    if (state === "PRESCRIPTION") {
      doc.setFont("helvetica");
      doc.setFontType("italic");
      doc.setTextColor(31, 132, 0);
      doc.setFontSize(12);
      doc.setLineWidth(1.5);
      doc.setDrawColor(31, 132, 0);
      doc.line(45, 210, 550, 210);
      doc.text("Registration id : " + data.patient_registration_no, 50, 130, 'left');
      doc.text("Name : " + data.patient_name, 50, 145, 'left');
      doc.text("Reffered Doctor : " + data.doctro_under_name, 50, 160, 'left');
      doc.text("Age : " + data.patient_age, 50, 175, 'left');
      //doc.text("Blood group : " + data.patient_blood_type, 50, 190, 'left');
      doc.text("Sex : " + data.patient_sex, 50, 190, 'left');
      doc.text("Date : " + data.date_of_prescription, 50, 205, 'left');

      //Body
      doc.setFont("helvetica");
      doc.setFontType("italic");
      doc.setTextColor(31, 132, 0);
      doc.setFontSize(12);
      doc.text("Doctor advice & medication : ", 50, 300, 'left');
      doc.text(data.note, 50, 315, 'left');
    }
    if (state === "ADMISSION") {
      doc.setFontType("normal");
      doc.setTextColor(0, 0, 0);
      doc.setTextColor(134, 0, 0);
      doc.text("Reg No :  ", 45, 150, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_registration_no, 100, 150, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Admission SEQ :  ", 350, 150, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.admission_sequence, 450, 150, 'left');
      doc.setFontSize(10);
      doc.setTextColor(134, 0, 0);
      doc.text("DATE :  ", 350, 170, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(this.datepipe.transform(new Date(), 'dd-MM-yyyy'), 450, 170, 'left');
      doc.setFontSize(12);

      //Patient Details
      doc.setTextColor(134, 0, 0);
      doc.text("Patient Details :", 45, 200, 'left');
      doc.line(45, 205, 550, 205);
      doc.setLineWidth(1.5);
      doc.setTextColor(134, 0, 0);
      doc.text("Patient's Name :", 45, 230, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_name, 150, 230, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Age :", 45, 250, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text('' + data.patient_age, 80, 250, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Sex :", 170, 250, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_sex, 210, 250, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Religion :", 295, 250, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_religion === undefined ? data.religion : data.patient_religion, 350, 250, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Bed No :", 45, 270, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.bed_no === undefined ? data.bed_number : data.bed_no, 100, 270, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Name Of (Father/Husband/Gurdian) :", 45, 290, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.name_of_gurdian, 280, 290, 'left');

      // Patients Address
      doc.setTextColor(134, 0, 0);
      doc.text("Patient Address :", 45, 320, 'left');
      doc.line(45, 325, 550, 325);
      doc.setLineWidth(1.5);
      doc.text("Address :", 45, 350, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_address, 150, 350, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Admitted By Whom :", 45, 370, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.name_of_gurdian, 200, 370, 'left');

      //Relative Address
      doc.setTextColor(134, 0, 0);
      doc.text("Patient's Relative's Address :", 45, 450, 'left');
      doc.line(45, 455, 550, 455);
      doc.setLineWidth(1.5);
      doc.text("Address :", 45, 480, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_address, 150, 480, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Telephone/Contact No :", 45, 500, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text('' + data.gurdian_ph_number, 200, 500, 'left')
      doc.setTextColor(134, 0, 0);
      doc.text("Date Of Admission :", 45, 520, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.admitted_on, 200, 520, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Under Doctor :", 45, 540, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.doctor_name, 150, 540, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text("I do here by give my Consent for treatment anaesthesia and operation of the patient named above", 45, 570, 'left');
      doc.text("knowing all ins and outsof the Nursing Home. I agree to pay all the charges of the Nursing Home  ", 45, 585, 'left');
      doc.text("when advised and guided bt the rules and regulations of the Nursing Home.The patient vcan be ", 45, 600, 'left');
      doc.text("reffer to some other Institution for better management, as the patient might require some ", 45, 615, 'left');
      doc.text("specific treatment which we may not have required Amenities ", 45, 630, 'left');
    }



    // signature
    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(31, 132, 0);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(40, 700, 180, 700);
    doc.text("Concerned Signature", 50, 715, 'left');

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(31, 132, 0);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(400, 700, 530, 700);
    doc.text("Patient Signature", 500, 715, 'right');
    ///////////////////////////////////////////////////////////////////end body////////////////////////////////////////////////////
    //footer
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(40, 780, 550, 780);

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(134, 0, 0);
    doc.setFontSize(10);
    doc.text("Jeevandeep Nursing Home * Phone: 03482-259055 ,9333311277, 9434229741", 290, 795, 'center');


    doc.save(data.patient_name + '.pdf');
  }

}
