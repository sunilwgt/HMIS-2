import { Component, OnInit, ViewEncapsulation, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { GenericPopupOption, MODAL_ITEM_CLICKED_STATE, RESULT_TYPE_GET_PACKAGE, RESULT_TYPE_GET_ADMISSION_TYPE, RESULT_TYPE_GET_WARD_TYPE, RESULT_TYPE_GET_FLOOR, MODE_ADD, RESULT_TYPE_ADD_ADMISSION, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, RESULT_TYPE_AUTO_COMPLETE_DOCTOR_SEARCH, DoctorListOption, RL_ADMISSION_LIST, RESULT_TYPE_EDIT_ADMISSION, RL_ADMISSION_CONFIRMATION_MODAL, PATIENT_ADMISSION_ID_STATE, ADMISSION_MODAL_ID_STATE, RESULT_TYPE_GET_PACKAGE_LIST, RL_BILLING, RESULT_TYPE_GET_ADMISSION_LIST, RESULT_TYPE_GET_ALL_ADMISSION_LIST, RESULT_TYPE_GET_ALL_DISCHARGE_TYPE_LIST, RESULT_TYPE_GET_BUILDING_DROPDOWN, RESULT_TYPE_GET_FLOOR_DROPDOWN, MODE_VIEW, RESULT_TYPE_GET_REGISTERED_REG_NO, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID, RL_REGISTRATION, ADD, MODE_ADMISSION, RL_ADMISSION } from '../../models/common';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Registration, DOB, CompDataInfo } from '../../models/registration';
import { CommonService } from '../../services/common.service';
import { Option, RadioData, PackageOption, GET_SELECTED_ITEMS, RESULT_TYPE_GET_PATIENT_SEARCH, GET_SELECTED_ITEM, RESULT_TYPE_GET_PATIENT_AS_PER_ID, UPDATE_FIELD_STATE, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_STATE_LIST, MODE_EDIT, RESULT_TYPE_GET_WARD } from '../../models/common';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { Patient } from '../../models/patient';
import { State } from '../../models/state';
import { patientListOption } from '../../models/patient';
import { HelperFunction } from '../../utils/helper-function.service';
import { DoctorOptions, DischargeTypeOption } from '../../models/opd';
import { DatePipe } from '@angular/common';
import { StateListOption, PackageListOption, AdmissionModel, AdmissionMainModel, AdmissionModelExtData, billingModel } from '../../models/admission';

import { ComponentModule } from '../../enums/component-module.enum';
import * as _ from 'lodash';

import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GenericPopup } from '../../generic-components/generic-popup';
import { register } from 'ts-node';

declare var jsPDF: any;

