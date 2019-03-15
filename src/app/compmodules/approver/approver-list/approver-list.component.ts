import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RESULT_TYPE_DELETE_BUILDING_LIST, RL_BUILDING_LIST, RESULT_TYPE_GET_BUILDING_LIST, RESULT_TYPE_GET_APPROVER_LIST, RL_APPROVER, RESULT_TYPE_GET_APPROVER_SELECT, RESULT_TYPE_DELETE_APPROVER_LIST } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';

@Component({
  selector: 'app-approver-list',
  templateUrl: './approver-list.component.html',
  styleUrls: ['./approver-list.component.scss']
})
export class ApproverListComponent extends BaseComponent implements OnInit, OnDestroy {

  // private building = [];
  // private buildingResource = new DataTableResource([]);
  // private buildingCount = 0;

  private approver = [];
  private approverResource = new DataTableResource([]);
  private approverCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getBuildingSearch("");
    this.hmisApi.getapproverSearch("");
  }
  hmisApiSubscribe(data: any): void {
    // console.log('approve list' , data);
    // if (data.resulttype === RESULT_TYPE_GET_BUILDING_LIST) {
    //   this.building = data.result;
    //   this.buildingResource = new DataTableResource(this.building);
    //   this.buildingResource.count().then(count => {
    //     this.buildingCount = count;
    //   });
    // }

    if (data.resulttype === RESULT_TYPE_DELETE_BUILDING_LIST) {
      this.hmisApi.getBuildingSearch("");
    }
    if (data.resulttype === RESULT_TYPE_GET_APPROVER_LIST) {
      this.approver = data.result;
      this.approverResource = new DataTableResource(this.approver);
      this.approverResource.count().then(count => {
        this.approverCount = count;
      });
    }
    if (data.resulttype === RESULT_TYPE_DELETE_APPROVER_LIST) {
      this.hmisApi.getapproverSearch("");
    }

    
  }


  // reloadBuilding(params) {
  //   this.buildingResource.query(params).then(dtypes => this.building = dtypes);
  // }


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
        this.compLoadManager.redirect(RL_APPROVER);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_APPROVER);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteApproverAsPerId(eventObj.data.ID);
        break;
    }

  }


  private addapprover(): void {
    this.openCompInAddMode(RL_APPROVER);
  }

  ngOnInit() {
    //console.log(films);

  }

}
