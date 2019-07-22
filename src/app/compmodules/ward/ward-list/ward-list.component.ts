import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { ActionType, RESULT_TYPE_GET_WARD_LIST, MODE_EDIT, RL_WARD, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_FLOOR, RESULT_TYPE_DELETE_WARD, DELETE, VIEW, EDIT, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';

@Component({
  selector: 'app-ward-list',
  templateUrl: './ward-list.component.html',
  styleUrls: ['./ward-list.component.scss']
})
export class WardListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private ward = [];
  private wardResource = new DataTableResource([]);
  private wardCount = 0;

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getWardSearch("");

  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_WARD_LIST) {
      this.ward = data.result;
      this.wardResource = new DataTableResource(this.ward);
      this.wardResource.count().then(count => {
        this.wardCount = count;
      });
    }
    if (data.resulttype === RESULT_TYPE_DELETE_WARD) {
      this.hmisApi.getWardSearch("");
    }
  }

  reloadWard(params) {
    this.wardResource.query(params).then(wtypes => this.ward = wtypes);
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
  //       this.compLoadManager.redirect(RL_WARD);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_WARD);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteWard(eventObj.data.ID);
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
        this.compLoadManager.redirect(RL_WARD);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_WARD);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteWard(item.ID);
        break;
    }
  }


  private addWard(): void {
    this.openCompInAddMode(RL_WARD);
  }

  ngOnInit() {

  
   this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);
  
    //console.log(films);
  }

}

