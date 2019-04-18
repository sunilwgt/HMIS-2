import { Component, OnInit } from '@angular/core';
import { DataTableResource, DataTableTranslations } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_GET_PRICE_LIST, RL_PRICE, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_DELETE_PRICE } from '../../../models/common';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.scss']
})
export class PricelistComponent extends BaseComponent implements OnInit {

  private price = [];
  private priceResource = new DataTableResource([]);
  private priceCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getPriceSearch("");
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_PRICE_LIST) {
      this.price = data.result;
      this.priceResource = new DataTableResource(this.price);
      this.priceResource.count().then(count => {
        this.priceCount = count;
      });
    }
    if (data.resulttype === RESULT_TYPE_DELETE_PRICE) {
      this.hmisApi.getPriceSearch("");
    }
  }

  reloadprice(params) {
    this.priceResource.query(params).then(dtypes => this.price = dtypes);
  }

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
        this.compLoadManager.redirect(RL_PRICE);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_PRICE);
        break;

      case MODE_DELETE:
        this.hmisApi.deletePrice(eventObj.data.ID);
        break;
    }

  }

  private addprice(): void {
    this.openCompInAddMode(RL_PRICE);
  }
  ngOnInit() {
  }

}
