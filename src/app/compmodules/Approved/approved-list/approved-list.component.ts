import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { ActionType, MODE_EDIT, RL_ADMISSION, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, RESULT_TYPE_GET_ADMISSION_TYPE_BY_ID, UPDATE_FIELD_STATE, MODE_ADD, RESULT_TYPE_DELETE_ADMISSION, RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID, MODE_DISCHARGE, MODE_OT, RL_DISEASE_LIST, RL_DISCHARGE_MODAL, RL_BUILDING, RL_OT, MODE_OTHERS, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_APPROVER_DASHBOARD_LIST, RESULT_TYPE_GET_APPROVED_DASHBOARD_LIST } from '../../../models/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { State } from '../../../models/state';
import { HelperFunction } from '../../../utils/helper-function.service';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var jsPDF: any;
@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.scss']
})

export class ApprovedListComponent extends BaseComponent implements OnInit {



  modalOption: NgbModalOptions;
  private modalRef: NgbModalRef;
  closeResult: any;
  private displaydialog: boolean = false;
  private clickdialog: boolean = false;
  private rowdata: any;

  private admissionList = [];
  private admissionListResource = new DataTableResource([]);
  private admissionListCount = 0;

  private approvedlListResource = new DataTableResource([]);
  private approvedListCount = 0;

  private patientDetails = [];
  private admittedPatientDetails = [];
  private _subscription: Subscription;
  public patientName = [];
  public doctorArray = [];
  private _updateStateObj: State;
  private hospitaldata;
  private patient_registration_no: string;
  private approveddata = [];
  private notapproveddata = [];




  constructor(baseService: BaseServices, private modalServices: NgbModal, public datepipe: DatePipe, private helperFunc: HelperFunction) {
    super(baseService);
    // this.hmisApi.getAdmittedPatientList("");
    // this.hmisApi.getHospitalSettings("");
    this.hmisApi.getApprovedDashboardList("");

  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_ADMITTED_PATIENT_LIST) {
      this.admissionList = data.result;
      this.arrangeAdmittedPatientData(data.result);
      this.admissionListResource = new DataTableResource(this.admissionList);
      this.admissionListResource.count().then(count => {
        this.admissionListCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_ADMISSION) {
      this.hmisApi.getAdmittedPatientList("");
    }

    if (data.resulttype === RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID) {
      this.compLoadManager.redirect(RL_ADMISSION);
    }
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
    }

    if (data.resulttype === RESULT_TYPE_GET_APPROVED_DASHBOARD_LIST) {
      // this.hospitaldata = data.result[0];
      this.approveddata = [];
      this.approveddata = data.result;
      //   this.notapproveddata = [];
      // for(let d of data.result){
      //  if(d.approval_status_name === 'Approved'){
      // this.approveddata.push(d);
      //  }else{
      //   this.notapproveddata.push(d);
      //  }
      this.approvedlListResource = new DataTableResource(this.approveddata);
      this.approvedlListResource.count().then(count => {
        this.approvedListCount = count;
      });
      const para = { offset: 0, limit: 15 }
      this.reloadapprovedList(para);
    }
  }


  reloadapprovedList(params) {
    // console.log('paramss', params);
    this.approvedlListResource.query(params).then(approveddata => this.approveddata = approveddata);
  }



  private arrangeAdmittedPatientData(result) {
    for (let key in result) {
      var dateOfAdmission = this.admissionList[key].created_on.split("T");
      this.admissionList[key]['admitted_on'] = this.datepipe.transform(dateOfAdmission[0], 'dd-MM-yyyy');
      this.admissionList[key]['patient_name'] = this.admissionList[key].patient_first_name + ' ' + this.admissionList[key].patient_last_name;
      var patientDob = this.admissionList[key].patient_dob === null ? " " : this.admissionList[key].patient_dob.split("T");
      this.admissionList[key]['patient_age'] = this.helperFunc.getCalculatedAge(patientDob[0]);
      //var bedNumber = this.admissionList[key].bed_number.split("-");
      /// this.admissionList[key]['bed_number'] = bedNumber[2];
      //this.admissionList[key].ward_number = this.admissionList[key].ward_name;
      // this._updateStateObj.currentstate = 'ward_number';
      // this._updateStateObj.stateData = this.admissionList;
      // this.stateService.updateState(this._updateStateObj);
    }
  }

  // reloadAdmittedPatientsList(params) {
  //   this.admissionListResource.query(params).then(admissionList => this.admissionList = admissionList);
  // }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };
  public getColor(name) {
    // console.log('name' , name);
    // return name === 'Raman' ? "green" : "red";
  }


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
        this.compLoadManager.redirect(RL_ADMISSION);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_ADMISSION);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteAdmittedPatient(eventObj.data.ID);
        break;

      case MODE_ADD:
        this.stateService.stateData = eventObj.data;
        this.compLoadManager.redirect(RL_DISCHARGE_MODAL);
        break;

      case MODE_OT:
        this.hmisApi.getPatientDetailsForOTOnSearchId(eventObj.data.ID);
        this.compLoadManager.redirect(RL_OT)
        break;
      case MODE_OTHERS:
        // this.comonService.createPdfStructure(eventObj.data, "ADMISSION");
        // this.createPdfStructureofadmission(eventObj.data, "ADMISSION");

        break;

    }

  }


  private addAdmission(): void {
    this.state.currentstate = MODE_ADD;
    this.compLoadManager.redirect(RL_ADMISSION);
  }

  ngOnInit() {
    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    // this.hmisApi.getApproverDashboardList( this.hmisApi.userDetail.uid, "");

  }



}
