import { Component, OnInit, OnDestroy,EventEmitter, Output } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RL_BILLING, RESULT_TYPE_GET_BILLING_LIST, RL_DELETE_CONFIRMATION_MODAL, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_ADVANCE_BILLING, MODE_OTHERS, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID, RESULT_TYPE_GET_PATIENT_DETAILS_FOR_OT, RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST, RESULT_TYPE_GET_EXTERNAL_BILLING, MODE_ADD, RESULT_TYPE_GET_APPROVAl_LIST, RL_APPROVAL, RESULT_TYPE_DELETEAPPROVAL_LIST, EDIT, VIEW, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';
import { HelperFunction } from '../../../utils/helper-function.service';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { DatePipe } from '@angular/common';
import { Billing } from '../../../models/opd';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.scss']
})
export class ApprovalListComponent extends BaseComponent implements OnInit, OnDestroy {
    
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private billing = [];
  private billingResource = new DataTableResource([]);
  private billingCount = 0;

  private Approval = [];
  private ApprovalResource = new DataTableResource([]);
  private approvalCount = 0;

  private patient: any;
  private item = [];
  private totalAdvance: number = 0;
  private finalAmount: number = 0;
  private eventData: any;
  private patientData: any = new Billing();

  constructor(private baseService: BaseServices, private helperFunc: HelperFunction, public datepipe: DatePipe) {
    super(baseService);
    this.hmisApi.getBillingSearch("");
    this.hmisApi.getApprovalSearch("");

  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_BILLING_LIST) {
      this.billing = data.result;
      this.billingResource = new DataTableResource(this.billing);
      this.billingResource.count().then(count => {
        this.billingCount = count;
      });
    } 

    if (data.resulttype === RESULT_TYPE_GET_APPROVAl_LIST) {
      this.Approval = data.result;
      this.ApprovalResource = new DataTableResource(this.Approval);
      this.ApprovalResource.count().then(count => {
        this.approvalCount = count;
      });
    } 
    // if (data.resulttype === RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST) {
    //   console.log(data.result);
    //   this.patient = data.result[0];
    //   this.compLoadManager.redirect(RL_BILLING);
    // }

    if (data.resulttype === RESULT_TYPE_DELETEAPPROVAL_LIST) {
   this.hmisApi.getApprovalSearch("");
    } 
  }

  
  reloadBilling(params) {
    this.billingResource.query(params).then(dtypes => this.billing = dtypes);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  // private createBillingData(data: any) {
  //   this.hmisApi.getDischargePatientList(data.admission_sequence);
  //   if (this.patient != undefined) {
  //     data.bed_number = this.patient.bed_number;
  //     data.doctor_name = this.patient.doctor_name;
  //     var dischargeDate = data.discharge_date == null ? " " : this.patient.discharge_date.split("T");
  //     data.discharge_date = dischargeDate[0];
  //     //var patientDob = this.patient.patient_dob.split("T");
  //     //data.patient_age = this.helperFunc.getCalculatedAge(patientDob);
  //     data.patient_age = this.patient.patient_age;
  //     data.patient_sex = this.patient.patient_sex;
  //     data.patient_address = this.patient.patient_address;
  //    // var createdOn = this.patient.created_on.split("T");
  //    // data.admitted_on = createdOn[0];
  //     data.IsDisabled = true;
  //    // this.compLoadManager.redirect(RL_BILLING);
  //    // this.hmisApi.getAdvanceBillingData(data.patient_id, data.admission_id, "00000000-0000-0000-0000-000000000000");

  //     this.compLoadManager.redirect(RL_BILLING);

  //   }
  //   console.log("dddddddddddddddddddddddd",data)

  // }
  // private clickEventHandler(eventObj: ActionType): void {
  //   // console.log('eventobj' , eventObj);
  //   switch (eventObj.mode) {
  //     case MODE_EDIT:
  //       this.compLoadManager.redirect(RL_APPROVAL);
  //       break;
  //     case MODE_VIEW:
  //       //this.hmisApi.getDischargePatientList(eventObj.data.admission_sequence);
  //       this.compLoadManager.redirect(RL_APPROVAL);
  //       break;
  //     case MODE_DELETE:
  //       this.hmisApi.deleteApprovalAsPerId(eventObj.data.ID);
  //       break;
  //     case MODE_OTHERS:
  //       this.eventData = eventObj.data;
  //       break;
  //   }
  // }



  


 private clickEventHandler(eventObj: ActionType, mode, item): void {
  console.log('eventObj', eventObj, mode, item);
  switch (mode) {
    case MODE_EDIT:
      this._stateObj.currentstate = EDIT;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_EDIT;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
      this.compLoadManager.redirect(RL_APPROVAL);
      break;

    case MODE_VIEW:
      this._stateObj.currentstate = VIEW;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_VIEW;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
      this.compLoadManager.redirect(RL_APPROVAL);
      break;

    case MODE_DELETE:
      this._stateObj.currentstate = DELETE;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_DELETE;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
      this.hmisApi.deleteApprovalAsPerId(item.ID);
      break;
  }
}











  private addapproval(): void {
    this.openCompInAddMode(RL_APPROVAL);

  }

  ngOnInit() {

this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);


    //console.log(films);
  }

}
