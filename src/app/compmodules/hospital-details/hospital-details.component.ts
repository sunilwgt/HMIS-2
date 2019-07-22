import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { MODE_ADD, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, HOSPITAL_MODE_STATE, MODE_EDIT, RESULT_TYPE_SET_HOSPITAL_DETAIL, UPDATE_FIELD_DATA_STATE, GenericPopupOption, RL_SAVE_MESSAGE_MODAL, RESULT_TYPE_EDIT_HOSPITAL_DETAIL, RESULT_ERROR, RL_DASHBOARD, CustomErrorInfo, CUSTOM_COND, INVALID_FIELD, VALID_FIELD } from '../../models/common';
import { HospitaDetail } from '../../models/hospitadetail';
import { State,RegisterState } from '../../models/state';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GenericPopup } from '../../generic-components/generic-popup';
import { ComponentModule } from '../../enums/component-module.enum';
import { MatSnackBar } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalDetailsComponent extends BaseComponent implements OnInit {

  @ViewChild(GenericPopup)
  private genericPopup: GenericPopup;

  private stateObj: State;
  private updateDataState: State;
  private modaloption: NgbModalOptions;
  private datapresent = false;
 private phoneError: CustomErrorInfo;
 private emailError: CustomErrorInfo;

 private customCond: string = CUSTOM_COND;
 private customCondemail: string = CUSTOM_COND;



  //private compData:any;

  constructor(baseService: BaseServices , private snackbar:MatSnackBar) {
    super(baseService);
    //this.state = this.stateService.createState();
    // this.hmisApi.getHospitalSettings("");

    // this.stateObj = this.stateService.createState(HOSPITAL_MODE_STATE);
    // this.updateDataState = this.stateService.createState(UPDATE_FIELD_DATA_STATE);
    // this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {

        this.stateObj = this.stateService.createState(HOSPITAL_MODE_STATE);
        this.compData = data.result[0];
        this.stateObj.currentstate = MODE_EDIT;
        console.log('compdata' , this.compData);
        this.datapresent = true;
       
       if(this.state === undefined){
         this.state = this.stateObj;
       } 
        this.state.stateData = (this.compData === undefined ? this.state.stateData: this.compData);
        setTimeout(() => {
          super.updateBtnState(this.stateObj);
          this.stateService.updateState(this.updateDataState);
          this.compData = this.state.stateData;
        }, 600);
        this.updateDataForEVMode();
      }

    if(data.resulttype === RESULT_ERROR){
      if(this.stateObj === undefined || this.stateObj.currentstate === undefined){
        this.stateObj = this.stateService.createState(HOSPITAL_MODE_STATE);
        this.stateObj.currentstate = MODE_ADD;
      }
      this.compData = new HospitaDetail();
    }

     if (data.resulttype === RESULT_TYPE_SET_HOSPITAL_DETAIL || data.resulttype === RESULT_TYPE_EDIT_HOSPITAL_DETAIL) {
      this.hmisApi.getHospitalSettings("");
      this.snackbar.open('Hospital Details Updated', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      this.compLoadManager.closePopup();
      // this.compLoadManager.redirect(RL_DASHBOARD)
      // this.compLoadManager.loadComponent(DashboardComponent)

    }

  }

  ngOnInit() { 
    this.hmisApi.getHospitalSettings("");
    
    this.stateObj = this.stateService.createState(HOSPITAL_MODE_STATE);
    this.updateDataState = this.stateService.createState(UPDATE_FIELD_DATA_STATE);
    this.defaultvalidation = true;

  }

  invokeAddFunction(): void {
    this.stateObj.stateData = this.compData;
    console.log('state' , this.stateObj)

    if (this.stateObj.currentstate === MODE_ADD) {
      this.hmisApi.setHospitalSettings(this.compData);
    } else {
      this.hmisApi.setHospitalDetailAsPerId(this.compData.ID, this.compData);
    }

  

  }

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
    } else if ((evntObj.newval).toString().length > 13) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "12 digit exceeds";
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
      to.errorMessage = "Invalid Email";
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
    console.log('emailerror' , this.emailError)
  }

}
