import { Component, OnInit, OnDestroy ,EventEmitter, Output} from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RL_BILLING, RL_PACKAGES_TYPE, RESULT_TYPE_GET_PACKAGE_LIST, RESULT_TYPE_DELETE_PACKAGE, EDIT, VIEW, DELETE, ACTION_BUTTON_STATE } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.scss']
})
export class PackagesListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private packages = [];
  private packagesResource = new DataTableResource([]);
  private packagesCount = 0;

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getPackageSearch("");
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_PACKAGE_LIST) {
      this.packages = data.result;
      this.packagesResource = new DataTableResource(this.packages);
      this.packagesResource.count().then(count => {
        this.packagesCount = count;
      });
      console.log('packages' , this.packages)
    }

    if (data.resulttype === RESULT_TYPE_DELETE_PACKAGE) {
      this.hmisApi.getPackageSearch("");
    }
  }


  reloadPackages(params) {
    this.packagesResource.query(params).then(dtypes => this.packages = dtypes);
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
  //       this.compLoadManager.redirect(RL_PACKAGES_TYPE);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_PACKAGES_TYPE);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deletePackage(eventObj.data.ID);
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
      this.compLoadManager.redirect(RL_PACKAGES_TYPE);
      break;

    case MODE_VIEW:
      this._stateObj.currentstate = VIEW;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_VIEW;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
      this.compLoadManager.redirect(RL_PACKAGES_TYPE);
      break;

    case MODE_DELETE:
      this._stateObj.currentstate = DELETE;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_DELETE;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
      this.hmisApi.deletePackage(item.ID);
      break;
  }
}









  private addpackage(): void {
    this.openCompInAddMode(RL_PACKAGES_TYPE);
  }

  ngOnInit() {
 
this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);


    //console.log(films);
  }

}
