import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { OperationType } from '../../models/opd';
import { RESULT_TYPE_SET_OPERATION_TYPE, RL_OPERATION_TYPE_LIST, MODE_ADD, RESULT_TYPE_EDIT_OPERATION_TYPE } from '../../models/common';

@Component({
  selector: 'app-operation-type',
  templateUrl: './operation-type.component.html',
  styleUrls: ['./operation-type.component.scss']
})
export class OperationTypeComponent extends BaseComponent implements OnInit {

  private _tempData: OperationType;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_OPERATION_TYPE) {
      this.compLoadManager.redirect(RL_OPERATION_TYPE_LIST);
      this.hmisApi.getOperationTypeSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_OPERATION_TYPE) {
      this.compLoadManager.redirect(RL_OPERATION_TYPE_LIST);
      this.hmisApi.getOperationTypeSearch("");
      this.compLoadManager.closePopup();
    }
  }


  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new OperationType();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setOperationType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setOperationTypeAsPerId(this.compData.ID, this.compData);
  }
}
