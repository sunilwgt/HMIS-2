import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { Subscription } from 'rxjs/Subscription';
import { Surgery } from '../../models/opd';
import { RESULT_TYPE_SET_SURGERY, RL_SURGERY_TYPE_LIST, MODE_ADD, RESULT_TYPE_EDIT_SURGERY } from '../../models/common';


@Component({
  selector: 'app-surgery-type',
  templateUrl: './surgery-type.component.html',
  styleUrls: ['./surgery-type.component.scss']
})

export class SurgeryTypeComponent extends BaseComponent implements OnInit {

  private _tempData: Surgery;
  private _apiSubscription: Subscription;
  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_SURGERY) {
      this.compLoadManager.redirect(RL_SURGERY_TYPE_LIST);
      this.hmisApi.getSurgeryTypeSearch("");
      this.compLoadManager.closePopup();
    }
    if (data.resulttype === RESULT_TYPE_EDIT_SURGERY) {
      this.compLoadManager.redirect(RL_SURGERY_TYPE_LIST);
      this.hmisApi.getSurgeryTypeSearch("");
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Surgery();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setSurgeryType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setSurgeryTypeAsPerId(this.compData.ID, this.compData);
  }
}
