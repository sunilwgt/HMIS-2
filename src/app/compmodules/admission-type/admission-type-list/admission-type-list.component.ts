import { Component, OnInit, OnDestroy ,EventEmitter, Output} from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { State } from '../../../models/state';
import { RESULT_TYPE_GET_ADMISSION_TYPE, ActionType, MODE_EDIT, RL_ADMISSION_TYPE, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_ADMISSION_LIST, RESULT_TYPE_DELETE_ADMISSION_TYPE, EDIT, VIEW, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';

@Component({
  selector: 'app-admission-type-list',
  templateUrl: './admission-type-list.component.html',
  styleUrls: ['./admission-type-list.component.scss']
})
export class AdmissionTypeListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private admissiontype = [];
  private admissiontypeResource = new DataTableResource([]);
  private admissiontypeCount = 0;

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getAdmissionTypeSearch("");

  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_ADMISSION_LIST) {
      this.admissiontype = data.result;
      this.admissiontypeResource = new DataTableResource(this.admissiontype);
      this.admissiontypeResource.count().then(count => {
        this.admissiontypeCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_ADMISSION_TYPE) {
      this.hmisApi.getAdmissionTypeSearch("");
    }
  }


  reloadAdmissionList(params) {
    this.admissiontypeResource.query(params).then(dtypes => this.admissiontype = dtypes);
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
  //       this.compLoadManager.redirect(RL_ADMISSION_TYPE);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_ADMISSION_TYPE);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteAdmissionType(eventObj.data.ID);
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
      this.compLoadManager.redirect(RL_ADMISSION_TYPE);
      break;

    case MODE_VIEW:
      this._stateObj.currentstate = VIEW;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_VIEW;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
      this.compLoadManager.redirect(RL_ADMISSION_TYPE);
      break;

    case MODE_DELETE:
      this._stateObj.currentstate = DELETE;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_DELETE;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
      this.hmisApi.deleteAdmissionType(item.ID);
      break;
  }
}










  private addAdmissionType(): void {
    this.openCompInAddMode(RL_ADMISSION_TYPE);
  }


  ngOnInit() {
    

this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);

    //console.log(films);
  }
}
