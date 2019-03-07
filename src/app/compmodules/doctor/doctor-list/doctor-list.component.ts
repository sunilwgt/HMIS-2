import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { ActionType, MODE_EDIT, RL_DOCTOR, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_DOCTOR_LIST, RESULT_TYPE_DELETE_DOCTOR } from '../../../models/common';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent extends BaseComponent implements OnInit {
  private doctor = [];
  private doctorResource = new DataTableResource([]);
  private doctorCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getDoctorListSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_DOCTOR_LIST) {
      this.doctor = data.result;
      this.doctorResource = new DataTableResource(this.doctor);
      this.doctorResource.count().then(count => {
        this.doctorCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_DOCTOR) {
      this.hmisApi.getDoctorListSearch("");
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

  private clickEventHandler(eventObj: ActionType): void {
    switch (eventObj.mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_DOCTOR);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_DOCTOR);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteDoctor(eventObj.data.ID);
        break;
    }

  }

  private addDoctor(): void {
    this.openCompInAddMode(RL_DOCTOR);
  }

  ngOnInit() {
  }

}
