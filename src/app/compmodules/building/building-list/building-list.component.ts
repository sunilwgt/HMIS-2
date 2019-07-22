import { Component, OnInit, OnDestroy,EventEmitter, Output } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RESULT_TYPE_DELETE_BUILDING_LIST, RL_BUILDING_LIST, RESULT_TYPE_GET_BUILDING_LIST, EDIT, RL_DOCTOR, VIEW, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private building = [];
  private buildingResource = new DataTableResource([]);
  private buildingCount = 0;

  constructor(private baseService: BaseServices) {
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

  // private clickEventHandler(eventObj: ActionType): void {
  //   switch (eventObj.mode) {
  //     case MODE_EDIT:
  //       this.compLoadManager.redirect(RL_BUILDING);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_BUILDING);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteBuildingAsPerId(eventObj.data.ID);
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
        this.compLoadManager.redirect(RL_BUILDING);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_BUILDING);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteBuildingAsPerId(item.ID);
        break;
    }
  }


  private addBuilding(): void {
    this.openCompInAddMode(RL_BUILDING);
  }

  ngOnInit() {
   
   this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);
  
  
  
    //console.log(films);
  }

}
