import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { RESULT_TYPE_GET_PREGNANT_TREATMENT, ActionType, MODE_EDIT, RL_PREGNANT_TREATMENT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_EDIT_PREGNANT_TREATMENT, RESULT_TYPE_GET_PREGNANT_TREATMENT_LIST, RESULT_TYPE_DELETE_PREGNANT_TREATMENT } from '../../../models/common';

@Component({
  selector: 'app-pregnant-treatment-list',
  templateUrl: './pregnant-treatment-list.component.html',
  styleUrls: ['./pregnant-treatment-list.component.scss']
})
export class PregnantTreatmentListComponent extends BaseComponent implements OnInit {

  private pregnanttreatment = [];
  private pregnanttreatmentResource = new DataTableResource([]);
  private pregnanttreatmentCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getPregnantTreatmentSearch("");
  }

  hmisApiSubscribe(data: any): void {

    if (data.resulttype === RESULT_TYPE_GET_PREGNANT_TREATMENT_LIST) {
      this.pregnanttreatment = data.result;
      this.pregnanttreatmentResource = new DataTableResource(this.pregnanttreatment);
      this.pregnanttreatmentResource.count().then(count => {
        this.pregnanttreatmentCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_PREGNANT_TREATMENT) {
      this.hmisApi.getPregnantTreatmentSearch("");
    }
  }



  reloadPregnantType(params) {
    this.pregnanttreatmentResource.query(params).then(dtypes => this.pregnanttreatment = dtypes);

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
        this.compLoadManager.redirect(RL_PREGNANT_TREATMENT);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_PREGNANT_TREATMENT);
        break;

      case MODE_DELETE:
        this.hmisApi.deletePregnantTreatment(eventObj.data.ID);
        break;
    }

  }

  private addPregnantType(): void {
    this.openCompInAddMode(RL_PREGNANT_TREATMENT);
  }

  ngOnInit() {
    //console.log(films);
  }

}
