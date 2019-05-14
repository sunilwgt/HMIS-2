import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Registration, DOB, CompDataInfo, PatientExt } from '../../models/registration';
import { Option, RadioData, GenericPopupOption, RL_REGISTRATION_LIST, RESULT_TYPE_EDIT_PATIENT, RESULT_TYPE_SET_PATIENT, MODE_ADD, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_STATE_LIST, UPDATE_FIELD_STATE, RL_REGISTER_CONFIRMATION_MODAL, PATIENT_ID_STATE, CUSTOM_COND, INVALID_FIELD, VALID_FIELD, CustomErrorInfo, RESULT_TYPE_DELETE_PATIENT, RESULT_TYPE_UPDATE_PATIENT_EXT, RESULT_TYPE_GET_DOCTOR_LIST, RESULT_TYPE_GET_ALL_DOCTOR_LIST, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID, RESULT_TYPE_ADD_USER, MODE_EDIT, RESULT_TYPE_GET_ALL_USERSTYPE_VAlUE_PAIR, RESULT_TYPE_GET_USER_TYPE_PERMISSION_VAlUE_PAIR, Permissions, RESULT_TYPE_ADD_PERMISSIONS, RL_PERMISSION_LIST, RESULT_TYPE_GET_PERMISSIONS_BY_ROLE_ID, RESULT_TYPE_SET_PERMISSION_TO_ROLE, RESULT_TYPE_DELETE_PERMISSION_FROM_ROLE } from '../../models/common';
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
import { FormControl } from '@angular/forms';
import { User } from '../../models/user';
import { Permission } from '../../models/userole';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'hmis-assignpermission',
  templateUrl: './assignpermission.component.html',
  styleUrls: ['./assignpermission.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AssignPermissionComponent extends BaseComponent implements OnInit {

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
  private usersoption: Array<Option> = [];
  private userspermissionoption: Array<Option> = [];
  private permissionmodel = new Permissions;
  private selectedroleid: any;

 private  roledropdownList = [];
  selectedroleItems = [];
  roledropdownSettings = {};
  permissiondropdownList = [];
  permissiondropdownListshow = []
  selectedpermissionItems = [];
  permissiondropdownSettings = {};
  assignedpermission = [];
  countrydata = []
  isimage = false;
  private hospitaldata;
  private isaddmode = false;
  toppings = new FormControl();

  constructor( private http:HttpClient, baseService: BaseServices, private _errorService: ErrorService, private el: ElementRef
  ) {
    super(baseService);

    this.hmisApi.userTypeSearchValuePair("");
    this.hmisApi.userTypeSearchPermissionValuePair("");


  }



  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_ALL_USERSTYPE_VAlUE_PAIR) {
      this.usersoption = this.comonService.usersOption(data.result);
      this.roledropdownList = this.comonService.usersOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_GET_USER_TYPE_PERMISSION_VAlUE_PAIR) {
      this.userspermissionoption = this.comonService.userspermissionOption(data.result);
      this.permissiondropdownList = this.comonService.userspermissionOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_GET_PERMISSIONS_BY_ROLE_ID) {
      console.log('permissions' , data);
      this.assignedpermission = data.result;
      this.assignNotify()
    }
    if (data.resulttype === RESULT_TYPE_SET_PERMISSION_TO_ROLE) {
     
      console.log('assigned role' , data);
    }
    if (data.resulttype === RESULT_TYPE_DELETE_PERMISSION_FROM_ROLE) {
     
      console.log('removed role' , data);
    }

  }

  assignNotify() {
    let ids = [];
    this.assignedpermission.map((val) => {
      let i = val['permission_id'];
      ids.push(i);
    })
    this.permissiondropdownList.map((value, index) => {
      if (ids.indexOf(value.value) != -1) {
        this.permissiondropdownList[index].selected = true;
      } else {
        this.permissiondropdownList[index].selected = false;
      }
    });
    this.permissiondropdownListshow = this.permissiondropdownList;
  }


  ngOnInit() {
    console.log('wef', this.permissiondropdownList)
    this.updateDataForEVMode();
    console.log('currentstate', this.state.currentstate)
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Permissions();
      this.isaddmode = true;
    }
    if (this.state.currentstate === MODE_EDIT) {
      this.isaddmode = false;
    }
    this.roledropdownSettingss();
    this.permissiondropdownSettingss();
    // this.countrydata = [];
    // this.http.get('https://restcountries.eu/rest/v2/all').subscribe((res)=> {console.log(res)
    //  this.countrydata.push(res);
    //  this.isimage = true;
    //  console.log('this.countrydata' , this.countrydata);
    // })
  }

  roledropdownSettingss() {
    this.roledropdownSettings = {
      singleSelection: true,
      idField: 'value',
      textField: 'label',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      // allowSearchFilter: true
    };
  }

  permissiondropdownSettingss() {
    this.permissiondropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      // allowSearchFilter: true
    };
  }

  onroleselect(event: any, item: any) {
    console.log('event' , event)
    this.hmisApi.getpermissionsbyroleid(event.value);
    console.log('selectedroleitem', this.selectedroleItems)
  }


  onchangepermission(event: any, permissionid: any, item: any) {
    if (event.target.checked) {
   const  assignpermission = { permission_id: permissionid  , role_id: this.selectedroleItems[0].value}
      console.log('checked');
      this.hmisApi.setpermissiontorole(assignpermission);
    } else {
const removepermission = {permission_id: permissionid  , role_id: this.selectedroleItems[0].value}
      this.hmisApi.removepermissiontorole(removepermission);
      console.log('unchecked');

    }


  }
  onSelectAll(items: any) {
    console.log(items);
  }
  SubmitClickHandler() {
    console.log('state', this.state.currentstate);

    if (this.state.currentstate === MODE_ADD) {
      const permissionvalues = this.fillpermissiondata();
      this.permissionmodel.access_area = this.compData.access_area;
      this.permissionmodel.can_create = permissionvalues.can_create;
      this.permissionmodel.can_read = permissionvalues.can_read;
      this.permissionmodel.can_update = permissionvalues.can_update;
      this.permissionmodel.can_delete = permissionvalues.can_delete;
      console.log('permission data', this.permissionmodel);
      this.hmisApi.setPermission(this.permissionmodel);
    }
    if (this.state.currentstate === MODE_EDIT) {
      // this.hmisApi.userTypeSearchValuePair("");
    }


  }


  fillpermissiondata() {
    let cancreate = false;
    let canread = false;
    let canupdate = false;
    let candelete = false;
    for (let v of this.selectedpermissionItems) {
      if (v.value === 'can_create') {
        cancreate = true;
      }
      if (v.value === 'can_read') {
        canread = true;
      } if (v.value === 'can_update') {
        canupdate = true;
      } if (v.value === 'can_delete') {
        candelete = true;
      }
    }
    return { can_create: cancreate, can_read: canread, can_update: canupdate, can_delete: candelete }

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
