import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { RL_DEPARTMENT_TYPE, RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT_TYPE, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_DEPARTMENT_TYPE_LIST, RESULT_TYPE_DELETE_DEPARTMENT_TYPE, RL_DEPARTMENT_LIST, RL_DEPARTMENT_TYPE_LIST } from '../../../models/common';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-type-list.component.html',
  styleUrls: ['./department-type-list.component.scss']
})
export class DepartmentTypeListComponent extends BaseComponent implements OnInit {

  private departmenttype = [];
  private departmentTypeResource = new DataTableResource([]);
  private departmentTypeCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getDetpartmentTypeList("");

  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_DEPARTMENT_TYPE_LIST) {
      this.departmenttype = data.result;
      this.departmentTypeResource = new DataTableResource(this.departmenttype);
      this.departmentTypeResource.count().then(count => {
        this.departmentTypeCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_DEPARTMENT_TYPE) {
      this.hmisApi.getDetpartmentTypeList("");
      this.compLoadManager.redirect(RL_DEPARTMENT_TYPE_LIST);
    }
  }

  reloadDepartments(params) {
    this.departmentTypeResource.query(params).then(dtypes => this.departmenttype = dtypes);
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
        this.compLoadManager.redirect(RL_DEPARTMENT_TYPE);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_DEPARTMENT_TYPE);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteDepartmentType(eventObj.data.ID);
        break;
    }
  }

  private addDepartmentType(): void {
    this.openCompInAddMode(RL_DEPARTMENT_TYPE);
  }

  ngOnInit() {
    //console.log(films);
  }


}
