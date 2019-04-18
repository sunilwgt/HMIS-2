import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Registration, DOB, CompDataInfo } from '../../models/registration';
import { Option, RadioData, MODE_ADD, RESULT_TYPE_GET_DEPARTMENT_AS_PER_TYPE, RESULT_TYPE_GET_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT_TYPE, RESULT_TYPE_GET_DOCTOR, UPDATE_FIELD_STATE, RESULT_TYPE_SET_DOCTOR, RL_DOCTOR_LIST, RESULT_TYPE_EDIT_DOCTOR, RESULT_TYPE_GET_DEPARTMENT_TYPE_LIST, RESULT_TYPE_GET_DEPARTMENT_TYPE_DROPDOWN, MODE_EDIT } from '../../models/common';
import { Department, DepartmentOption, DepartmentTypeOption } from '../../models/department';
import { Subscription } from 'rxjs';
import { Doctor } from '../../models/opd';
import { HmisApisService } from '../../services/hmis-apis.service';
import { StateService } from '../../services/state.service';
import { CompLoadManagerService } from '../../utils/computils/comp-load-manager.service';
import { CommonService } from '../../services/common.service';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { State } from '../../models/state';




@Component({
  selector: 'hmis-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorComponent extends BaseComponent implements OnInit {
  private genderOptions: Array<RadioData>;
  private status: Array<RadioData>;
  private departmentOption: Array<DepartmentOption> = [];
  private departmentTypeOption: Array<DepartmentTypeOption> = [];
  private _updateStateObj: State;
  private _popUpStateObj: State;
  static readonly DEPARTMENT_TYPE_KEY: string = "department_type";
  constructor(baseService: BaseServices) {
    super(baseService);
    //this.hmisApi.getDetpartmentType();
    //this.hmisApi.getDetpartmentTypeList("");
    this.hmisApi.getDepartmentTypeDropdown();
    this.hmisApi.getDoctor();
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_DOCTOR) {
      this.compLoadManager.redirect(RL_DOCTOR_LIST);
      this.hmisApi.getDoctorListSearch("");
      this.compLoadManager.closePopup();
    }
    if (data.resulttype === RESULT_TYPE_EDIT_DOCTOR) {
      this.compLoadManager.redirect(RL_DOCTOR_LIST);
      this.hmisApi.getDoctorListSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_GET_DEPARTMENT_TYPE_DROPDOWN) {
      this.departmentTypeOption = this.comonService.departmentTypeOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_GET_DEPARTMENT_AS_PER_TYPE) {
      this.departmentOption = this.comonService.departmentOption(data.result);
    }
  }
  // private submitClickHandler(): void {
  //   if (Object.keys(this.compData).length > 0) {
  //     this.compData.created_by = this.hmisApi.userDetail.created_by;
  //     this.compData.modified_by = this.hmisApi.userDetail.modified_by;
  //     switch (this.state.currentstate) {
  //       case MODE_ADD:
  //         console.log(this.compData);
  //         this.hmisApi.setDoctor(this.compData);
  //         break;
  //     }
  //   }
  // }
  invokeAddFunction(): void {
    this.hmisApi.setDoctor(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setDoctorAsPerId(this.compData.ID, this.compData);
  }
  protected valueChangeHandler(evt: CompDataInfo): any {
    if (evt.propname === "phone_number1") {
      this.compData[evt.propname] = '"' + evt.newval + '"';
    } else if (evt.propname === "phone_number2") {
      this.compData[evt.propname] = '"' + evt.newval + '"';
    } else {
      this.compData[evt.propname] = evt.newval;
    }
    if (evt.propname === DoctorComponent.DEPARTMENT_TYPE_KEY) {
      this.hmisApi.getDepartmentAsPerType(evt.newval);
    }
  }

  ngOnInit() {
    if (this.state.currentstate === MODE_EDIT) {
      this.hmisApi.getDepartmentAsPerType(this.state.stateData.department_type);
    }
    // this.compData = new Doctor();
    this.genderOptions = this.comonService.genderOptions;
    this.status = this.comonService.status;
    // this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    // this._popUpStateObj = this.stateService.createState(PATIENT_ID_STATE);
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Doctor();
    }
  }
}
