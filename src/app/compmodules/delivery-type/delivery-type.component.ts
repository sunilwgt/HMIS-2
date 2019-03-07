import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { DeliveryType } from '../../models/opd';
import { RESULT_TYPE_SET_DELIVERY_TYPE, RL_DELIVERY_TYPE_LIST, MODE_ADD, RESULT_TYPE_EDIT_DELIVERY_TYPE } from '../../models/common';

@Component({
  selector: 'app-delivery-type',
  templateUrl: './delivery-type.component.html',
  styleUrls: ['./delivery-type.component.scss']
})
export class DeliveryTypeComponent extends BaseComponent implements OnInit {

  private _tempData: DeliveryType;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_DELIVERY_TYPE) {
      this.compLoadManager.redirect(RL_DELIVERY_TYPE_LIST);
      this.hmisApi.getDeliveryTypeSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_DELIVERY_TYPE) {
      this.compLoadManager.redirect(RL_DELIVERY_TYPE_LIST);
      this.hmisApi.getDeliveryTypeSearch("");
      this.compLoadManager.closePopup();
    }
  }


  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new DeliveryType();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setDeliveryType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setDeliveryTypeAsPerId(this.compData.ID, this.compData);
  }

}
