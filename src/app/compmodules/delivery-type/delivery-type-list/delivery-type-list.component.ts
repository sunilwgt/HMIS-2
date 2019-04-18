import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_DELIVERY_TYPE, RL_DELIVERY_TYPE, RESULT_TYPE_GET_DELIVERY_TYPE_LIST, RESULT_TYPE_DELETE_DELIVERY_TYPE } from '../../../models/common';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { State } from '../../../models/state';

@Component({
  selector: 'app-delivery-type-list',
  templateUrl: './delivery-type-list.component.html',
  styleUrls: ['./delivery-type-list.component.scss']
})
export class DeliveryTypeListComponent extends BaseComponent implements OnInit {

  private _apiSubscription: Subscription;
  private deliverytype = [];
  private deliverytypeResource = new DataTableResource([]);
  private deliverytypeCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getDeliveryTypeSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype == RESULT_TYPE_GET_DELIVERY_TYPE_LIST) {
      this.deliverytype = data.result;
      this.deliverytypeResource = new DataTableResource(this.deliverytype);
      this.deliverytypeResource.count().then(count => {
        this.deliverytypeCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_DELIVERY_TYPE) {
      this.hmisApi.getDeliveryTypeSearch("");
    }
  }

  reloadDeliveryType(params) {
    this.deliverytypeResource.query(params).then(dtypes => this.deliverytype = dtypes);

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
        this.compLoadManager.redirect(RL_DELIVERY_TYPE);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_DELIVERY_TYPE);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteDeliveryType(eventObj.data.ID);
        break;
    }

  }

  private addDeliveryType(): void {
    this.openCompInAddMode(RL_DELIVERY_TYPE);
  }


  ngOnInit() {
    //console.log(films);
  }
}
