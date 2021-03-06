import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { RL_DEPARTMENT, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT_TYPE, ADD, RESULT_TYPE_GET_DEPARTMENT_LIST, RESULT_TYPE_DELETE_DEPARTMENT, RL_DEPARTMENT_LIST, EDIT, DELETE, VIEW, ACTION_BUTTON_STATE } from '../../../models/common';
import { DepartmentOption } from '../../../models/department';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { State } from '../../../models/state';



@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State;
  // private _subscription: Subscription;
  private departments = [];
  private departmentOption: Array<DepartmentOption> = [];
  private departmentResource = new DataTableResource([]);
  private departmentCount = 0;

  

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getDetpartmentList("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_DEPARTMENT_LIST) {
      this.departments = data.result;
      this.departmentResource = new DataTableResource(this.departments);
      this.departmentResource.count().then(count => {
        this.departmentCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_GET_DEPARTMENT_TYPE) {
      this.departmentOption = this.comonService.departmentTypeOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_DELETE_DEPARTMENT) {
      this.hmisApi.getDetpartmentList("");
      this.compLoadManager.redirect(RL_DEPARTMENT_LIST);
    }
  }


  reloadDepartments(params) {
    this.departmentResource.query(params).then(dtypes => this.departments = dtypes);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  // private clickEventHandler(eventObj: ActionType): void {
  //   switch (eventObj.mode) {
  //     case MODE_EDIT:
  //       this.compLoadManager.redirect(RL_DEPARTMENT);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_DEPARTMENT);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteDepartment(eventObj.data.ID);
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
        this.compLoadManager.redirect(RL_DEPARTMENT);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_DEPARTMENT);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteDepartment(item.ID);
        break;
    }
  }

  private addDepartment(): void {
    this.openCompInAddMode(RL_DEPARTMENT)
  }

  ngOnInit() {
    this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);

    //console.log(films);
  }



}
