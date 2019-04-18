import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { DischargeType } from '../../models/opd';
import { RL_DISCHARGE_TYPE_LIST, MODE_ADD, RESULT_TYPE_SET_DISCHARGE_TYPE, RESULT_TYPE_EDIT_DISCHARGE_TYPE } from '../../models/common';

@Component({
  selector: 'app-discharge-type',
  templateUrl: './discharge-type.component.html',
  styleUrls: ['./discharge-type.component.scss']
})
export class DischargeTypeComponent extends BaseComponent implements OnInit {

  private _tempData: DischargeType;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_DISCHARGE_TYPE) {
      this.compLoadManager.redirect(RL_DISCHARGE_TYPE_LIST);
      this.hmisApi.getDischargeTypeSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_DISCHARGE_TYPE) {
      this.compLoadManager.redirect(RL_DISCHARGE_TYPE_LIST);
      this.hmisApi.getDischargeTypeSearch("");
      this.compLoadManager.closePopup();
    }
  }


  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new DischargeType();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setDischargeType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setDischargeTypeAsPerId(this.compData.ID, this.compData);
  }
}
