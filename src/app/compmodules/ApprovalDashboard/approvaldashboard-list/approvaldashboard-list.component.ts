import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { ActionType, MODE_EDIT, RL_ADMISSION, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, RESULT_TYPE_GET_ADMISSION_TYPE_BY_ID, UPDATE_FIELD_STATE, MODE_ADD, RESULT_TYPE_DELETE_ADMISSION, RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID, MODE_DISCHARGE, MODE_OT, RL_DISEASE_LIST, RL_DISCHARGE_MODAL, RL_BUILDING, RL_OT, MODE_OTHERS, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_APPROVER_DASHBOARD_LIST, RL_APPROVAL_DASHBOARD, RESULT_TYPE_DELETE_APPROVAL_DASHBOARD_LIST, RESULT_TYPE_GET_PENDING_DASHBOARD_LIST } from '../../../models/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { State } from '../../../models/state';
import { HelperFunction } from '../../../utils/helper-function.service';
declare var jsPDF: any;
@Component({
  selector: 'app-approvaldashboard-list',
  templateUrl: './approvaldashboard-list.component.html',
  styleUrls: ['./approvaldashboard-list.component.scss']
})

export class ApprovalDashboardListComponent extends BaseComponent implements OnInit {
  private approvalListResource = new DataTableResource([]);
  private approvalListCount = 0;
  private _subscription: Subscription;
  private _updateStateObj: State;
  private approveddata = [];
  private notapproveddata = [];
  private approvaldashboiardlistdata = [];
  constructor(baseService: BaseServices, public datepipe: DatePipe, private helperFunc: HelperFunction) {
    super(baseService);
    // this.hmisApi.getAdmittedPatientList("");
    // this.hmisApi.getHospitalSettings("");
    this.hmisApi.getPendingDashboardList(" ");

  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_APPROVER_DASHBOARD_LIST) {
      this.approvaldashboiardlistdata = [];
      for (let d of data.result) {
        if (d.approval_status_name === 'Approved') {
        } else {
          this.approvaldashboiardlistdata.push(d);
        }
      }
      this.approvalListResource = new DataTableResource(this.approvaldashboiardlistdata);
      this.approvalListResource.count().then(count => {
        this.approvalListCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_GET_PENDING_DASHBOARD_LIST) {
      // console.log('pending data ' , data.result);
      this.approvaldashboiardlistdata = [];
      this.approvaldashboiardlistdata = data.result;
      this.approvalListResource = new DataTableResource(this.approvaldashboiardlistdata);
      this.approvalListResource.count().then(count => {
        this.approvalListCount = count;
      });
      const para = { offset: 0, limit: 15 }
      this.reloadapprovaldashboiardlist(para);
    }

    if (data.resulttype === RESULT_TYPE_DELETE_APPROVAL_DASHBOARD_LIST) {
    }
    
  }
  reloadapprovaldashboiardlist(params) {
    this.approvalListResource.query(params).then(approvaldashboiardlistdata => this.approvaldashboiardlistdata = approvaldashboiardlistdata);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  private clickEventHandler(eventObj: ActionType): void {
    switch (eventObj.mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_APPROVAL_DASHBOARD);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_APPROVAL_DASHBOARD);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteApproverDashboardList(eventObj.data.ID);
        break;

      case MODE_ADD:
        this.stateService.stateData = eventObj.data;
        this.compLoadManager.redirect(RL_APPROVAL_DASHBOARD);
        break;
    }
  }

  ngOnInit() {
    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
  }

  
}
