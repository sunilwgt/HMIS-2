import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { RESULT_TYPE_GET_DISCHARGE_TYPE, ActionType, MODE_EDIT, MODE_VIEW, RL_DISCHARGE_TYPE, MODE_DELETE, RESULT_TYPE_GET_DISCHARGE_TYPE_LIST, RESULT_TYPE_DELETE_DISCHARGE_TYPE, EDIT, VIEW, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';

@Component({
  selector: 'app-discharge-type-list',
  templateUrl: './discharge-type-list.component.html',
  styleUrls: ['./discharge-type-list.component.scss']
})
export class DischargeTypeListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private dischargetype = [];
  private dischargetypeResource = new DataTableResource([]);
  private dischargetypeCount = 0;

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getDischargeTypeSearch("");
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_DISCHARGE_TYPE_LIST) {
      this.dischargetype = data.result;
      this.dischargetypeResource = new DataTableResource(this.dischargetype);
      this.dischargetypeResource.count().then(count => {
        this.dischargetypeCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_DISCHARGE_TYPE) {
      this.hmisApi.getDischargeTypeSearch("");
    }
  }

  reloadDischargeType(params) {
    this.dischargetypeResource.query(params).then(dtypes => this.dischargetype = dtypes);

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
  //       this.compLoadManager.redirect(RL_DISCHARGE_TYPE);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_DISCHARGE_TYPE);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteDischargeType(eventObj.data.ID);
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
        this.compLoadManager.redirect(RL_DISCHARGE_TYPE);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_DISCHARGE_TYPE);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteDischargeType(item.ID);
        break;
    }
  }









  private addDischargeType(): void {
    this.openCompInAddMode(RL_DISCHARGE_TYPE);
  }

  ngOnInit() {

 
   this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);
  
  
    //console.log(films);
  }
}
