import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { ActionType, RESULT_TYPE_GET_WARD_LIST, MODE_EDIT, RL_WARD, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_FLOOR, RESULT_TYPE_DELETE_WARD } from '../../../models/common';

@Component({
  selector: 'app-ward-list',
  templateUrl: './ward-list.component.html',
  styleUrls: ['./ward-list.component.scss']
})
export class WardListComponent extends BaseComponent implements OnInit {
  private ward = [];
  private wardResource = new DataTableResource([]);
  private wardCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getWardSearch("");

  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_WARD_LIST) {
      this.ward = data.result;
      this.wardResource = new DataTableResource(this.ward);
      this.wardResource.count().then(count => {
        this.wardCount = count;
      });
    }
    if (data.resulttype === RESULT_TYPE_DELETE_WARD) {
      this.hmisApi.getWardSearch("");
    }
  }

  reloadWard(params) {
    this.wardResource.query(params).then(wtypes => this.ward = wtypes);
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
        this.compLoadManager.redirect(RL_WARD);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_WARD);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteWard(eventObj.data.ID);
        break;
    }

  }

  private addWard(): void {
    this.openCompInAddMode(RL_WARD);
  }

  ngOnInit() {
    //console.log(films);
  }

}

