import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HmisApisService } from '../../../services/hmis-apis.service';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';

import { Subscription } from 'rxjs/Subscription';
import { CompLoadManagerService } from '../../../utils/computils/comp-load-manager.service';
import { RL_LICENCE, RESULT_TYPE_GET_LISCENCE_LIST, MODE_EDIT, MODE_VIEW, MODE_DELETE, ActionType, RESULT_TYPE_DELETE_LISCENCE, VIEW, ACTION_BUTTON_STATE, EDIT, DELETE } from '../../../models/common';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { MatSnackBar } from '@angular/material';
import { GenericActionComponent } from '../../../generic-components/generic-action/generic-action.component';
import { State } from '../../../models/state';

@Component({
  selector: 'app-licence-list',
  templateUrl: './licence-list.component.html',
  styleUrls: ['./licence-list.component.scss']
})
export class LicenceListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State;
  
  private isreadonly = true;
  compData: LicenceListComponent;
  private _subscription: Subscription;
  private licence = [];
  private licenceResource = new DataTableResource([]);
  private licenceCount = 0;

  constructor(private baseServices: BaseServices, private snackbar: MatSnackBar) {
    super(baseServices);
    this.hmisApi.getLiscenceSearch('');

  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_LISCENCE_LIST) {
      console.log("new liuscendse list", data);
      this.licence = data.result;
      this.licenceResource = new DataTableResource(this.licence);
      this.licenceResource.count().then(count => {
        this.licenceCount = count;
      });
    }
    if (data.resulttype === RESULT_TYPE_DELETE_LISCENCE) {
      this.hmisApi.getLiscenceSearch("");
      this.snackbar.open('Liscense deleted successfully', 'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
    }
  }

  reloadDepartments(params) {
    this.licenceResource.query(params).then(licence => this.licence = licence);

  }

  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  private addlicence(): void {
    this.compLoadManager.redirect(RL_LICENCE);
  }

  ngOnInit() {
    this._stateObj = this.baseServices.stateService.createState(ACTION_BUTTON_STATE);

    //console.log(films);
    const a = this.comonService.getpermissionrole();
    if (a === 'readonly') {
      this.isreadonly = true;
    } else {
      this.isreadonly = false;
    }
  }

  private clickEventHandler(eventObj: ActionType, mode, item): void {
    console.log('eventObj', eventObj, mode, item);
    switch (mode) {
      case MODE_EDIT:
        this._stateObj.currentstate = EDIT;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_EDIT;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
        this.compLoadManager.redirect(RL_LICENCE);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_LICENCE);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteLiscence(item.ID);
        break;
    }

  }


  ngOnDestroy() {


  }

}
