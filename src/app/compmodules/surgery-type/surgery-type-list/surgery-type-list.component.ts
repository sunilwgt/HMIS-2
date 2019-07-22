import { Component, OnInit ,EventEmitter, Output } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { State } from '../../../models/state';
import { RESULT_TYPE_GET_SURGERY, RL_SURGERY_TYPE, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_SURGERY_LIST, RESULT_TYPE_DELETE_SURGERY, ACTION_BUTTON_STATE, EDIT, VIEW, DELETE } from '../../../models/common';

@Component({
  selector: 'app-surgery-type-list',
  templateUrl: './surgery-type-list.component.html',
  styleUrls: ['./surgery-type-list.component.scss']
})
export class SurgeryTypeListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State 
  private surgerytype = [];
  private surgerytypeResource = new DataTableResource([]);
  private surgerytypeCount = 0;


  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getSurgeryTypeSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_SURGERY_LIST) {
      this.surgerytype = data.result;
      this.surgerytypeResource = new DataTableResource(this.surgerytype);
      this.surgerytypeResource.count().then(count => {
        this.surgerytypeCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_SURGERY) {
      this.hmisApi.getSurgeryTypeSearch("");
    }
  }


  reloadSurgeryType(params) {
    this.surgerytypeResource.query(params).then(stypes => this.surgerytype = stypes);

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
  //       this.compLoadManager.redirect(RL_SURGERY_TYPE);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_SURGERY_TYPE);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteSurgeryType(eventObj.data.ID);
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
      this.compLoadManager.redirect(RL_SURGERY_TYPE);
      break;

    case MODE_VIEW:
      this._stateObj.currentstate = VIEW;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_VIEW;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
      this.compLoadManager.redirect(RL_SURGERY_TYPE);
      break;

    case MODE_DELETE:
      this._stateObj.currentstate = DELETE;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_DELETE;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
      this.hmisApi.deleteSurgeryType(item.ID);
      break;
  }
}








  private addSurgeryType(): void {
    this.openCompInAddMode(RL_SURGERY_TYPE);
  }

  ngOnInit() {
    

this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);


    //console.log(films);
  }
}
