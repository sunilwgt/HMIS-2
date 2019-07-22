import { Component, OnInit } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Registration, DOB, CompDataInfo, PatientExt } from '../../models/registration';
import { Option, RadioData, RESULT_TYPE_SET_PATIENT, RESULT_TYPE_EDIT_PATIENT, RESULT_TYPE_GET_DEPARTMENT, MODE_ADD, MODE_EDIT, MODE_VIEW, RL_DEPARTMENT_TYPE_LIST, RESULT_TYPE_SET_DEPARTMENT_TYPE, RESULT_TYPE_EDIT_DEPARTMENT_TYPE } from '../../models/common';
import { CompLoadManagerService } from '../../utils/computils/comp-load-manager.service';
import { DepartmentType, DepartmentTypeOption } from '../../models/department';
import { UserDetail } from '../../models/userole';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';



@Component({
  selector: 'app-department-type',
  templateUrl: './department-type.component.html',
  styleUrls: ['./department-type.component.scss']
})
export class DepartmentTypeComponent extends BaseComponent implements OnInit {

  private _tempData: DepartmentType;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = false;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_DEPARTMENT_TYPE || data.resulttype === RESULT_TYPE_EDIT_DEPARTMENT_TYPE) {
      this.compLoadManager.redirect(RL_DEPARTMENT_TYPE_LIST);
      this.hmisApi.getDetpartmentTypeList("");
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new DepartmentType();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setDepartmentType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setDepartmentTypeAsPerId(this.compData.ID, this.compData);
  }

}
