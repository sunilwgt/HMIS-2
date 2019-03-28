import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { ActionType, MODE_EDIT, RL_ADMISSION, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, RESULT_TYPE_GET_ADMISSION_TYPE_BY_ID, UPDATE_FIELD_STATE, MODE_ADD, RESULT_TYPE_DELETE_ADMISSION, RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID, MODE_DISCHARGE, MODE_OT, RL_DISEASE_LIST, RL_DISCHARGE_MODAL, RL_BUILDING, RL_OT, MODE_OTHERS, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_APPROVER_DASHBOARD_LIST, RL_APPROVAL_DASHBOARD, RESULT_TYPE_DELETE_APPROVAL_DASHBOARD_LIST, RESULT_TYPE_GET_PENDING_DASHBOARD_LIST, RESULT_TYPE_GET_REJECTED_LIST } from '../../../models/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { State } from '../../../models/state';
import { HelperFunction } from '../../../utils/helper-function.service';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var jsPDF: any;
@Component({
  selector: 'app-Rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})

export class RejectedListComponent extends BaseComponent implements OnInit {
  private rejectedListResource = new DataTableResource([]);
  private rejectedListCount = 0;
  private _subscription: Subscription;
  private _updateStateObj: State;
  private approveddata = [];
  private notapproveddata = [];
  private rejectedlistdata = [];

  
  modalOption: NgbModalOptions;
  private modalRef: NgbModalRef;
  closeResult: any;
  private displaydialog: boolean = false;
  private clickdialog: boolean = false;
  private rowdata: any;

  constructor(baseService: BaseServices,   private modalServices: NgbModal,public datepipe: DatePipe, private helperFunc: HelperFunction) {
    super(baseService);
    // this.hmisApi.getAdmittedPatientList("");
    // this.hmisApi.getHospitalSettings("");
    // this.hmisApi.getPendingDashboardList(" ");
    this.hmisApi.getrejectedList(" ");



  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_REJECTED_LIST) {
      this.rejectedlistdata = [];
      this.rejectedlistdata = data.result;
      this.rejectedListResource = new DataTableResource(this.rejectedlistdata);
      this.rejectedListResource.count().then(count => {
        this.rejectedListCount = count;
      });
      const para = { offset: 0, limit: 15 }
      this.reloadrejectedlist(para);
    }
    if (data.resulttype === RESULT_TYPE_DELETE_APPROVAL_DASHBOARD_LIST) {
    }


  }
  reloadrejectedlist(params) {
    this.rejectedListResource.query(params).then(rejectedlistdata => this.rejectedlistdata = rejectedlistdata);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };


  ongridclick(e, con) {
    if (this.clickdialog === false) {
      this.displaydialog = true;
      this.rowdata = e.row.item;
      this.open(con)
    }
  }

  open(content) {
    this.modalRef = this.modalServices.open(content, { size: 'lg' })
  }
  closemodal(reason) {
    this.modalRef.close()
  }




 
  private clickEventHandler(eventObj: ActionType): void {

    this.clickdialog = true;
    setInterval(() => {
      this.clickdialog = false;
    }, 1);

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
