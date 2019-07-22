import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { ActionType, MODE_EDIT, RL_DOCTOR, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_DOCTOR_LIST, RESULT_TYPE_DELETE_DOCTOR, ACTION_BUTTON_STATE, EDIT, VIEW, DELETE } from '../../../models/common';
import { MatSnackBar } from '@angular/material';
import { State } from '../../../models/state';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State;
  
  private doctor = [];
  private doctorResource = new DataTableResource([]);
  private doctorCount = 0;

  constructor(private baseService: BaseServices , private snackbar:MatSnackBar) {
    super(baseService);
    this.hmisApi.getDoctorListSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_DOCTOR_LIST) {
      this.doctor = data.result;
      console.log('data' , data.result);
      this.doctorResource = new DataTableResource(this.doctor);
      this.doctorResource.count().then(count => {
        this.doctorCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_DOCTOR) {
      this.hmisApi.getDoctorListSearch("");
      this.snackbar.open('Doctor Deleted successfully', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  reloadDoctor(params) {
    this.doctorResource.query(params).then(dtypes => this.doctor = dtypes);
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
  //       this.compLoadManager.redirect(RL_DOCTOR);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_DOCTOR);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteDoctor(eventObj.data.ID);
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
        this.compLoadManager.redirect(RL_DOCTOR);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_DOCTOR);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteDoctor(item.ID);
        break;
    }
  }

  private addDoctor(): void {
    this.openCompInAddMode(RL_DOCTOR);
  }

  ngOnInit() {
    this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);
    
  }

}
