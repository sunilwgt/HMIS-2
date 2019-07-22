import { Component, OnInit } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Option, RadioData, PackageOption, GET_SELECTED_ITEMS, MODE_ADD, MODE_EDIT, MODE_VIEW, RL_DEPARTMENT, RL_DEPARTMENT_LIST, RESULT_TYPE_GET_DEPARTMENT_TYPE, RESULT_TYPE_SET_DEPARTMENT_TYPE, RESULT_TYPE_EDIT_DEPARTMENT_TYPE, RESULT_TYPE_EDIT_DEPARTMENT,RESULT_TYPE_GET_DEPARTMENT_TYPE_LIST,RESULT_TYPE_GET_DEPARTMENT_TYPE_DROPDOWN } from '../../models/common';
import { Department, DepartmentOption } from '../../models/department';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent extends BaseComponent implements OnInit {

  private _tempData: Department;
  private departmentType = [];
  private departmentOption: Array<DepartmentOption> = [];
  private created_by: any;
  private modified_by: any;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = false;
   // this.hmisApi.getDetpartmentType();
    this.hmisApi.getDepartmentTypeDropdown();
  }

  hmisApiSubscribe(data: any): void {

    if (data.resulttype === RESULT_TYPE_SET_DEPARTMENT_TYPE || data.resulttype === RESULT_TYPE_EDIT_DEPARTMENT) {
      this.compLoadManager.redirect(RL_DEPARTMENT_LIST);
      this.hmisApi.getDetpartmentList("");
      this.compLoadManager.closePopup();
    }

    if(data.resulttype === RESULT_TYPE_GET_DEPARTMENT_TYPE_DROPDOWN){
      this.departmentOption = this.comonService.departmentTypeOption(data.result);
    }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Department();
    }
  }

  /**
  public valueChangeHandler(evt: CompDataInfo): void {
    super.valueChangeHandler(evt);
    //TODO write your own code
  }
  */

  invokeAddFunction(): void {
    this.hmisApi.setDepartment(this.compData);
  }

  invokeEditFunction(): void {
    //console.log(this.compData)
    this.hmisApi.setDepartmentAsPerId(this.compData.ID, this.compData);
  }


}
