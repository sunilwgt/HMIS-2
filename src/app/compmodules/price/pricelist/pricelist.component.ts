import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { DataTableResource, DataTableTranslations } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_GET_PRICE_LIST, RL_PRICE, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_DELETE_PRICE, VIEW, EDIT, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.scss']
})
export class PricelistComponent extends BaseComponent implements OnInit {
    
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private price = [];
  private priceResource = new DataTableResource([]);
  private priceCount = 0;

  constructor(private baseService: BaseServices) {
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

  // private clickEventHandler(eventObj: ActionType): void {
  //   switch (eventObj.mode) {
  //     case MODE_EDIT:
  //       this.compLoadManager.redirect(RL_PRICE);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_PRICE);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deletePrice(eventObj.data.ID);
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
        this.compLoadManager.redirect(RL_PRICE);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_PRICE);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deletePrice(item.ID);
        break;
    }
  }








  private addprice(): void {
    this.openCompInAddMode(RL_PRICE);
  }
  ngOnInit() {

this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);

  }

}
