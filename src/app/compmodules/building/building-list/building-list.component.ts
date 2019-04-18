import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RESULT_TYPE_DELETE_BUILDING_LIST, RL_BUILDING_LIST, RESULT_TYPE_GET_BUILDING_LIST } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent extends BaseComponent implements OnInit, OnDestroy {

  private building = [];
  private buildingResource = new DataTableResource([]);
  private buildingCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getBuildingSearch("");
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_BUILDING_LIST) {
      this.building = data.result;
      this.buildingResource = new DataTableResource(this.building);
      this.buildingResource.count().then(count => {
        this.buildingCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_BUILDING_LIST) {
      this.hmisApi.getBuildingSearch("");
    }
  }


  reloadBuilding(params) {
    this.buildingResource.query(params).then(dtypes => this.building = dtypes);
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
        this.compLoadManager.redirect(RL_BUILDING);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_BUILDING);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteBuildingAsPerId(eventObj.data.ID);
        break;
    }

  }


  private addBuilding(): void {
    this.openCompInAddMode(RL_BUILDING);
  }

  ngOnInit() {
    //console.log(films);
  }

}
