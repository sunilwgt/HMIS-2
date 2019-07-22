import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { DataTableResource, DataTableTranslations } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_GET_BED_LIST, RL_BED, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_DELETE_BED, VIEW, DELETE, EDIT, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';

@Component({
  selector: 'app-bed-list',
  templateUrl: './bed-list.component.html',
  styleUrls: ['./bed-list.component.scss']
})
export class BedListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State

  private bed = [];
  private bedResource = new DataTableResource([]);
  private bedCount = 0;

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getBedSearch("");
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_BED_LIST) {
      this.bed = data.result;
      //console.log("Bed data are ",this.bed);
      this.bedResource = new DataTableResource(this.bed);
      this.bedResource.count().then(count => {
        this.bedCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_BED) {
      this.hmisApi.getBedSearch("");
    }
  }


  reloadBed(params) {
    this.bedResource.query(params).then(dtypes => this.bed = dtypes);
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
  //       this.compLoadManager.redirect(RL_BED);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_BED);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteBed(eventObj.data.ID);
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
        this.compLoadManager.redirect(RL_BED);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_BED);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteBed(item.ID);
        break;
    }
  }











  private addBed(): void {
    this.openCompInAddMode(RL_BED);
  }

  ngOnInit() {
    this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);

    //console.log(films);
  }

}
