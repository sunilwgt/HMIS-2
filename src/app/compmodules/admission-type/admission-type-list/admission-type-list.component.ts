import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { State } from '../../../models/state';
import { RESULT_TYPE_GET_ADMISSION_TYPE, ActionType, MODE_EDIT, RL_ADMISSION_TYPE, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_ADMISSION_LIST, RESULT_TYPE_DELETE_ADMISSION_TYPE } from '../../../models/common';

@Component({
  selector: 'app-admission-type-list',
  templateUrl: './admission-type-list.component.html',
  styleUrls: ['./admission-type-list.component.scss']
})
export class AdmissionTypeListComponent extends BaseComponent implements OnInit {

  private admissiontype = [];
  private admissiontypeResource = new DataTableResource([]);
  private admissiontypeCount = 0;

  constructor(baseService: BaseServices) {
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

  private clickEventHandler(eventObj: ActionType): void {
    switch (eventObj.mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_ADMISSION_TYPE);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_ADMISSION_TYPE);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteAdmissionType(eventObj.data.ID);
        break;
    }

  }

  private addAdmissionType(): void {
    this.openCompInAddMode(RL_ADMISSION_TYPE);
  }


  ngOnInit() {
    //console.log(films);
  }
}
