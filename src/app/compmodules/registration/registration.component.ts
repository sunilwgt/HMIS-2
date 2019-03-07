import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Registration, DOB, CompDataInfo, PatientExt } from '../../models/registration';
import { Option, RadioData, GenericPopupOption, RL_REGISTRATION_LIST, RESULT_TYPE_EDIT_PATIENT, RESULT_TYPE_SET_PATIENT, MODE_ADD, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_STATE_LIST, UPDATE_FIELD_STATE, RL_REGISTER_CONFIRMATION_MODAL, PATIENT_ID_STATE, CUSTOM_COND, INVALID_FIELD, VALID_FIELD, CustomErrorInfo, RESULT_TYPE_DELETE_PATIENT, RESULT_TYPE_UPDATE_PATIENT_EXT, RESULT_TYPE_GET_DOCTOR_LIST, RESULT_TYPE_GET_ALL_DOCTOR_LIST, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID } from '../../models/common';
import { GenericPopup } from '../../generic-components/generic-popup';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BaseServices } from '../../utils/base.service';
import { BaseComponent } from '../../utils/base.component';
import { State } from '../../models/state';
import { DoctorOptions } from '../../models/opd';
import { StateListOption } from '../../models/admission';
import { ErrorService } from '../../services/error.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Directive, ElementRef, HostListener } from '@angular/core';
@Component({
  selector: 'hmis-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RegistrationComponent extends BaseComponent implements OnInit {

  @ViewChild(GenericPopup)
  private genericPopup: GenericPopup;
  private booleanOptions: Array<RadioData>;
  private genderOptions: Array<RadioData>;
  private bplOption: Array<RadioData>;
  private modaloption: NgbModalOptions;
  private govtIdType: Array<Option>;
  private _updateStateObj: State;
  private _popUpStateObj: State;
  private doctorListOption: Array<DoctorOptions> = [];
  private stateListOption: Array<StateListOption> = [];
  private patient_state: Array<Option>;
  showNav: any = [];
  private patientId: string;
  private _subscription: Subscription;
  private phoneError: CustomErrorInfo;
  private contactpersonphoneError: CustomErrorInfo;
  private ageError: CustomErrorInfo;
  private customCond: string = CUSTOM_COND;
  private nationalityOption: Array<Option> = [];
  private religionOption: Array<Option> = [];
  private hospitaldata;
  constructor(baseService: BaseServices, private _errorService: ErrorService, private el: ElementRef
  ) {
    super(baseService);
    this.showNav[0] = true;
    //this.hmisApi.getDoctor();
    // this.hmisApi.getDoctorListSearch("");
    this.hmisApi.getDoctorList();
    this.hmisApi.getStateList();
    this.hmisApi.getHospitalSettings("");

  }

  hmisApiSubscribe(data: any): void {

console.clear();
console.log('data result type' , data.resulttype)
    
    if (data.resulttype === RESULT_TYPE_SET_PATIENT) {
      this.patientId = data.result;
      this._popUpStateObj.stateData = this.patientId;
      this.compLoadManager.closePopup();
      this.genericPopup.openPopup(this.compLoadManager.redirect(RL_REGISTER_CONFIRMATION_MODAL, true));
      this.stateService.updateState(this._popUpStateObj);
    }

    if (data.resulttype === RESULT_TYPE_EDIT_PATIENT) {
      this.compLoadManager.redirect(RL_REGISTRATION_LIST);
      this.hmisApi.patientSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_GET_ALL_DOCTOR_LIST) {
      this.doctorListOption = this.comonService.doctorListOptions(data.result);
    }
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
      console.log('hospital details' , this.hospitaldata);
    }

//     if (data.resulttype === RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID) {
//       this.compData = data.result[0];
// console.clear();
//       console.log('compdata' , this.compData);
//       // this.compData.patient_name = this.compData.patient_first_name + ' ' + this.compData.patient_last_name;
//       this.updateAllFields();
//     }
  }

  ngOnInit() {
    console.log('oninit compdata',this.compData);
    this.govtIdType = this.comonService.govtIdType;
    this.bplOption = this.comonService.radioYesNoOptions;
    this.genderOptions = this.comonService.genderOptions;
    this.patient_state = this.comonService.stateOptions;
    this.nationalityOption = this.comonService.nationalityOption;
    this.religionOption = this.comonService.religionOption;
    this.modaloption = new GenericPopupOption();
    this.modaloption.size = "sm";

    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this._popUpStateObj = this.stateService.createState(PATIENT_ID_STATE);

    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Registration();
    }
  }


  invokeAddFunction(): void {
    //this.setExtnData();
    // this.compData.patient_age = "27";
    // this.compData.patient_age_unit = "month";
    //console.log(this.compData);
    //console.log("compdata ", this.compData);
    this.hmisApi.setPatient(this.compData);
  }

  invokeEditFunction(): void {
    //this.setExtnData();
    this.hmisApi.setPatientAsPerId(this.compData.ID, this.compData);
  }

  invokeDeleteFunction(): void {
    //this.setExtnData();
    //this.hmisApi.deletePatientPerId(this.compData.ID,"UserId");
  }

  // private setExtnData(): void {

  //   this.compData.hmis_patient_ext = [];
  //   var patientData: any = { 'patient_profession': this.compData.patient_profession, 'patient_post_office': this.compData.patient_post_office, 'patient_dist': this.compData.patient_dist, 'emergency_person': this.compData.emergency_person, 'emergency_person_contact': this.compData.emergency_person_contact, 'patient_nationality': this.compData.patient_nationality, 'patient_religion': this.compData.patient_religion };
  //   _.forEach(patientData, (value, key) => {
  //     this.compData.hmis_patient_ext.push({ "attribute_name": key, "attribute_value": value });
  //   });
  // }

  // protected valueChangeHandler(evt: CompDataInfo): void {
  //   super.valueChangeHandler(evt);
  //   if (evt.propname === "patient_dob") {
  //     this.compData.patient_age = evt.extraprops.calculatedAge;
  //     this._updateStateObj.currentstate = "patient_age";
  //     this._updateStateObj.stateData = this.compData;
  //     this.stateService.updateState(this._updateStateObj);
  //   }

  // }

  /**
   * Refeence code: how to implement custom validation
   *
   * private lastNameValidation(evntObj:any):void{
     let to:any = {};
     if(!evntObj.newval || evntObj.newval.length > 10){
       to.isErrorShow = true;
       to.fieldStatus = INVALID_FIELD;
       to.data = evntObj;
     }else{
       to.isErrorShow = false;
       to.fieldStatus = VALID_FIELD;
       to.data = evntObj;
     }
     this.lastNameError = to;
   }
   *
   *
   */
  private customPhoneNoCheck(evntObj: any): void {
    console.log(' custom person check', evntObj);

    let to: CustomErrorInfo = new CustomErrorInfo();
    if (!evntObj.newval) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Please provide phone no."
    } else if ((evntObj.newval).toString().length < 10) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Minimum 10 digit required";
    } else if ((evntObj.newval).toString().length > 10) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "10 digit exceeds";
    } else {
      to.isErrorShow = false;
      to.fieldStatus = VALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "";
    }

    this.phoneError = to;
  }


  contactpersonPhoneNoCheck(evntObj: any): void {
    console.log('contact person check', evntObj);
    let to: CustomErrorInfo = new CustomErrorInfo();
    if (!evntObj.newval) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Please provide phone no."
    } else if ((evntObj.newval).toString().length < 10) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Minimum 10 digit required";
    } else if ((evntObj.newval).toString().length > 10) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "10 digit exceeds";
    } else {
      to.isErrorShow = false;
      to.fieldStatus = VALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "";
    }

    this.contactpersonphoneError = to;
  }

  private onErrorOccurFirstTab(evntObj: any): void {
    this.showNav[0] = true;
    this.showNav[1] = false;
  }

  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
  }


  private customAgeCheck(evntObj: any): void {
    let to: CustomErrorInfo = new CustomErrorInfo();
    if (!evntObj.newval) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Please provide Age."
    } else if ((evntObj.newval) < 0) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Age Should be greater than 0";
    } else {
      to.isErrorShow = false;
      to.fieldStatus = VALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "";
    }
    this.ageError = to;
  }
  // private updateAllFields(){
  //   console.log(this.compData);
  //   for (const key in this.compData) {
  //     console.log('keys' , key);
  //     if (this.compData.hasOwnProperty(key)) {
  //       this._updateStateObj.currentstate = key;
  //       this._updateStateObj.stateData = this.compData;
  //       this.stateService.updateState(this._updateStateObj);
  //     }
  //   }
  //   console.log('this.updatestateob' , this._updateStateObj);
  // }

}
