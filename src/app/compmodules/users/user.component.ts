import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Registration, DOB, CompDataInfo, PatientExt } from '../../models/registration';
import { Option, RadioData, GenericPopupOption, RL_REGISTRATION_LIST, RESULT_TYPE_EDIT_PATIENT, RESULT_TYPE_SET_PATIENT, MODE_ADD, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_STATE_LIST, UPDATE_FIELD_STATE, RL_REGISTER_CONFIRMATION_MODAL, PATIENT_ID_STATE, CUSTOM_COND, INVALID_FIELD, VALID_FIELD, CustomErrorInfo, RESULT_TYPE_DELETE_PATIENT, RESULT_TYPE_UPDATE_PATIENT_EXT, RESULT_TYPE_GET_DOCTOR_LIST, RESULT_TYPE_GET_ALL_DOCTOR_LIST, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID, RESULT_TYPE_ADD_USER, MODE_EDIT, RESULT_TYPE_GET_ALL_USERSTYPE_VAlUE_PAIR, RESULT_TYPE_GET_USER_TYPE_PERMISSION_VAlUE_PAIR, RESULT_TYPE_GET_ALL_ROLES_BY_USERID, RESULT_TYPE_SET_ROLE_TO_USER, RESULT_TYPE_DELETE_ROLE_FROM_USER, MODE_VIEW } from '../../models/common';
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
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
// import {MessageService} from 'primeng/api';
@Component({
  selector: 'hmis-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UserComponent extends BaseComponent implements OnInit {

  @ViewChild(GenericPopup)
  private genericPopup: GenericPopup;
  private booleanOptions: Array<RadioData>;
  private genderOptions: Array<RadioData>;
  private bplOption: Array<RadioData>;
  private modaloption: NgbModalOptions;
  private govtIdType: Array<Option>;
  private _updateStateObj: State;
  private _popUpStateObj: State;
 private phoneError: CustomErrorInfo;

  private doctorListOption: Array<DoctorOptions> = [];
  private stateListOption: Array<StateListOption> = [];
  private patient_state: Array<Option>;
  showNav: any = [];
  private patientId: string;
  private _subscription: Subscription;
  private contactpersonphoneError: CustomErrorInfo;
  private ageError: CustomErrorInfo;
  private customCond: string = CUSTOM_COND;
  private nationalityOption: Array<Option> = [];
  private usersoption: Array<Option> = [];
  private userspermissionoption: Array<Option> = [];

 private passwordError: CustomErrorInfo;
 private emailError: CustomErrorInfo;
private isviewmode = false;
  private assignedroles = [];
  private roledropdownList = [];
  private roledropdownListshow = [];
  selectedroleItems = [];
  dropdownSettings = {};
  permissiondropdownList = [];
  selectedpermissionItems = [];
  private hospitaldata;
  private isaddmode = false;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(private http: HttpClient, private snackbar: MatSnackBar,
    baseService: BaseServices, private _errorService: ErrorService, private el: ElementRef
  ) {
    super(baseService);
    // this.showNav[0] = true;
    //this.hmisApi.getDoctor();
    // this.hmisApi.getDoctorListSearch("");
    // this.hmisApi.getDoctorList();
    // this.hmisApi.getStateList();
    // this.hmisApi.getHospitalSettings("");
    // this.hmisApi.userTypeSearchValuePair("");
    // this.hmisApi.userTypeSearchPermissionValuePair("");
    this.hmisApi.userTypeSearchValuePair("");
  }



  hmisApiSubscribe(data: any): void {
    console.log('main data', data)
    if (data.resulttype === RESULT_TYPE_ADD_USER) {
      console.log('data', data);
      // this.patientId = data.result;
      // this._popUpStateObj.stateData = this.patientId;
      this.snackbar.open('Users added successfully', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      this.compLoadManager.closePopup();
      this.hmisApi.userSearch("");
      // this.genericPopup.openPopup(this.compLoadManager.redirect(RL_REGISTER_CONFIRMATION_MODAL, true));
      // this.stateService.updateState(this._popUpStateObj);
    }
    if (data.resulttype === RESULT_TYPE_GET_ALL_USERSTYPE_VAlUE_PAIR) {
      this.roledropdownList = this.comonService.usersOption(data.result);
      // this.hmisApi.getallrolesbyuserid(this.state.stateData.SID);

    }
    if (data.resulttype === RESULT_TYPE_SET_ROLE_TO_USER) {
      console.log(data);
      // alert('role set to the user ')
      // this.messageService.add({severity:'success', summary:'Success', detail:'role set to the user '});

      this.snackbar.open("role set to the user ", 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      // this.hmisApi.getallrolesbyuserid(this.state.stateData.SID);
    }

    if (data.resulttype === RESULT_TYPE_DELETE_ROLE_FROM_USER) {
      console.log(data);
      // alert('role removed from  the user ')
      // this.messageService.add({severity:'success', summary:'Success', detail:'role removed from  the user '});

      this.snackbar.open("role removed from  the user", 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      // this.hmisApi.getallrolesbyuserid(this.state.stateData.SID);
    }

    

  }

  getrolesofauser(uid) {
    this.hmisApi.getrolesofauserbyid(uid)
      .subscribe((data: any) => {
        console.log('all roles', data);
        if (data === null || data === undefined) {
          console.log('null data')
          // alert('no role provide yet')
          // this.messageService.add({severity:'warn', summary:'Warning', detail:'no role provide yet'});

          this.snackbar.open("no role provide yet", 'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        } else if (data !== null && data !== undefined) {
          console.log('not null data')
          const ids = [];
          data.map((val) => {
            let i = val['role_id'];
            ids.push(i);
            console.log('role ids', ids)
            this.roledropdownList.map((value, index) => {
              if (ids.indexOf(value.value) != -1) {
                this.roledropdownList[index].selected = true;
              } else {
                this.roledropdownList[index].selected = false;
              }
            });
          })

        }
      })
  }






  ngOnInit() {

    this.updateDataForEVMode();
    console.log('currentstate', this.state.currentstate)
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new User();
      this.isaddmode = true;
    }
    if (this.state.currentstate === MODE_EDIT) {
      console.log('get userid'  , this.state)
      this.isaddmode = false;
      // console.log('compdata', this.compData);
      // console.log('stateData', this.state.stateData.SID)
      this.roledropdownList = [];
      this.roledropdownListshow = [];
      this.getrolesofauser(this.state.stateData.SID)

    }
    if (this.state.currentstate === MODE_VIEW) {
      this.isaddmode = true;
      this.isviewmode = true;

      console.log('get userid'  , this.state , this.isaddmode)

      // console.log('compdata', this.compData);
      // console.log('stateData', this.state.stateData.SID)
      this.roledropdownList = [];
      this.roledropdownListshow = [];
      this.getrolesofauser(this.state.stateData.SID)

    }

    this.dropdownSettingss();
    console.log('final state'  , this.state);

  }

  dropdownSettingss() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      // allowSearchFilter: true
    };
  }

  onchangerole(event, rid, item) {
    if(this.state.currentstate === MODE_VIEW){
      // console.log('cant change you are in view mode')
      // this.messageService.add({severity:'warn', summary:'Warning', detail:"Can't set role. you are in view mode"});
      
      // alert("Can't set role. you are in view mode")
      // this.snackbar.open("Can't set role. you are in view mode", 'Close',
      // {
      //   duration: 3000,
      //   verticalPosition: 'top',
      //   horizontalPosition: 'right',
      // });

    }else{
      if (event.target.checked) {
        console.log('usrid' , this.state)
        const roleobj = { user_id: this.state.stateData.SID, role_id: rid }
        console.log('roleobj', roleobj);
        this.hmisApi.setroletouser(roleobj);
  
      } else {
        console.log('usrid' , this.state)
        const roleobj = { user_id: this.state.stateData.SID, role_id: rid }
        this.hmisApi.removeroletouser(roleobj);
      }
    }
   
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log('selected roles', this.selectedroleItems)
    console.log('selected roles', this.selectedroleItems)


  }
  onSelectAll(items: any) {
    console.log(items);
  }
  SubmitClickHandler() {
    console.log('wefn', this.compData)
    console.log('cuurentstate', this.state.currentstate);
    // if (this.state.currentstate === MODE_ADD) {
    //   this.hmisApi.setUser(this.compData);
    // }
    // if (this.state.currentstate === MODE_EDIT) {
    //   // this.hmisApi.userTypeSearchValuePair("");
    // }

  }

  invokeAddFunction(): void {
    console.log('add')
    this.hmisApi.setUser(this.compData);
    //this.setExtnData();
    // this.compData.patient_age = "27";
    // this.compData.patient_age_unit = "month";
    //console.log(this.compData);
    //console.log("compdata ", this.compData);
    // this.hmisApi.setPatient(this.compData);
  }

  invokeEditFunction(): void {
    //this.setExtnData();
    // this.hmisApi.setPatientAsPerId(this.compData.ID, this.compData);
    this.hmisApi.userTypeSearchValuePair("");
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
  


    private customemailCheck(evntObj: any): void {
      console.log(' custom email check', evntObj);
      var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

  
      let to: CustomErrorInfo = new CustomErrorInfo();
      if (!evntObj.newval) {
        to.isErrorShow = true;
        to.fieldStatus = INVALID_FIELD;
        to.data = evntObj;
        to.errorMessage = "Please provide Email."
      } else if (!re.test(evntObj.newval)) {
        to.isErrorShow = true;
        to.fieldStatus = INVALID_FIELD;
        to.data = evntObj;
        to.errorMessage = "Invalid email";
      }
      //  else if ((evntObj.newval).toString().length > 10) {
      //   to.isErrorShow = true;
      //   to.fieldStatus = INVALID_FIELD;
      //   to.data = evntObj;
      //   to.errorMessage = "10 digit exceeds";
      // }
       else {
        to.isErrorShow = false;
        to.fieldStatus = VALID_FIELD;
        to.data = evntObj;
        to.errorMessage = "";
      }
  
      this.emailError = to;
    }

  private custompasswordCheck(evntObj: any): void {
    console.log(' custom person check', evntObj);

    let to: CustomErrorInfo = new CustomErrorInfo();
    if (!evntObj.newval) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Please provide password"
    } else if ((evntObj.newval).toString().length < 7) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Minimum 6 values required";
    } else if ((evntObj.newval).toString().length > 20) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "20 digit exceeds";
    } else {
      to.isErrorShow = false;
      to.fieldStatus = VALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "";
    }

    this.passwordError = to;
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
