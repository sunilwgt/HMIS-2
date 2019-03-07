import { Component, OnInit } from '@angular/core';
import { DataTableResource, DataTableTranslations } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_GET_BED_LIST, RL_BED, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_DELETE_BED } from '../../../models/common';

@Component({
  selector: 'app-bed-list',
  templateUrl: './bed-list.component.html',
  styleUrls: ['./bed-list.component.scss']
})
export class BedListComponent extends BaseComponent implements OnInit {

  private bed = [];
  private bedResource = new DataTableResource([]);
  private bedCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getBedSearch("");
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_BED_LIST) {
      this.bed = data.result;
      //console.log("Bed data are ",this.bed);
      this.bedResource = new DataTableResource(this.bed);
      this.bedResource.count().then(count => {
        this.bedCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_BED) {
      this.hmisApi.getBedSearch("");
    }
  }


  reloadBed(params) {
    this.bedResource.query(params).then(dtypes => this.bed = dtypes);
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
        this.compLoadManager.redirect(RL_BED);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_BED);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteBed(eventObj.data.ID);
        break;
    }

  }


  private addBed(): void {
    this.openCompInAddMode(RL_BED);
  }

  ngOnInit() {
    //console.log(films);
  }

}
