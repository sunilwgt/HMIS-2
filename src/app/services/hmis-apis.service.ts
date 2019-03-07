import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Registration } from '../models/registration';
import { LoaderService } from './loader.service';
import { UserDetail } from '../models/userole';
import { Department, DepartmentType } from '../models/department';
import { RESULT_TYPE_GET_PATIENTS, RESULT_TYPE_SET_PATIENT, RESULT_TYPE_GET_PATIENT, RESULT_TYPE_EDIT_PATIENT, RESULT_TYPE_USER_ROLE, RESULT_TYPE_GET_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT_TYPE, RESULT_TYPE_SET_DEPARTMENT, RESULT_TYPE_EDIT_DEPARTMENT, RESULT_TYPE_SET_DEPARTMENT_TYPE, RESULT_TYPE_EDIT_DEPARTMENT_TYPE, RESULT_TYPE_GET_DEPARTMENT_AS_PER_TYPE, RESULT_TYPE_SET_DOCTOR, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_SET_DISEASE_TYPE, RESULT_TYPE_GET_DISEASE_TYPE, RESULT_TYPE_SET_BUILDING, RESULT_TYPE_GET_BUILDING, RESULT_TYPE_SET_FLOOR, RESULT_TYPE_GET_FLOOR, RESULT_TYPE_SET_WARD, RESULT_TYPE_GET_WARD, RESULT_TYPE_SET_SURGERY, RESULT_TYPE_GET_SURGERY, RESULT_TYPE_SET_ADMISSION_TYPE, RESULT_TYPE_GET_ADMISSION_TYPE, RESULT_TYPE_SET_DISCHARGE_TYPE, RESULT_TYPE_GET_DISCHARGE_TYPE, RESULT_TYPE_SET_DELIVERY_TYPE, RESULT_TYPE_GET_DELIVERY_TYPE, RESULT_TYPE_SET_OPERATION_TYPE, RESULT_TYPE_GET_OPERATION_TYPE, RESULT_TYPE_SET_PREGNANT_TREATMENT, RESULT_TYPE_GET_PREGNANT_TREATMENT, RESULT_TYPE_GET_STATE_LIST, RESULT_TYPE_GET_PATIENT_SEARCH, RESULT_TYPE_EDIT_DISEASE_TYPE, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, RESULT_TYPE_GET_PATIENT_SEARCH_BY_ID, RESULT_TYPE_SET_OT, RESULT_TYPE_GET_OT, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_SET_HOSPITAL_DETAIL, RESULT_TYPE_EDIT_HOSPITAL_DETAIL, RESULT_ERROR, RESULT_TYPE_SET_PRESCRIPTION, RESULT_TYPE_GET_PRESCRIPTION, RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT, RESULT_TYPE_SET_PRESCRIPTION_AS_PER_ID, RESULT_TYPE_DELETE_PATIENT, RESULT_TYPE_DELETE_PRESCRIPTION, RESULT_TYPE_GET_PACKAGE, RESULT_TYPE_UPDATE_PATIENT_EXT, RESULT_TYPE_GET_WARD_TYPE, RESULT_TYPE_GET_WARD_BY_FLOOR, RESULT_TYPE_GET_BED_BY_WARD, RESULT_TYPE_ADD_ADMISSION, RESULT_TYPE_DELETE_HOSPITAL_DETAIL, RESULT_TYPE_GET_DEPARTMENT_TYPE_LIST, RESULT_TYPE_DELETE_DEPARTMENT_TYPE, RESULT_TYPE_DELETE_DISEASE_TYPE, RESULT_TYPE_GET_DEPARTMENT_LIST, RESULT_TYPE_DELETE_DEPARTMENT, RESULT_TYPE_GET_DOCTOR_LIST, RESULT_TYPE_GET_BUILDING_LIST, RESULT_TYPE_EDIT_BUILDING_LIST, RESULT_TYPE_DELETE_BUILDING_LIST, RESULT_TYPE_EDIT_DOCTOR, RESULT_TYPE_DELETE_DOCTOR, RESULT_TYPE_GET_FLOOR_LIST, RESULT_TYPE_EDIT_FLOOR, RESULT_TYPE_DELETE_FLOOR, RESULT_TYPE_GET_WARD_TYPE_LIST, RESULT_TYPE_SET_WARD_TYPE, RESULT_TYPE_EDIT_WARD_TYPE, RESULT_TYPE_DELETE_WARD_TYPE, RESULT_TYPE_GET_WARD_LIST, RESULT_TYPE_EDIT_WARD, RESULT_TYPE_DELETE_WARD, RESULT_TYPE_GET_SURGERY_LIST, RESULT_TYPE_EDIT_SURGERY, RESULT_TYPE_DELETE_SURGERY, RESULT_TYPE_GET_ADMISSION_LIST, RESULT_TYPE_EDIT_ADMISSION_TYPE, RESULT_TYPE_DELETE_ADMISSION_TYPE, RESULT_TYPE_GET_DISCHARGE_TYPE_LIST, RESULT_TYPE_EDIT_DISCHARGE_TYPE, RESULT_TYPE_DELETE_DISCHARGE_TYPE, RESULT_TYPE_EDIT_DELIVERY_TYPE, RESULT_TYPE_DELETE_DELIVERY_TYPE, RESULT_TYPE_GET_DELIVERY_TYPE_LIST, RESULT_TYPE_GET_OPERATION_TYPE_LIST, RESULT_TYPE_DELETE_OPERATION_TYPE, RESULT_TYPE_EDIT_OPERATION_TYPE, RESULT_TYPE_GET_PREGNANT_TREATMENT_LIST, RESULT_TYPE_SET_VACCINE_TYPE, RESULT_TYPE_EDIT_VACCINE_TYPE, RESULT_TYPE_DELETE_VACCINE_TYPE, RESULT_TYPE_GET_VACCINE_TYPE_LIST, RESULT_TYPE_GET_PACKAGE_LIST, RESULT_TYPE_SET_PACKAGE, RESULT_TYPE_EDIT_PACKAGE, RESULT_TYPE_DELETE_PACKAGE, RESULT_TYPE_GET_BED_LIST, RESULT_TYPE_EDIT_PREGNANT_TREATMENT, RESULT_TYPE_DELETE_PREGNANT_TREATMENT, RESULT_TYPE_SET_BED, RESULT_TYPE_EDIT_BED, RESULT_TYPE_DELETE_BED, RESULT_TYPE_AUTO_COMPLETE_DOCTOR_SEARCH, RESULT_TYPE_GET_ADMISSION_TYPE_BY_ID, RESULT_TYPE_EDIT_ADMISSION, RESULT_TYPE_DELETE_ADMISSION, RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID, RESULT_TYPE_GET_NEW_BORN_LIST, RESULT_TYPE_GET_BILLING_LIST, RESULT_TYPE_SET_PRICE, RESULT_TYPE_GET_PRICE_LIST, RESULT_TYPE_EDIT_PRICE, RESULT_TYPE_DELETE_PRICE, RESULT_TYPE_GET_PACKAGE_SEARCH, RESULT_TYPE_GET_FORGOT_PASSWORD, RESULT_TYPE_SET_ADVANCE_BILLING, RESULT_TYPE_SET_BILLING, RESULT_TYPE_GET_ADVANCE_BILLING, RESULT_TYPE_EDIT_BILLING, RESULT_TYPE_GET_ALL_DOCTOR_LIST, RESULT_TYPE_GET_ALL_ADMISSION_LIST, RESULT_TYPE_GET_ALL_DISCHARGE_TYPE_LIST, RESULT_TYPE_GET_OPERATION_THEATRE_LIST, RESULT_TYPE_SET_OPERATION_THEATRE, RESULT_TYPE_GET_BUILDING_DROPDOWN, RESULT_TYPE_GET_FLOOR_DROPDOWN, RESULT_TYPE_GET_OPERATION_TYPE_DROPDOWN, RESULT_TYPE_GET_SURGERY_DROPDOWN, RESULT_TYPE_GET_DEPARTMENT_TYPE_DROPDOWN, RESULT_TYPE_GET_REGISTERED_PATIENT_LIST, RESULT_TYPE_GET_WARD_DROPDOWN, RESULT_TYPE_GET_OPERATION_THEATRE_SEARCH, RESULT_TYPE_SET_NEW_BORN, RESULT_TYPE_EDIT_NEW_BORN, RESULT_TYPE_DELETE_NEW_BORN, RESULT_TYPE_GET_DELIVERY_TYPE_DROPDOWN, RESULT_TYPE_GET_OPERATION_THEATRE_BY_ADMISSION_SEQ, RESULT_TYPE_GET_PATIENT_DETAILS_FOR_OT, RESULT_TYPE_GET_REGISTERED_REG_NO, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID, RESULT_TYPE_UPDATE_ADMISSION_DISCHARGE_DETAIL, RESULT_TYPE_SET_EXTERNAL_BILLING, RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION, RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION_BY_ID, RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST, RESULT_TYPE_GET_DISCHARGED_PATIENT_DETAILS, RESULT_TYPE_EDIT_OPERATION_THEATRE, RESULT_TYPE_DELETE_OPERATION_THEATRE, RESULT_TYPE_GET_EXTERNAL_BILLING, RESULT_TYPE_EDIT_EXTERNAL_BILLING, RESULT_TYPE_GET_DISCHARGE_CERTIFICATE_LIST, RESULT_TYPE_SET_DISCHARGE_CERTIFICATE, RESULT_TYPE_EDIT_DISCHARGE_CERTIFICATE, RESULT_TYPE_GET_SELECTED_DISCHARGE_CERTIFICATE, RESULT_TYPE_GET_DISCHARGED_IPD_LIST, RESULT_TYPE_GET_DISCHARGED_IPD_PATIENT_DETAILS, RESULT_TYPE_RELEASED_TO_BED, RESULT_TYPE_GET_APPROVER_LIST, RESULT_TYPE_GET_APPROVAl_LIST, RESULT_TYPE_GET_ACTION_FOR_APPROVER, RESULT_TYPE_SET_APPROVAL, RESULT_TYPE_DELETEAPPROVAL_LIST, RESULT_TYPE_UPDATEAPPROVAL_LIST, RESULT_TYPE_GET_APPROVER_SELECT, RESULT_TYPE_SET_APPROVER, RESULT_TYPE_GET_ALL_USERS, RESULT_TYPE_DELETE_APPROVER_LIST, RESULT_TYPE_SET_APPROVER_AS_ID, RESULT_TYPE_GET_PATIENT_APPROVAL_STATUS, RESULT_TYPE_SET_PATIENTAPPROVAL, RESULT_TYPE_VALIDATE_BILLING_ADJUSTMENT, RESULT_TYPE_GET_APPROVER_DASHBOARD_LIST, RESULT_TYPE_GET_APPROVER_DASHBOARD_LISTT, RESULT_TYPE_DELETE_APPROVAL_DASHBOARD_LIST, RESULT_TYPE_GET_BILLING_LIST_FOR_DISCHARGE, RESULT_TYPE_GET_APPROVED_DASHBOARD_LIST, RESULT_TYPE_GET_PENDING_DASHBOARD_LIST } from '../models/common';
import { Disease, Doctor, Building, Floor, Ward, Surgery, AdmissionType, DischargeType, DeliveryType, OperationType, PregnantTreatment, WardType, VaccineType, Packages, Bed, Price, Billing, NewBorn, DischargeModal, BillingDistribution, DischargeCertificate, PatientApproval } from '../models/opd';
import { HospitalSettings } from '../models/hospitalSettings';
import { HospitaDetail } from '../models/hospitadetail';
import { Prescription, OtCreate } from '../models/patient';
import { AdmissionModel, AdmissionMainModel, advanceBillingModel } from '../models/admission';
import { ForgotPassword } from '../models/user';

