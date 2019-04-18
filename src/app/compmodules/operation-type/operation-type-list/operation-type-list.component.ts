import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { RESULT_TYPE_GET_OPERATION_TYPE, ActionType, MODE_EDIT, RL_OPERATION_TYPE, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_OPERATION_TYPE_LIST, RESULT_TYPE_DELETE_OPERATION_TYPE } from '../../../models/common';

@Component({
  selector: 'app-operation-type-list',
  templateUrl: './operation-type-list.component.html',
  styleUrls: ['./operation-type-list.component.scss']
})
export class OperationTypeListComponent extends BaseComponent implements OnInit {
  private operationtype = [];
  private operationtypeResource = new DataTableResource([]);
  private operationtypeCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getOperationTypeSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_OPERATION_TYPE_LIST) {
      this.operationtype = data.result;
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

  private clickEventHandler(eventObj: ActionType): void {
    switch (eventObj.mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_OPERATION_TYPE);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_OPERATION_TYPE);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteOperationType(eventObj.data.ID);
        break;
    }

  }

  private addOperationType(): void {
    this.openCompInAddMode(RL_OPERATION_TYPE);
  }

  ngOnInit() {
    //console.log(films);
  }

}
