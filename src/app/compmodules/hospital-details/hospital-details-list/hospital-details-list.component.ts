import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { DataTableResource, DataTableTranslations } from 'angular5-data-table';
import { RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, MODE_EDIT, MODE_VIEW, MODE_DELETE, ActionType, RL_HOSPITAL_DETAILS, RESULT_TYPE_DELETE_HOSPITAL_DETAIL } from '../../../models/common';

@Component({
  selector: 'app-hospital-details-list',
  templateUrl: './hospital-details-list.component.html',
  styleUrls: ['./hospital-details-list.component.scss']
})
export class HospitalDetailsListComponent extends BaseComponent implements OnInit {

  private hospitalSettings = [];
  private hospitalSettingsResource = new DataTableResource([]);
  private hospitalSettingsCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getHospitalSettings("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitalSettings = data.result;
      //console.log("Hospital Details ",this.hospitalSettings);
      this.hospitalSettingsResource = new DataTableResource(this.hospitalSettings);
      this.hospitalSettingsResource.count().then(count => {
        this.hospitalSettingsCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_HOSPITAL_DETAIL) {
      this.hmisApi.getHospitalSettings("");
    }
  }

  reloadHospitalDetails(params) {
    this.hospitalSettingsResource.query(params).then(dtypes => this.hospitalSettings = dtypes);
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
        this.compLoadManager.redirect(RL_HOSPITAL_DETAILS);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_HOSPITAL_DETAILS);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteHospitalSettingsAsPerId(eventObj.data.ID);
        break;
    }

  }


  private addHospitalSttings(): void {
    this.openCompInAddMode(RL_HOSPITAL_DETAILS);
  }

  ngOnInit() {
  }

}