// const PATIENT_URL: string = "https://webapihmis.azurewebsites.net/api/Patient";
// const HMIS_URL: string = "https://webapihmis.azurewebsites.net/api/";
// const ALTERNATE_URL: string = "https://webapihmis.azurewebsites.net/";

const PATIENT_URL: string = "https://webapimultitenanthmis.azurewebsites.net/api/Patient";
const HMIS_URL: string = "https://webapimultitenanthmis.azurewebsites.net/api/";
const ALTERNATE_URL: string = "https://webapimultitenanthmis.azurewebsites.net/";
// https://webapimultitenanthmis.azurewebsites.net/api/GetUserNameValue
const REQUEST_GET: string = "GET";
const REQUEST_POST: string = "POST";
const REQUEST_PUT: string = "PUT";
const REQUEST_DELETE: string = "DELETE";
const REQUEST_DELETE_WITH_BODY: string = "DELETEWITHBODY";


@Injectable()
export class HmisApisService {


  private _result: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _hmistoken: string;
  private _userDetail: UserDetail;

  constructor(private hmisHttp: HttpClient, private loader: LoaderService) { }

  public getPatientList() {
    let urlstr: string = `${PATIENT_URL}/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PATIENTS);
  }

  public setPatient(registrationObj: Registration) {
    this.genericApiCall(PATIENT_URL, RESULT_TYPE_SET_PATIENT, registrationObj, REQUEST_POST);
  }

  public setPatientAsPerId(pid: string, registrationObj: Registration) {
    //  let urlstr:string = `${PATIENT_URL}?id=${pid}`;
    this.genericApiCall(PATIENT_URL, RESULT_TYPE_EDIT_PATIENT, registrationObj, REQUEST_PUT);
  }

  public getPatientAsPerId(pid: string) {
    let urlstr: string = `${PATIENT_URL}/Get?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PATIENT_AS_PER_ID, REQUEST_GET);
  }

  public deletePatientAsPerId(deletedById: string) {
    let urlstr: string = `${PATIENT_URL}?patientId=${deletedById}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_PATIENT, "", REQUEST_DELETE);
  }

  public patientSearchByID(searchKey: string): void {
    let urlstr: string = `${PATIENT_URL}/GetPagedPatientData${this.createSearchStructure(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PATIENT_SEARCH_BY_ID);
  }

  public updatePatientExtData(pid: string, registrationObj: Registration) {
    let urlstr: string = `${ALTERNATE_URL}Update/patientid?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_UPDATE_PATIENT_EXT, registrationObj, REQUEST_PUT);
  }
  //Admitted patient
  public setAdmission(admissionObj: AdmissionMainModel) {
    let urlstr: string = `${HMIS_URL}PatientAdmission`;
    this.genericApiCall(urlstr, RESULT_TYPE_ADD_ADMISSION, admissionObj, REQUEST_POST);
  }

  public setAdmittedPatientAsPerID(pid: string, admissionModelObj: AdmissionMainModel) {
    let urlstr: string = `${HMIS_URL}PatientAdmission/UpdateAdmission?patientAdmissionid=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_ADMISSION, admissionModelObj, REQUEST_PUT);
  }
  //Update discharge data in admission table
  public updateDischargeDataInAdmissionDetail(dischargeDetailObj: DischargeModal) {
    let urlstr: string = `${HMIS_URL}PatientAdmission/UpdatePatientDischargeDetails`;
    this.genericApiCall(urlstr, RESULT_TYPE_UPDATE_ADMISSION_DISCHARGE_DETAIL, dischargeDetailObj, REQUEST_PUT);
  }

  public getAmittedPatientList() {
    let urlstr: string = `${HMIS_URL}PatientAdmission`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST);
  }

  public getAdmittedPatientAsPerId(pid: string) {
    let urlstr: string = `${HMIS_URL}/Get?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID, REQUEST_GET);
  }

  public getAdmittedPatientList(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientAdmission/GetPagedPatientAdmissionData${this.createSearchStructureForAdmiitedPatient(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForAdmiitedPatient(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 100, sortingOrder = "LastName_DSC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }
  
//webapimultitenanthmis.azurewebsites.net/api/PatientApproval/GetApproverDashBoardWorkflowItems?assignedTo=7B15B4D8-6956-4151-AB4F-7FD915910044&pageNumber=0&_pageSize=1&pageSize=50&sortingOrder=FatherName_ASC&querySearch=


  public getApproverDashboardList( searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientApproval/GetApproverDashBoardWorkflowItems?assignedTo=${this._userDetail.uid}`; //&${this.createSearchStructureForgetApproverDashboardList(searchKey)}
    this.genericApiCall(urlstr, RESULT_TYPE_GET_APPROVER_DASHBOARD_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForgetApproverDashboardList(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 30, sortingOrder = "FatherName_ASC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public getPendingDashboardList( searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientApproval/GetApproverDashBoardPendingWorkflowItems?assignedTo=${this._userDetail.uid}`; //&${this.ccc(searchKey)}
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PENDING_DASHBOARD_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForgetPendingDashboardList(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 30, sortingOrder = "FatherName_ASC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }


  public getApprovedDashboardList( searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientApproval/GetApproverDashBoardWorkflowItems?assignedTo=${this._userDetail.uid}`; //&${this.createSearchStructureForgetApprovedDashboardList(searchKey)}
    this.genericApiCall(urlstr, RESULT_TYPE_GET_APPROVED_DASHBOARD_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForgetApprovedDashboardList(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 30, sortingOrder = "FatherName_ASC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }
  public deleteApproverDashboardList(approvalId: string) {
    const deleteid = {ID:approvalId}
    console.log('approvalId del ' , approvalId);
    console.log('Delete iD' ,deleteid);

    let urlstr: string = `${HMIS_URL}ApprovalStatus?admissionId=${approvalId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_APPROVAL_DASHBOARD_LIST, deleteid, REQUEST_DELETE);
  }

  
  public getApproverDashboardListt( searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientApproval/GetApproverDashBoardWorkflowItems?assignedTo=${this._userDetail.uid}`; //&${this.createSearchStructureForgetApproverDashboardList(searchKey)}
    this.genericApiCall(urlstr, RESULT_TYPE_GET_APPROVER_DASHBOARD_LISTT, null, REQUEST_GET, loader);
  }

  private createSearchStructureForgetApproverDashboardListt(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 30, sortingOrder = "FatherName_ASC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public getRegisteredPatientList(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Patient/GetPagedPatientData${this.createSearchStructureForRegisteredPatient(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_REGISTERED_PATIENT_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForRegisteredPatient(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 30, sortingOrder = "RegnNumber_DSC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public deleteAdmittedPatient(deletedById: string) {
    let urlstr: string = `${HMIS_URL}PatientAdmission?patientAdmissionId=${deletedById}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_ADMISSION, "", REQUEST_DELETE);
  }

  public getRegisteredRegNumber(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Patient/GetAutocompletePatientRegn?searchNumber=${searchKey}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_REGISTERED_REG_NO, null, REQUEST_GET, loader);
  }

  public getRegisteredPatientById(patientId: string) {
    let urlstr: string = `${HMIS_URL}Patient/patientById?id=${patientId}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID, REQUEST_GET);
  }

  // private createSearchStructureForRegisteredPatient(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 30, sortingOrder = "RegnNumber_DSC", rangeSearch = ""): string {
  //   return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  // }

  //Department type
  public getDetpartmentType() {
    let urlstr: string = `${HMIS_URL}Departmenttype/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DEPARTMENT_TYPE);
  }

  public getDetpartmentTypeList(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}DepartmentType/GetPagedDepartmentTypeData${this.createSearchStructureForDepartmentType(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DEPARTMENT_TYPE_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForDepartmentType(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 15, sortingOrder = "DepartmentTypeName_DSC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setDepartmentType(departmentTypeObj: DepartmentType) {
    let urlstr: string = `${HMIS_URL}Departmenttype`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_DEPARTMENT_TYPE, departmentTypeObj, REQUEST_POST);
  }

  public getDepartmentTypeDropdown() {
    let urlstr: string = `${HMIS_URL}DepartmentType/GetActiveNameValuePairDepartmentType`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DEPARTMENT_TYPE_DROPDOWN);
  }

  public setDepartmentTypeAsPerId(pid: string, departmentTypeObj: DepartmentType) {
    let urlstr: string = `${HMIS_URL}Departmenttype?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_DEPARTMENT_TYPE, departmentTypeObj, REQUEST_PUT);
  }

  public deleteDepartmentType(departmentTypeId: string) {
    let urlstr: string = `${HMIS_URL}DepartmentType?departmenTypetId=${departmentTypeId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_DEPARTMENT_TYPE, "", REQUEST_DELETE);
  }

  //Department
  public setDepartment(departmentObj: Department) {
    let urlstr: string = `${HMIS_URL}Department`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_DEPARTMENT_TYPE, departmentObj, REQUEST_POST);
  }

  public getDetpartment() {
    let urlstr: string = `${HMIS_URL}Department/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DEPARTMENT);
  }

  public setDepartmentAsPerId(pid: string, departmentObj: Department) {
    let urlstr: string = `${HMIS_URL}Department?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_DEPARTMENT, departmentObj, REQUEST_PUT);
  }

  public getDepartmentAsPerType(pid: string) {
    let urlstr: string = `${HMIS_URL}Department/GetDepartmentByTypeId?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DEPARTMENT_AS_PER_TYPE, REQUEST_GET);
  }

  public getDetpartmentList(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Department/GetPagedDepartmentData${this.createSearchStructureForDepartment(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DEPARTMENT_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForDepartment(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 15, sortingOrder = "DepartmentName_DSC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public deleteDepartment(departmentId: string) {
    let urlstr: string = `${HMIS_URL}Department?departmentId=${departmentId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_DEPARTMENT, "", REQUEST_DELETE);
  }
  //User Role
  public getUserRole(userdetail: UserDetail) {
    let urlstr: string = `${HMIS_URL}${userdetail.username}?id=${userdetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_USER_ROLE);
  }
  //Doctor
  public setDoctor(doctorObj: Doctor) {
    let urlstr: string = `${HMIS_URL}Doctor`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_DOCTOR, doctorObj, REQUEST_POST);
  }

  public getDoctor() {
    let urlstr: string = `${HMIS_URL}Doctor/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DOCTOR);
  }

  public setDoctorAsPerId(pid: string, doctorObj: Doctor) {
    let urlstr: string = `${HMIS_URL}Doctor?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_DOCTOR, doctorObj, REQUEST_PUT);
  }

  public deleteDoctor(doctorId: string) {
    let urlstr: string = `${HMIS_URL}Doctor?doctortId=${doctorId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_DOCTOR, "", REQUEST_DELETE);
  }

  public getDoctorAsPerId(pid: string) {
    let urlstr: string = `${HMIS_URL}Doctor?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, REQUEST_GET);
  }

  public getDoctorListSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Doctor/GetPagedDoctorData${this.createSearchStructureForDoctor(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DOCTOR_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForDoctor(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 15, sortingOrder = "DeceaseTypeName_DSC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }


  public autoSearchDoctor(searchstr: string) {
    let urlstr: string = `${HMIS_URL}Doctor/GetAutoCompleteDoctorList?searchText=${searchstr}`;
    this.genericApiCall(urlstr, RESULT_TYPE_AUTO_COMPLETE_DOCTOR_SEARCH, REQUEST_GET);
  }

  public getDoctorList() {
    let urlstr: string = `${HMIS_URL}Doctor/GetActiveNameValuePairDoctor`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ALL_DOCTOR_LIST, null, REQUEST_GET);
  }
  // Disease
  public setDiseaseType(diseaseObj: Disease) {
    let urlstr: string = `${HMIS_URL}Deceasetype`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_DISEASE_TYPE, diseaseObj, REQUEST_POST);
  }

  public setDiseaseTypeAsPerId(pid: string, diseaseObj: Disease) {
    let urlstr: string = `${HMIS_URL}DeceaseType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_DISEASE_TYPE, diseaseObj, REQUEST_PUT);
  }

  // public getDiseaseType() {
  //   let urlstr: string = `${HMIS_URL}Deceasetype/Get`;
  //   this.genericApiCall(urlstr, RESULT_TYPE_GET_DISEASE_TYPE);
  // }
  public getDiseaseTypeSerach(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}DeceaseType/GetPagedDeceaseTypeData${this.createSearchStructureForDisease(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DISEASE_TYPE, null, REQUEST_GET, loader);
  }

  private createSearchStructureForDisease(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 60, sortingOrder = "DeceaseTypeName_DSC", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public deleteDeceaseTypeAsPerId(deceasetypeId: string) {
    let urlstr: string = `${HMIS_URL}DeceaseType?deceasetypeId=${deceasetypeId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_DISEASE_TYPE, "", REQUEST_DELETE);
  }

  //Building
  public setBuilding(buildingObj: Building) {
    let urlstr: string = `${HMIS_URL}Building`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_BUILDING, buildingObj, REQUEST_POST);
  }

  public getBuilding() {
    let urlstr: string = `${HMIS_URL}Building/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_BUILDING);
  }

  public getBuildingSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Building/GetPagedBuildingData${this.createSearchStructureForBuilding(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_BUILDING_LIST, null, REQUEST_GET, loader);
  }

 //ApprovalStatus/GetPagedApprovalStatusData?&pageNumber=0&_pageSize=1&pageSize=50&sortingOrder=ApprovalStatusName_ASC&querySearch=
  // public getapproverSearch(searchKey: string, loader: boolean = true): void {
  //   let urlstr: string = `${HMIS_URL}ApproverList/GetActiveNameValuePairApproverList`;
  //   this.genericApiCall(urlstr, RESULT_TYPE_GET_APPROVER_LIST, null, REQUEST_GET, loader);
  // }
  public getapproverSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}ApproverList/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_APPROVER_LIST, null, REQUEST_GET, loader);
  }
  public getapproverSelect(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}ApproverList/GetUserNameValue`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_APPROVER_SELECT, null, REQUEST_GET, loader);
  }
  
  public createapprover(approverObj: Floor) {
    let urlstr: string = `${HMIS_URL}ApproverList`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_APPROVER, approverObj, REQUEST_POST);
  }

  // public setApproverAsPerId(approverObj) {
  //   let urlstr: string = `${HMIS_URL}ApproverList`;
  //   this.genericApiCall(urlstr, RESULT_TYPE_SET_APPROVER_AS_ID, approverObj, REQUEST_PUT);
  // }


  public setApproverAsPerId(approverObj) {
    let urlstr: string = `${HMIS_URL}ApproverList`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_APPROVER_AS_ID, approverObj, REQUEST_PUT);
  }
  public deleteApproverAsPerId(approverId: string) {
    console.log('delete approver id' , approverId)
    console.log('deletedby ' , this._userDetail.uid)

    const deleteid = {ID:approverId}
    let urlstr: string = `${HMIS_URL}ApproverList?approverListId=${approverId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_APPROVER_LIST, deleteid, REQUEST_DELETE);
  }

  private createSearchStructureForBuilding(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "BuildingName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setBuildingAsPerId(pid: string, buildingObj: Building) {
    let urlstr: string = `${HMIS_URL}Building?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_BUILDING_LIST, buildingObj, REQUEST_PUT);
  }

  public deleteBuildingAsPerId(buildingId: string) {
    let urlstr: string = `${HMIS_URL}Building?buildingId=${buildingId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_BUILDING_LIST, "", REQUEST_DELETE);
  }

  public getBuildingDropdown() {
    let urlstr: string = `${HMIS_URL}Building/GetActiveNameValuePairBuilding`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_BUILDING_DROPDOWN);
  }

  //Floor
  public setFloor(floorObj: Floor) {
    let urlstr: string = `${HMIS_URL}Floor`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_FLOOR, floorObj, REQUEST_POST);
  }

  public getFloor() {
    let urlstr: string = `${HMIS_URL}Floor/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_FLOOR);
  }

  public getFloorSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Floor/GetPagedFloorData${this.createSearchStructureForFloor(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_FLOOR_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForFloor(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "FloorName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setFloorAsPerId(pid: string, floorObj: Floor) {
    let urlstr: string = `${HMIS_URL}Floor?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_FLOOR, floorObj, REQUEST_PUT);
  }

  public deleteFloor(floorId: string) {
    let urlstr: string = `${HMIS_URL}Floor?floorId=${floorId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_FLOOR, "", REQUEST_DELETE);
  }

  public getFloorDropdown(buildingId: string) {
    let urlstr: string = `${HMIS_URL}Floor/GetActiveNameValuePairFloor?buildingID=${buildingId}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_FLOOR_DROPDOWN);
  }
  //Wardtype
  public getWardType() {
    let urlstr: string = `${HMIS_URL}Wardtype/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_WARD_TYPE);
  }
  public setWardType(wardTypeObj: WardType) {
    let urlstr: string = `${HMIS_URL}WardType`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_WARD_TYPE, wardTypeObj, REQUEST_POST);
  }

  public setWardTypeAsPerId(pid: string, wardTypeObj: WardType) {
    let urlstr: string = `${HMIS_URL}WardType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_WARD_TYPE, wardTypeObj, REQUEST_PUT);
  }

  public getWardTypeSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}WardType/GetPagedWardTypeData${this.createSearchStructureForWardType(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_WARD_TYPE_LIST, null, REQUEST_GET, loader);
  }
  private createSearchStructureForWardType(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "WardTypeName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public deleteWardType(wardTypeId: string) {
    let urlstr: string = `${HMIS_URL}WardType?wardtypeId=${wardTypeId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_WARD_TYPE, "", REQUEST_DELETE);
  }
  //Ward
  public setWard(wardObj: Ward) {
    let urlstr: string = `${HMIS_URL}Ward`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_WARD, wardObj, REQUEST_POST);
  }

  public getWard() {
    let urlstr: string = `${HMIS_URL}Ward/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_WARD);
  }

  public getWardByFloor(floorId: string) {
    let urlstr: string = `${HMIS_URL}Ward/GetWardByFloorId?id=${floorId}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_WARD_BY_FLOOR);
  }

  public getWardSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Ward/GetPagedWardData${this.createSearchStructureForWard(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_WARD_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForWard(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 500, sortingOrder = "WardName_DSC", rangeSearch = 5): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setWardAsPerId(pid: string, wardObj: Ward) {
    let urlstr: string = `${HMIS_URL}Ward?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_WARD, wardObj, REQUEST_PUT);
  }

  public deleteWard(wardId: string) {
    let urlstr: string = `${HMIS_URL}Ward?wardId=${wardId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_WARD, "", REQUEST_DELETE);
  }

  public getWardDropdown(floorId: string) {
    let urlstr: string = `${HMIS_URL}Ward/GetWardNameValuePairWard?floorid=${floorId}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_WARD_DROPDOWN);
  }
  //Bed
  public getBedByWard(wardId: string) {
    //let urlstr: string = `${HMIS_URL}bed/GetAllAvailableActiveBed?wardId=${wardId}`;
    let urlstr: string = `${HMIS_URL}Bed/GetBedByWardId/${wardId}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_BED_BY_WARD);
  }

  public getPackage() {
    let urlstr: string = `${HMIS_URL}Package/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PACKAGE);
  }
  //Surgery type
  public setSurgeryType(surgeryObj: Surgery) {
    let urlstr: string = `${HMIS_URL}SurgeryType`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_SURGERY, surgeryObj, REQUEST_POST);
  }

  public getSurgeryType() {
    let urlstr: string = `${HMIS_URL}SurgeryType/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_SURGERY);
  }

  public getSurgeryTypeSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}SurgeryType/GetPagedSurgeryTypeData${this.createSearchStructureForSurgery(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_SURGERY_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForSurgery(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "SurgeryTypeName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setSurgeryTypeAsPerId(pid: string, surgeryObj: Surgery) {
    let urlstr: string = `${HMIS_URL}SurgeryType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_SURGERY, surgeryObj, REQUEST_PUT);
  }

  public deleteSurgeryType(wardId: string) {
    let urlstr: string = `${HMIS_URL}SurgeryType?surgeryTypeId=${wardId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_SURGERY, "", REQUEST_DELETE);
  }

  public getSurgeryDropdown() {
    let urlstr: string = `${HMIS_URL}SurgeryType/GetActiveNameValuePairSurgeryType`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_SURGERY_DROPDOWN);
  }
  //Admission type
  public setAdmissionType(admissionObj: AdmissionType) {
    let urlstr: string = `${HMIS_URL}AdmissionType`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_ADMISSION_TYPE, admissionObj, REQUEST_POST);
  }

  public getAdmissionType() {
    let urlstr: string = `${HMIS_URL}AdmissionType/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ADMISSION_TYPE);
  }

  public getAdmissionTypeList() {
    let urlstr: string = `${HMIS_URL}AdmissionType/GetActiveNameValuePairAdmissionType`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ALL_ADMISSION_LIST);
  }

  public getAdmissionTypeSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}AdmissionType/GetPagedAdmissionTypeData${this.createSearchStructureForAdmission(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ADMISSION_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForAdmission(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "AdmissionTypeName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public getAdmissionTypeById(pid: string) {
    let urlstr: string = `${HMIS_URL}AdmissionType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ADMISSION_TYPE_BY_ID, REQUEST_GET);
  }

  public setAdmissionTypeAsPerId(pid: string, admissionObj: AdmissionType) {
    let urlstr: string = `${HMIS_URL}AdmissionType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_ADMISSION_TYPE, admissionObj, REQUEST_PUT);
  }

  public deleteAdmissionType(admissionTypeId: string) {
    let urlstr: string = `${HMIS_URL}AdmissionType?admissionId=${admissionTypeId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_ADMISSION_TYPE, "", REQUEST_DELETE);
  }

  //Discharge type
  public setDischargeType(dischargeObj: DischargeType) {
    let urlstr: string = `${HMIS_URL}DischargeType`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_DISCHARGE_TYPE, dischargeObj, REQUEST_POST);
  }

  public getDischargeType() {
    let urlstr: string = `${HMIS_URL}DischargeType`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DISCHARGE_TYPE);
  }

  public getDischargeTypeSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}DischargeType/GetPagedDischargeTypeData${this.createSearchStructureForDischarge(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DISCHARGE_TYPE_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForDischarge(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "DischargeTypeName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setDischargeTypeAsPerId(pid: string, dischargeObj: DischargeType) {
    let urlstr: string = `${HMIS_URL}DischargeType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_DISCHARGE_TYPE, dischargeObj, REQUEST_PUT);
  }

  public deleteDischargeType(dischargeTypeId: string) {
    let urlstr: string = `${HMIS_URL}DischargeType?dischargeId=${dischargeTypeId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_DISCHARGE_TYPE, "", REQUEST_DELETE);
  }

  public getDischargeTypeList() {
    let urlstr: string = `${HMIS_URL}DischargeType/GetActiveNameValuePairDischarge`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ALL_DISCHARGE_TYPE_LIST);
  }
  //Discharge Certificate  
  public getDischargeCertificateList(searchKey: string, loader: boolean = true) {
    let urlstr: string = `${HMIS_URL}PatientDischarge/GetPagedDischargeData${this.createSearchStructureForDischargeCertificate(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DISCHARGE_CERTIFICATE_LIST, null, REQUEST_GET, loader);
  }
  private createSearchStructureForDischargeCertificate(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 30, sortingOrder = "LastName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }
  public setDischargeCertficate(dischargeCertificateObj: DischargeCertificate) {
    let urlstr: string = `${HMIS_URL}PatientDischarge`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_DISCHARGE_CERTIFICATE, dischargeCertificateObj, REQUEST_POST);
  }
  public ValidateBillingAdjustemnt(pid:string,aid:string,bid:any) {
    let urlstr: string = `${HMIS_URL}PatientApproval/ValidateBillingAdjustemnt?patientID=${pid}&admissionID=${aid}&billingID=${bid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_VALIDATE_BILLING_ADJUSTMENT, '', REQUEST_GET);
  }

  public setDischargeCertficateAsPerId(dscID: string, dischargeCertificateObj: DischargeCertificate) {
    let urlstr: string = `${HMIS_URL}PatientDischarge?id=${dscID}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_DISCHARGE_CERTIFICATE, dischargeCertificateObj, REQUEST_POST);
  }

  public getDischargeCertficateAsPerAdmissionIdRegNO(admissionID: string, regNO: string) {
    let urlstr: string = `${HMIS_URL}PatientDischarge/GetDischargeInfoByPatientID?&patientRegnID=${regNO}&patientAdmissionID=${admissionID}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_SELECTED_DISCHARGE_CERTIFICATE, REQUEST_GET);
  }

  public getDischergedIPDPatientList(searchKey: string, loader: boolean = true) {
    let urlstr: string = `${HMIS_URL}PatientDischarge/GetAutoCompleteAdmissionIDForDischarge?searchText=${searchKey}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DISCHARGED_IPD_LIST, null, REQUEST_GET, loader);
  }
  public getDischargedIPDPatientDetails(admissionId: string, loader: boolean = true) {
    let urlstr: string = `${HMIS_URL}PatientDischarge/GetPatientDischargeCertificateByAdmission?admissionID=${admissionId}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DISCHARGED_IPD_PATIENT_DETAILS, null, REQUEST_GET, loader);
  }

  //Delivery type
  public setDeliveryType(deliveryObj: DeliveryType) {
    let urlstr: string = `${HMIS_URL}DeliveryType`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_DELIVERY_TYPE, deliveryObj, REQUEST_POST);
  }

  public getDeliveryType() {
    let urlstr: string = `${HMIS_URL}DeliveryType`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DELIVERY_TYPE);
  }

  public getDeliveryTypeSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}DeliveryType/GetPagedDeliveryTypeData${this.createSearchStructureForDelivery(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DELIVERY_TYPE_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForDelivery(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "DischargeTypeName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setDeliveryTypeAsPerId(pid: string, deliveryObj: DeliveryType) {
    let urlstr: string = `${HMIS_URL}DeliveryType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_DELIVERY_TYPE, deliveryObj, REQUEST_PUT);
  }

  public deleteDeliveryType(deliveryTypeId: string) {
    let urlstr: string = `${HMIS_URL}DeliveryType?deliverytypeId=${deliveryTypeId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_DELIVERY_TYPE, "", REQUEST_DELETE);
  }

  public getDeliveryTypeDropdown() {
    let urlstr: string = `${HMIS_URL}DeliveryType/GetActiveNameValuePairDeliveryType`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DELIVERY_TYPE_DROPDOWN);
  }
  //Operation type
  public setOperationType(operationTypeObj: OperationType) {
    let urlstr: string = `${HMIS_URL}OperationType`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_OPERATION_TYPE, operationTypeObj, REQUEST_POST);
  }

  public getOperationType() {
    let urlstr: string = `${HMIS_URL}OperationType/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_OPERATION_TYPE);
  }

  public getOperationTypeSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}OperationType/GetPagedOperationTypeData${this.createSearchStructureForOperation(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_OPERATION_TYPE_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForOperation(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "DischargeTypeName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setOperationTypeAsPerId(pid: string, operationTypeObj: OperationType) {
    let urlstr: string = `${HMIS_URL}OperationType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_OPERATION_TYPE, operationTypeObj, REQUEST_PUT);
  }

  public deleteOperationType(operationTypeId: string) {
    let urlstr: string = `${HMIS_URL}OperationType?operationtypeId=${operationTypeId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_OPERATION_TYPE, "", REQUEST_DELETE);
  }

  public getOperationTypeDropdown() {
    let urlstr: string = `${HMIS_URL}OperationType/GetActiveNameValuePairOperationType`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_OPERATION_TYPE_DROPDOWN);
  }
  //Pregnant type
  public setPregnantTreatment(pregnantTreatmentObj: PregnantTreatment) {
    let urlstr: string = `${HMIS_URL}PregnantTreatment`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_PREGNANT_TREATMENT, pregnantTreatmentObj, REQUEST_POST);
  }

  public getPregnantTreatment() {
    let urlstr: string = `${HMIS_URL}PregnantTreatment`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PREGNANT_TREATMENT);
  }

  public getPregnantTreatmentSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PregnantTreatment/GetPagedPregnantTreatmentData${this.createSearchStructureForPregnant(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PREGNANT_TREATMENT_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForPregnant(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "PregnantTreatmentName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setPregnantTreatmentAsPerId(pid: string, pregnantTreatmentObj: PregnantTreatment) {
    let urlstr: string = `${HMIS_URL}PregnantTreatment?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_PREGNANT_TREATMENT, pregnantTreatmentObj, REQUEST_PUT);
  }

  public deletePregnantTreatment(pregnantTreatmentId: string) {
    let urlstr: string = `${HMIS_URL}PregnantTreatment?pregnantTypetId=${pregnantTreatmentId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_PREGNANT_TREATMENT, "", REQUEST_DELETE);
  }
  //Vaccine type
  public setVaccineType(vaccineTypeObj: VaccineType) {
    let urlstr: string = `${HMIS_URL}VaccineType`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_VACCINE_TYPE, vaccineTypeObj, REQUEST_POST);
  }

  public getVaccineTypeSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}VaccineType/GetPagedVaccineTypeData${this.createSearchStructureForVaccine(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_VACCINE_TYPE_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForVaccine(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "VaccineTypeName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setVaccineTypeAsPerId(pid: string, vaccineTypeObj: VaccineType) {
    let urlstr: string = `${HMIS_URL}VaccineType?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_VACCINE_TYPE, vaccineTypeObj, REQUEST_PUT);
  }

  public deleteVaccineType(vaccineTypeId: string) {
    let urlstr: string = `${HMIS_URL}VaccineType?vaccineId=${vaccineTypeId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_VACCINE_TYPE, "", REQUEST_DELETE);
  }
  //Package
  public getPackageSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Package/GetPagedPackageData${this.createSearchStructureForPackage(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PACKAGE_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForPackage(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 5, sortingOrder = "PackageName_DSC", rangeSearch = 5): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setPackages(packagesObj: Packages) {
    let urlstr: string = `${HMIS_URL}Package`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_PACKAGE, packagesObj, REQUEST_POST);
  }

  public setPackagesAsPerId(pid: string, packagesObj: Packages) {
    let urlstr: string = `${HMIS_URL}Package?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_PACKAGE, packagesObj, REQUEST_PUT);
  }

  public deletePackage(packageId: string) {
    let urlstr: string = `${HMIS_URL}Package?packageId=${packageId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_PACKAGE, "", REQUEST_DELETE);
  }
  //Bed
  public getBedSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Bed/GetPagedBedData${this.createSearchStructureForBed(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_BED_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForBed(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "BedNumber_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public setBeds(bedsObj: Bed) {
    let urlstr: string = `${HMIS_URL}Bed`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_BED, bedsObj, REQUEST_POST);
  }

  public setBedAsPerId(pid: string, bedsObj: Bed) {
    let urlstr: string = `${HMIS_URL}Bed?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_BED, bedsObj, REQUEST_PUT);
  }

  public deleteBed(bedId: string) {
    let urlstr: string = `${HMIS_URL}Bed?bedId=${bedId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_BED, "", REQUEST_DELETE);
  }
  //State
  public getStateList() {
    let urlstr: string = `${HMIS_URL}State/Get`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_STATE_LIST);
  }
  //Hospital settings
  public setHospitalSettings(hospitalObj: HospitalSettings) {
    let urlstr: string = `${HMIS_URL}HospitalDetails`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_HOSPITAL_DETAIL, hospitalObj, REQUEST_POST);
  }

  public getHospitalSettings(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}HospitalDetails/GetPagedHospitalDetailsData${this.createSearchStructureForHospital(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForHospital(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 15, sortingOrder = "HospitalName_Dsc", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public patientSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${PATIENT_URL}/GetPagedPatientData${this.createSearchStructure(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PATIENT_SEARCH, null, REQUEST_GET, loader);
  }

  public setHospitalDetailAsPerId(pid: string, hospitalDetailObj: HospitaDetail) {
    let urlstr: string = `${HMIS_URL}HospitalDetails?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_HOSPITAL_DETAIL, hospitalDetailObj, REQUEST_PUT);
  }

  public deleteHospitalSettingsAsPerId(hospitalId: string) {
    let urlstr: string = `${HMIS_URL}HospitalDetails?hospitaldetailsId=${hospitalId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_HOSPITAL_DETAIL, "", REQUEST_DELETE);
  }
  //OT
  public setOT(oTObj: OperationType) {
    let urlstr: string = `${HMIS_URL}/OT`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_OT, oTObj, REQUEST_POST);
  }

  public getOT() {
    let urlstr: string = `${HMIS_URL}/OT`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_OT);
  }

  //Operation Theatre
  public setOperationTheatre(OperationTheatreObj: OtCreate) {
    let urlstr: string = `${HMIS_URL}OperationTheatre`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_OPERATION_THEATRE, OperationTheatreObj, REQUEST_POST);
  }

  public setOperationTheatreAsPerId(pid: string, OperationTheatreObj: OtCreate) {
    let urlstr: string = `${HMIS_URL}OperationTheatre?patientoperationId=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_OPERATION_THEATRE, OperationTheatreObj, REQUEST_PUT);
  }

  public getOperationTheatreListing(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}OperationTheatre/GetPagedOTData${this.createSearchStructureForOperationTheatre(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_OPERATION_THEATRE_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForOperationTheatre(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 1000, sortingOrder = "OtSequence_Dsc", rangeSearch = ""): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }

  public deleteOperationTheatreAsPerId(OperationTheatreId: string) {
    let urlstr: string = `${HMIS_URL}OperationTheatre?OperationTheatreId=${OperationTheatreId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_OPERATION_THEATRE, "", REQUEST_DELETE);
  }

  // public searchOperationTheatreWithRegNo(searchKey: string, loader: boolean = true): void {
  //   let urlstr: string = `${HMIS_URL}OperationTheatre/GetPagedOTData${this.createSearchStructureForOperationTheatreWithRegNo(searchKey)}`;
  //   this.genericApiCall(urlstr, RESULT_TYPE_GET_OPERATION_THEATRE_SEARCH, null, REQUEST_GET, loader);
  // }

  // private createSearchStructureForOperationTheatreWithRegNo(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 1000, sortingOrder = "", rangeSearch = ""): string {
  //   return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&sortingOrder=${sortingOrder}&querySearch=${searchstr}`;
  // }
  public getPatientListForOTWithAdmissionSequence(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}patientadmission/GetAutocompletePatientAdmissionForOperation?searchNumber=${searchKey}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_OPERATION_THEATRE_BY_ADMISSION_SEQ, null, REQUEST_GET, loader);
  }

  public getPatientDetailsForOTOnSearchId(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientAdmission/GetPatientAdmissionDetailsForOT?&admissionID=${searchKey}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PATIENT_DETAILS_FOR_OT, null, REQUEST_GET, loader);
  }

  public updateOTDetails(pid: string, OperationTheatreObj: OtCreate) {
    let urlstr: string = `${HMIS_URL}OperationTheatre?patientoperationId=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_RELEASED_TO_BED, OperationTheatreObj, REQUEST_PUT);
  }
  //Prescription
  public setPrescription(pObj: Prescription) {
    let urlstr: string = `${HMIS_URL}PatientPrescription`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_PRESCRIPTION, pObj, REQUEST_POST);
  }

  // public getPrescription() {
  //   let urlstr: string = `${HMIS_URL}/PatientPrescription/Get`;
  //   this.genericApiCall(urlstr, RESULT_TYPE_GET_PRESCRIPTION);
  // }
  public setPrescriptionAsPerId(pid: string, pObj: Prescription) {
    let urlstr: string = `${HMIS_URL}PatientPrescription?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_PRESCRIPTION_AS_PER_ID, pObj, REQUEST_PUT);
  }

  public getPrescriptionSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientPrescription/GetPagedPatientPrescriptionData${this.createSearchStructureForPrescription(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PRESCRIPTION, null, REQUEST_GET, loader);
  }

  public getPatientAsPerIdFromEXT(pid: string) {
    let urlstr: string = `${PATIENT_URL}/patientById?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT, REQUEST_GET);
  }

  private createSearchStructureForPrescription(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "PatientFirstName_DSC", rangeSearch = 10): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&sortingOrder=${sortingOrder}&querySearch=${searchstr}`;
  }

  public deletePrescriptionAsPerId(prescriptionId: string) {
    let urlstr: string = `${HMIS_URL}PatientPrescription?patientprescriptionId=${prescriptionId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_PRESCRIPTION, "", REQUEST_DELETE);
  }

  public searchIndividualPatientForPrescription(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Patient/GetAutocompletePatientRegn?searchNumber=${searchKey}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION, null, REQUEST_GET, loader);
  }

  public searchIndividualPatientByIdForPrescription(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientPrescription/GetPrescriptionsByPatient?patientID=${searchKey}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION_BY_ID, null, REQUEST_GET, loader);
  }

  //New Born
  public getNewBornSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}NewBorn/GetPagedPatientData${this.createSearchStructureForNewBorn(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_NEW_BORN_LIST, null, REQUEST_GET, loader);
  }

  private createSearchStructureForNewBorn(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "FatherName_ASC"): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&sortingOrder=${sortingOrder}&querySearch=${searchstr}`;
  }

  public setNewBorn(nbObj: NewBorn) {
    let urlstr: string = `${HMIS_URL}NewBorn`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_NEW_BORN, nbObj, REQUEST_POST);
  }

  public setNewBornAsPerId(nbid: string, nbObj: NewBorn) {
    let urlstr: string = `${HMIS_URL}NewBorn?id=${nbid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_NEW_BORN, nbObj, REQUEST_PUT);
  }
  public deleteNewBornAsPerId(nbid: string) {
    let urlstr: string = `${HMIS_URL}NewBorn?newborntId=${nbid}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_NEW_BORN, "", REQUEST_DELETE);
  }
  //Billing
  public getBillingSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientBilling/GetPagedPatientBillingData?&pageNumber${this.createSearchStructureForBilling(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_BILLING_LIST, null, REQUEST_GET, loader);
  }
  private createSearchStructureForBilling(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 1000, sortingOrder = "PatientRegn_ASC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&sortingOrder=${sortingOrder}&querySearch=${searchstr}&rangeSearch=${rangeSearch}`;
  }



  public getBillingSearchfordischarge(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientBilling/GetPagedPatientBillingData?&pageNumber${this.createSearchStructureForBillingfordischarge(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_BILLING_LIST_FOR_DISCHARGE, null, REQUEST_GET, loader);
  }
  private createSearchStructureForBillingfordischarge(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 1000, sortingOrder = "PatientRegn_ASC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&sortingOrder=${sortingOrder}&querySearch=${searchstr}&rangeSearch=${rangeSearch}`;
  }


  Approval
  public getApprovalSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}ApprovalStatus/GetPagedApprovalStatusData?&pageNumber${this.createSearchStructureForAPproval(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_APPROVAl_LIST, null, REQUEST_GET, loader);
  }
  // public getApprovalSearch(searchKey: string, loader: boolean = true): void {
  //   let urlstr: string = `${HMIS_URL}ApprovalStatus/Get`;
  //   this.genericApiCall(urlstr, RESULT_TYPE_GET_APPROVAl_LIST, null, REQUEST_GET, loader);
  // }

  

  private createSearchStructureForAPproval(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 1000, sortingOrder = "PatientRegn_ASC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&sortingOrder=${sortingOrder}&querySearch=${searchstr}&rangeSearch=${rangeSearch}`;
  }


  public createapproval(approvalObj: Disease) {
    let urlstr: string = `${HMIS_URL}ApprovalStatus`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_APPROVAL, approvalObj, REQUEST_POST);
  }
  public updateApprovalAsPerId(approvalObj) {
    console.log('approvalObj approvalObj ' , approvalObj);
    let urlstr: string = `${HMIS_URL}ApprovalStatus`;
    this.genericApiCall(urlstr, RESULT_TYPE_UPDATEAPPROVAL_LIST,approvalObj , REQUEST_PUT);
  }

  // DELETE api/ApprovalStatus?admissionId={admissionId}&deletedBy={deletedBy}
  public deleteApprovalAsPerId(approvalId: string) {
    const deleteid = {ID:approvalId}
    let urlstr: string = `${HMIS_URL}ApprovalStatus?admissionId=${approvalId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETEAPPROVAL_LIST, deleteid, REQUEST_DELETE);
  }

  public getActionsforapprover() {
    let urlstr: string = `${HMIS_URL}ApprovalStatus/GetActiveNameValuePairApprovalStatus`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ACTION_FOR_APPROVER, REQUEST_GET);
  }


  public setBilling(billObj: Billing) {
    let urlstr: string = `${HMIS_URL}patientbilling`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_BILLING, billObj, REQUEST_POST);
  }

  public setPatientApproval(PatientApprovalObj: PatientApproval) {
    let urlstr: string = `${HMIS_URL}PatientApproval`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_PATIENTAPPROVAL, PatientApprovalObj, REQUEST_POST);
  }
  public setBillingAsPerId(bllid: string, billObj: Billing) {
    let urlstr: string = `${HMIS_URL}patientbilling?id=${bllid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_BILLING, billObj, REQUEST_PUT);
  }

  public getDischargePatientList(searchKey: string, loader: boolean = true) {
    let urlstr: string = `${HMIS_URL}PatientAdmission/GetAutocompletePatientAdmissionsForBilling?searchNumber=${searchKey}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST, null, REQUEST_GET, loader);
  }

  //Price
  public getPriceSearch(searchKey: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}Price/GetPagedPriceData${this.createSearchStructureForPrice(searchKey)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PRICE_LIST, null, REQUEST_GET, loader);
  }
  private createSearchStructureForPrice(searchstr: string, pageno = 0, _pagesize = 1, pageSize = 50, sortingOrder = "PackageName_DSC", rangeSearch = 15): string {
    return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=${searchstr}&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}`;
  }


  public setPriceAsPerId(pid: string, prObj: Price) {
    let urlstr: string = `${HMIS_URL}Price?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_PRICE, prObj, REQUEST_PUT);
  }

  public deletePrice(pId: string) {
    let urlstr: string = `${HMIS_URL}Price?priceId=${pId}&deletedBy=${this._userDetail.uid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_DELETE_PRICE, "", REQUEST_DELETE);
  }

  public setPrice(prObj: Price) {
    let urlstr: string = `${HMIS_URL}Price`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_PRICE, prObj, REQUEST_POST);
  }

  // public getPrice() {
  //   let urlstr: string = `${HMIS_URL}Price/Get`;
  //   this.genericApiCall(urlstr, RESULT_TYPE_GET_PRICE_LIST);
  // }

  //Forgot Password
  public sendEmailForgotpassword(pid: string) {
    let urlstr: string = `${HMIS_URL}UserNotification/Get?id=${pid}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_FORGOT_PASSWORD, null, REQUEST_GET);
  }

  //Advance Billiing

  public setAdvanceBillingModel(advObj: advanceBillingModel) {
    let urlstr: string = `${HMIS_URL}PatientBillingAdvanceDetails`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_ADVANCE_BILLING, advObj, REQUEST_POST);
  }

  public getAdvanceBillingData(patientID: string, admissionID: string, billingID: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientBillingAdvanceDetails/GetPagedPatientBillingAdvanceDetailsData${this.createSearchStructureForAdvanceBilling(patientID, admissionID, billingID)}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_ADVANCE_BILLING, null, REQUEST_GET, loader);
  }
 

  private createSearchStructureForAdvanceBilling(patientID, admissionID, billingID, pageno = 0, _pagesize = 1, pageSize = 30, sortingOrder = "PackageName_DSC", rangeSearch = ""): string {
      return `?&pageNumber=${pageno}&_pageSize=${_pagesize}&pageSize=${pageSize}&querySearch=&sortingOrder=${sortingOrder}&rangeSearch=${rangeSearch}&patientID=${patientID}&admissionID=${admissionID}&billingID=${billingID}`;
  }
  //PatientApproval status
  // api/PatientApproval?patientID={patientID}&admissionID={admissionID}&billingID={billingID}
  public getPatientApprovalStatus(patientID: string, admissionID: string, billingID: string, loader: boolean = true): void {
    let urlstr: string = `${HMIS_URL}PatientApproval?patientID=${patientID}&admissionID=${admissionID}&billingID=${billingID}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_PATIENT_APPROVAL_STATUS, null, REQUEST_GET, loader);
  }
  //Distribution Billing
  public setDistributionBillingData(extObj: BillingDistribution): void {
    let urlstr: string = `${HMIS_URL}PatientBillingDistribution`;
    this.genericApiCall(urlstr, RESULT_TYPE_SET_EXTERNAL_BILLING, extObj, REQUEST_POST);
  }
  public getDistributionBilling(billingID: string, loader: boolean = true) {
    let urlstr: string = `${HMIS_URL}PatientBillingDistribution/GetPatientBillingDistributionByID?billingId=${billingID}`;
    this.genericApiCall(urlstr, RESULT_TYPE_GET_EXTERNAL_BILLING, null, REQUEST_GET, loader);
  }

  public setDistributionBillAsPerId(distBillId: string, Obj: BillingDistribution) {
    let urlstr: string = `${HMIS_URL}PatientBillingDistribution?patientBillingDetailsID=${distBillId}`;
    this.genericApiCall(urlstr, RESULT_TYPE_EDIT_EXTERNAL_BILLING, Obj, REQUEST_PUT);
  }
  //end api

  private genericApiCall(url, rtype: string,
    bodydata: any = null,
    requesttype: string = REQUEST_GET,
    activeLoader: boolean = true) {
    if (activeLoader) this.loader.showLoader = true;

   const  httpOpt = {

      headers: new HttpHeaders().set("Token", this.hmistoken).set("Tenant_Key", "MedicareDb")
      //headers: new HttpHeaders().set("Token", "d7a0691f-aa23-4802-b556-d01ac401f98d").set("Tenant_Key", "MedicareDb")

    };
    console.log('(url)' ,url );
    console.log('(rtype)' ,rtype);
    console.log('(bodydata )' ,bodydata);
    console.log('(requesttype )' ,requesttype);


const httpoption  =  { headers: new HttpHeaders().set("Token", this.hmistoken).set("Tenant_Key", "MedicareDb")
,body:bodydata
};
console.log('(httpoption )' ,httpoption);


    switch (requesttype) {
      case REQUEST_GET:
        this.hmisHttp.get(url, httpOpt).subscribe(
          data => {
            console.log('(requestget  data)' ,data);

            
            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

      case REQUEST_POST:
        this.hmisHttp.post(url, bodydata, httpOpt).subscribe(
          data => {
            console.log('(post data)' ,data);

            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

      case REQUEST_PUT:
        this.hmisHttp.put(url, bodydata, httpOpt).subscribe(
          data => {
            console.log('(put data)' ,data);

            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

      case REQUEST_DELETE:
        this.hmisHttp.delete(url, httpOpt).subscribe(
          
          data => {
            console.log('(delete data)' ,data);

            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;
        
      case REQUEST_DELETE_WITH_BODY:
      console.log('enters requestdelete with body')
      this.hmisHttp.delete(url,httpoption).subscribe(
        
        data => {
          console.log('(delete data)' ,data);

          if (activeLoader) this.loader.showLoader = false;
          this._result.next({ resulttype: rtype, result: data });
        },
        error => {
          this.handleError(error, rtype);
        }
      );
      break;
    }
  }

  private handleError(error: any, requestid: string) {
    //console.log(error, requestid);
    this.loader.showLoader = false;
    this._result.next({ resulttype: RESULT_ERROR, result: error, requestid: requestid });
    //console.log(error)
  }

  private createSearchStructure(searchstr: string, pageno = 0, pagesize = 100): string {
    return `?&pageNumber=${pageno}&pageSize=${pagesize}&sortingOrder=LastName_DSC&querySearch=${searchstr}`;
  }

  get hmistoken() {
    return this._hmistoken;
  }

  set hmistoken(value: string) {
    this._hmistoken = value;
  }

  get apiResults() {
    return this._result.asObservable();
  }

  get userDetail() {
    return this._userDetail;
  }

  set userDetail(value: UserDetail) {
    this._userDetail = value;
  }

}
