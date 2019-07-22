import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { State } from '../../../models/state';
import { RESULT_TYPE_GET_WARD, RL_WARD_TYPE, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_WARD_TYPE_LIST, RESULT_TYPE_DELETE_WARD_TYPE, EDIT, VIEW, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';

@Component({
  selector: 'app-ward-type-list',
  templateUrl: './ward-type-list.component.html',
  styleUrls: ['./ward-type-list.component.scss']
})
export class WardTypeListComponent extends BaseComponent implements OnInit {
  private wardtype = [];
  private wardtypeResource = new DataTableResource([]);
  private wardtypeCount = 0;
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getWardTypeSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_WARD_TYPE_LIST) {
      this.wardtype = data.result;
      this.wardtypeResource = new DataTableResource(this.wardtype);
      this.wardtypeResource.count().then(count => {
        this.wardtypeCount = count;
      });
    }
    if (data.resulttype === RESULT_TYPE_DELETE_WARD_TYPE) {
      this.hmisApi.getWardTypeSearch("");
    }
  }



  reloadWardType(params) {
    this.wardtypeResource.query(params).then(wtypes => this.wardtype = wtypes);

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
  //       this.compLoadManager.redirect(RL_WARD_TYPE);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_WARD_TYPE);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteWardType(eventObj.data.ID);
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
        this.compLoadManager.redirect(RL_WARD_TYPE);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_WARD_TYPE);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteWardType(item.ID);
        break;
    }
  }







  private addWardType(): void {
    this.openCompInAddMode(RL_WARD_TYPE);
  }


  ngOnInit() {
    

this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);


    //console.log(films);
  }
}