@Component({
  selector: 'hmis-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApprovedComponent extends BaseComponent implements OnInit {

  @ViewChild(GenericPopup)
  private genericPopup: GenericPopup;

  private bloodOptions: Array<Option>;
  private booleanOptions: Array<RadioData>;
  private genderOptions: Array<RadioData>;
  private admitedByOptions: Array<RadioData>;
  private compModule: any = ComponentModule;
  private nationalityOption: Array<Option> = [];
  private religionOption: Array<Option> = [];
  private modaloption: NgbModalOptions;
  private pkgList: Array<ISelectOption> = [];
  private doctorList: Array<ISelectOption> = [];
  private packageSearchList: Array<ISelectOption> = [];
  private packageListOption: Array<PackageListOption> = [];
  private _updateStateObj: State;
  private _popUpStateObj: State;
  private doctorListOption: Array<DoctorOptions> = [];
  private relationWithOption: Array<Option> = [];
  private insuranceCompanyOption: Array<Option> = [];
  private admissionTypeOption: Array<Option> = [];
  private govtIdType: Array<Option> = [];
  private govtIDTypeError: string;
  private govtIDNumberError: string;
  private floorListOption: Array<Option> = [];
  private buildingListOption: Array<Option> = [];
  private admissionModel: AdmissionMainModel = new AdmissionMainModel();
  private tabIndex: number = 0;
  private referred_doctor: string;
  private patientAdmissionId: string;
  private searchStr: string;
  private packageList = [];
  private packageDetails = [];
  private packageInfo = [];
  private storeAdmissionID: string;
  private billingModel: billingModel = new billingModel();
  showNav: any = [];
  input: ElementRef;
  IsEnabled: boolean = false;
  private patientList = [];
  private patientData = [];
  private IsEditMode: boolean = false;
  private isVisible: boolean = false;
  private value: string = '';
  private dischargeTypeOption: Array<DischargeTypeOption> = [];

  private showsearch: boolean = false;
  constructor(baseservice: BaseServices, private helperFunc: HelperFunction, private renderer: Renderer2, public datepipe: DatePipe) {
    super(baseservice)
    this.showNav[0] = true;
    this.hmisApi.getDoctor();
    this.hmisApi.getStateList();
    this.hmisApi.getWardType();
    this.hmisApi.getAdmissionTypeList();
    this.hmisApi.getBuildingDropdown();
    this.hmisApi.getDischargeTypeList();

    this.defaultvalidation = true;
    this.stateService.stateObserver.subscribe(data => {
      if (data && data.stateID === ADMISSION_MODAL_ID_STATE) {
        this.storeAdmissionID = data.stateData;
        this.showNav[2] = true;
        this.showNav[0] = false;
      }
    })
  }

  ngOnInit() {
    if (this.state.currentstate === MODE_ADMISSION) {
      this.showsearch = false;
    }
    if (this.state.currentstate === undefined) {
      this.showsearch = true;
    }
    if (this.state.currentstate === MODE_ADD) {
      this.showsearch = true;
    }
    this.modaloption = new GenericPopupOption();
    this.modaloption.size = "sm";
    this.bloodOptions = this.comonService.bloodOptions;
    this.booleanOptions = this.comonService.radioYesNoOptions;
    this.genderOptions = this.comonService.genderOptions;
    this.admitedByOptions = this.comonService.admitedby;
    this.relationWithOption = this.comonService.relationWithOption;
    this.insuranceCompanyOption = this.comonService.insuranceCompanyOption;
    this.govtIdType = this.comonService.govtIdType;
    this.nationalityOption = this.comonService.nationalityOption;
    this.religionOption = this.comonService.religionOption;
    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this._popUpStateObj = this.stateService.createState(PATIENT_ADMISSION_ID_STATE);
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_EDIT || this.state.currentstate === MODE_VIEW) {
      this.IsEditMode = true;
      this.isVisible = true;
      this.hmisApi.getFloorDropdown(this.compData.building_id);
    } else {
      this.IsEditMode = false;
      this.compData = new AdmissionMainModel();
    }

  }

  Onregister() {
    // this.state.currentstate = RL_ADMISSION;
    this.compLoadManager.closePopup();
    this.compLoadManager.redirect(RL_REGISTRATION);
  }

  addNewPatient(): void {
    this.state.currentstate = MODE_ADD;
    this.state.stateData = null;
    this.compLoadManager.redirect(RL_BILLING);
    // this.baseservice.compLoadManager.redirect(RL_REGISTRATION)
    // this._sObj.currentstate = ADD;
    // this.stateService.updateState(ADD);
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_REGISTERED_REG_NO) {
      var patientRegistarionData = data.result;
      this.createPatientlist(data.result);
    }
    if (data.resulttype === RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID) {
      this.patientData = data.result[0];
      this.compData = this.patientData;
      this.compData.patient_name = this.compData.patient_first_name + ' ' + this.compData.patient_last_name;
      // var dateOfAdmission = this.compData.created_on.split("T");
      // this.compData.admitted_on = dateOfAdmission[0];
      //this.compData.admitted_on === undefined?"": this.datepipe.transform(dateOfAdmission[0], 'dd-MM-yyyy');
      this.updateAllFields();
      this.IsEditMode = false;
      this.isVisible = true;
    }

    if (data.resulttype === RESULT_TYPE_GET_DOCTOR_AS_PER_ID) {
      this.referred_doctor = data.result.first_name + ' ' + data.result.last_name;
      this.compData.referred_doctor_name = this.referred_doctor;
      this._updateStateObj.currentstate = 'referred_doctor_name';
      this._updateStateObj.stateData = this.compData;
      this.stateService.updateState(this._updateStateObj);

    }

    if (data.resulttype === RESULT_TYPE_AUTO_COMPLETE_DOCTOR_SEARCH) {
      this.createDoctorList(data.result);
    }

    if (data.resulttype === RESULT_TYPE_GET_ADMISSION_LIST) {
      this.admissionTypeOption = this.comonService.admissionTypeListOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_GET_BUILDING_DROPDOWN) {
      this.buildingListOption = this.comonService.buildingOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_GET_FLOOR_DROPDOWN) {
      this.floorListOption = this.comonService.floorOption(data.result);
    }

    if (this.state !== undefined) {
      if (data.resulttype === RESULT_TYPE_ADD_ADMISSION) {
        this.compLoadManager.closePopup();
        this.genericPopup.openPopup(this.compLoadManager.redirect(RL_ADMISSION_CONFIRMATION_MODAL, true));
      }
    }
    if (data.resulttype === RESULT_TYPE_EDIT_ADMISSION) {
      this.compLoadManager.redirect(RL_ADMISSION_LIST);
      // this.hmisApi.getAdmittedPatientList("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_GET_PACKAGE_LIST) {
      this.createPackageList(data.result);
      this.packageInfo = data.result;
    }

    if (data.resulttype === RESULT_TYPE_GET_ALL_ADMISSION_LIST) {
      this.admissionTypeOption = this.comonService.admissionTypeListOption(data.result);
    }
    if (data.resulttype === RESULT_TYPE_GET_ALL_DISCHARGE_TYPE_LIST) {
      this.dischargeTypeOption = this.comonService.dischargeTypeListOption(data.result);
    }
  }

  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
    this.tabIndex = index;
  }
  private createPatientlist(data: any): void {
    let arrPatient: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new patientListOption();
      dOpt.label = val.Name;
      dOpt.value = val.Name;
      dOpt.id = val.ID;
      arrPatient.push(dOpt);
    }
    this.patientList = arrPatient;
  }

  getSelectedHandlerForPatient(evntObj: any): void {
    this.hmisApi.getRegisteredPatientById(evntObj.data.id);
  }

  private createDoctorList(data: any): void {
    let arrDoctor: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new DoctorListOption();
      dOpt.label = val.Name;
      dOpt.value = val.Name;
      dOpt.id = val.ID;
      arrDoctor.push(dOpt);
    }
    this.doctorList = arrDoctor;
  }

  private createPackageList(data: any): void {
    let arrPackage: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new PackageListOption();
      dOpt.label = val.package_name;
      dOpt.value = val.package_name;
      dOpt.id = val.ID;
      arrPackage.push(dOpt);
    }
    this.packageSearchList = arrPackage;
  }

  private getNewObj(lbl: string, lblval: string, id: number): ISelectOption {
    let item: ISelectOption = new PackageOption();
    item.label = lbl;
    item.value = lblval;
    item.id = id;
    return item;
  }

  private onKeyUpSearchForPatient(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.getRegisteredRegNumber(evntObj.data);
    }
  }
  private onKeyUpSearchForDoctor(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.autoSearchDoctor(evntObj.data);
    }
  }

  protected valueChangeHandler(evt: CompDataInfo): void {

    if (evt.propname === 'package_id') {
      this.compData = [];
      this.compData[evt.propname] = evt.newval;
    }
    if (evt.propname.indexOf('@') !== -1) {
      const indexNo = evt.propname.split('@');
      if (!this.compData[indexNo[0]]) {
        this.compData[indexNo[0]] = [];
      }
      this.compData[indexNo[0]][indexNo[1]] = evt.newval;
    } else {
      this.compData[evt.propname] = evt.newval;
    }

    if (evt.propname === 'building_id') {
      this.hmisApi.getFloorDropdown(evt.newval);
      this.compData.building_id = evt.newval;
    }

    if (evt.propname === 'floor_id') {
      this._updateStateObj.currentstate = 'ward_number';
      this.compData.ward_number = '';
      this._updateStateObj.stateData = this.compData;
      this.stateService.updateState(this._updateStateObj);
      this._updateStateObj.currentstate = 'bed_number';
      this.compData.bed_number = '';
      this._updateStateObj.stateData = this.compData;
      this.stateService.updateState(this._updateStateObj);
      this.comonService.selectedFloor = evt.newval;
    }
    if (evt.propname === 'ward_name') {
      this.comonService.selectedWard = evt.newval;
      this.compData.ward_number = evt.newval;
    }

    if (evt.propname === 'floor_id') {
      this.comonService.selectedFloor = evt.newval;
    }
    if (this.admissionModel[evt.propname] !== undefined) {
      this.admissionModel[evt.propname] = evt.newval;
    }
    if (evt.propname === 'discharge_date') {
      this.admissionModel[evt.propname] = evt.newval;
      this.IsEnabled = true;
    }
  }

  getselectedItemHandler(evntObj: any): void {
    this.admissionModel.doctor_id = evntObj.data.id;
    this.admissionModel.doctor_name = evntObj.data.value;
  }

  getselectedItemHandlerForPackage(evntObj: any): void {
    this.packageDetails = this.packageInfo;
  }

  invokeAddFunction(): void {
    this.admissionModel.patient_id = this.compData.ID;
    this.admissionModel.reffered_doctor_id = this.compData.Reffered_Doctor;
    this.admissionModel.created_by = this.compData.created_by;
    this.admissionModel.modified_by = this.compData.modified_by;
    this.admissionModel.patient_dob = this.compData.patient_dob;
    this.admissionModel.govt_id_value = this.compData.govt_id_value;
    this.admissionModel.patient_blood_group = this.compData.patient_blood_group;
    this.admissionModel.bed_number = this.compData.bed_number;
    this.admissionModel.building_id = this.compData.building_id;
    this.admissionModel.ward_number = this.compData.ward_number;
    this.hmisApi.setAdmission(this.admissionModel);
    // this.createPdfStructure(this.admissionModel);
  }

  invokeEditFunction(): void {
    //console.log(this.compData);
    this.admissionModel = this.comonService.admissionUpdateFormObject(this.compData);
    this.hmisApi.setAdmittedPatientAsPerID(this.compData.ID, this.admissionModel);
    // this.comonService.createPdfStructureForAdmission(this.admissionModel);
  }

  updateClickHandler() {
    this.billingModel = this.compData;
    this.billingModel.admission_id = this.storeAdmissionID;
    this.billingModel.created_by = this.hmisApi.userDetail.created_by;
    this.billingModel.modified_by = this.hmisApi.userDetail.modified_by;
  }

  private clickNextBtnHandler(tabIndex: number): void {
    this.toggleNav(tabIndex);
  }

  private updateAllFields() {
    for (const key in this.compData) {
      // console.clear();
      if (this.compData.hasOwnProperty(key)) {
        this._updateStateObj.currentstate = key;
        this._updateStateObj.stateData = this.compData;
        this.stateService.updateState(this._updateStateObj);
      }
    }
  }
}
