import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { RL_DISEASE_TYPE, RESULT_TYPE_GET_DISEASE_TYPE, ActionType, MODE_VIEW, MODE_EDIT, MODE_DELETE, RESULT_TYPE_DELETE_DISEASE_TYPE, RL_DISCHARGE_TYPE_LIST, RL_DISEASE_LIST } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';

@Component({
  selector: 'app-disease-type-list',
  templateUrl: './disease-type-list.component.html',
  styleUrls: ['./disease-type-list.component.scss']
})
export class DiseaseTypeListComponent extends BaseComponent implements OnInit {

  private diseases = [];
  private diseasesResource = new DataTableResource([]);
  private diseasesCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getDiseaseTypeSerach("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_DISEASE_TYPE) {
      this.diseases = data.result;
      this.diseasesResource = new DataTableResource(this.diseases);
      this.diseasesResource.count().then(count => {
        this.diseasesCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_DISEASE_TYPE) {
      this.hmisApi.getDiseaseTypeSerach("");
      this.compLoadManager.redirect(RL_DISEASE_LIST);
    }
  }

  reloadDiseases(params) {
    this.diseasesResource.query(params).then(dtypes => this.diseases = dtypes);
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
        this.compLoadManager.redirect(RL_DISEASE_TYPE);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_DISEASE_TYPE);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteDeceaseTypeAsPerId(eventObj.data.ID);
        break;
    }

  }

  private addDisease(): void {
    this.openCompInAddMode(RL_DISEASE_TYPE);
  }


  ngOnInit() {
    //console.log(films);
  }

}
