import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { State } from '../../../models/state';
import { RESULT_TYPE_GET_SURGERY, RL_SURGERY_TYPE, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_SURGERY_LIST, RESULT_TYPE_DELETE_SURGERY } from '../../../models/common';

@Component({
  selector: 'app-surgery-type-list',
  templateUrl: './surgery-type-list.component.html',
  styleUrls: ['./surgery-type-list.component.scss']
})
export class SurgeryTypeListComponent extends BaseComponent implements OnInit {

  private surgerytype = [];
  private surgerytypeResource = new DataTableResource([]);
  private surgerytypeCount = 0;


  constructor(baseService: BaseServices) {
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

  private clickEventHandler(eventObj: ActionType): void {
    switch (eventObj.mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_SURGERY_TYPE);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_SURGERY_TYPE);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteSurgeryType(eventObj.data.ID);
        break;
    }

  }

  private addSurgeryType(): void {
    this.openCompInAddMode(RL_SURGERY_TYPE);
  }

  ngOnInit() {
    //console.log(films);
  }
}
