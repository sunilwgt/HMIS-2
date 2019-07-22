import { Component, OnInit, OnDestroy,EventEmitter, Output } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { RESULT_TYPE_GET_OPERATION_TYPE, ActionType, MODE_EDIT, RL_OPERATION_TYPE, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_OPERATION_TYPE_LIST, RESULT_TYPE_DELETE_OPERATION_TYPE, EDIT, VIEW, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';

@Component({
  selector: 'app-operation-type-list',
  templateUrl: './operation-type-list.component.html',
  styleUrls: ['./operation-type-list.component.scss']
})
export class OperationTypeListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private operationtype = [];
  private operationtypeResource = new DataTableResource([]);
  private operationtypeCount = 0;

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getOperationTypeSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_OPERATION_TYPE_LIST) {
      this.operationtype = data.result;
      console.log(data.result)
      this.operationtypeResource = new DataTableResource(this.operationtype);
      this.operationtypeResource.count().then(count => {
        this.operationtypeCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_OPERATION_TYPE) {
      this.hmisApi.getOperationTypeSearch("");
    }
  }

  reloadDischargeType(params) {
    this.operationtypeResource.query(params).then(dtypes => this.operationtype = dtypes);

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
  //       this.compLoadManager.redirect(RL_OPERATION_TYPE);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_OPERATION_TYPE);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteOperationType(eventObj.data.ID);
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
      this.compLoadManager.redirect(RL_OPERATION_TYPE);
      break;

    case MODE_VIEW:
      this._stateObj.currentstate = VIEW;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_VIEW;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
      this.compLoadManager.redirect(RL_OPERATION_TYPE);
      break;

    case MODE_DELETE:
      this._stateObj.currentstate = DELETE;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_DELETE;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
      this.hmisApi.deleteOperationType(item.ID);
      break;
  }
}









  private addOperationType(): void {
    this.openCompInAddMode(RL_OPERATION_TYPE);
  }

  ngOnInit() {

this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);



    //console.log(films);
  }

}
