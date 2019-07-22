import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { DataTableResource, DataTableTranslations } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_GET_VACCINE_TYPE_LIST, ActionType, MODE_EDIT, RL_VACCINE_TYPE, MODE_VIEW, MODE_DELETE, RESULT_TYPE_DELETE_VACCINE_TYPE, VIEW, EDIT, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';

@Component({
  selector: 'app-vaccine-type-list',
  templateUrl: './vaccine-type-list.component.html',
  styleUrls: ['./vaccine-type-list.component.scss']
})
export class VaccineTypeListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
public _stateObj: State
  private vaccine = [];
  private vaccineResource = new DataTableResource([]);
  private vaccineCount = 0;

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getVaccineTypeSearch("");
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_VACCINE_TYPE_LIST) {
      this.vaccine = data.result;
      this.vaccineResource = new DataTableResource(this.vaccine);
      this.vaccineResource.count().then(count => {
        this.vaccineCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_VACCINE_TYPE) {
      this.hmisApi.getVaccineTypeSearch("");
    }
  }


  reloadVaccineType(params) {
    this.vaccineResource.query(params).then(dtypes => this.vaccine = dtypes);
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
  //       this.compLoadManager.redirect(RL_VACCINE_TYPE);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_VACCINE_TYPE);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteVaccineType(eventObj.data.ID);
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
      this.compLoadManager.redirect(RL_VACCINE_TYPE);
      break;

    case MODE_VIEW:
      this._stateObj.currentstate = VIEW;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_VIEW;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
      this.compLoadManager.redirect(RL_VACCINE_TYPE);
      break;

    case MODE_DELETE:
      this._stateObj.currentstate = DELETE;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_DELETE;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
      this.hmisApi.deleteVaccineType(item.ID);
      break;
  }
}












  private addVaccineType(): void {
    this.openCompInAddMode(RL_VACCINE_TYPE);
  }

  ngOnInit() {
  
this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);


    //console.log(films);
  }

}
