import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { MODE_EDIT, PackageOption, GET_SELECTED_ITEMS, RadioData, MODE_ADD, RESULT_TYPE_SET_PACKAGE, RL_PACKAGES_LIST, RESULT_TYPE_EDIT_PACKAGE } from '../../models/common';
import { Packages } from '../../models/opd';

@Component({
  selector: 'hmis-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PackagesComponent extends BaseComponent implements OnInit, OnDestroy {

  private pkgList: Array<ISelectOption> = [];
  private status: Array<RadioData>;
  private reimburse: Array<RadioData>;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_PACKAGE) {
      this.compLoadManager.redirect(RL_PACKAGES_LIST);
      this.hmisApi.getPackageSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_PACKAGE) {
      this.compLoadManager.redirect(RL_PACKAGES_LIST);
      this.hmisApi.getPackageSearch("");
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    this.status = this.comonService.status;
    this.reimburse = this.comonService.reimbursement;
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Packages();
    }
    //this.createPachageList();
  }

  // private createPachageList(): void {
  //   let arr: Array<ISelectOption> = [];
  //   arr.push(this.getNewObj("And1", "lbl1", 1));
  //   arr.push(this.getNewObj("Label 2", "lbl2", 2));
  //   arr.push(this.getNewObj("abe ", "lbl3", 3));
  //   arr.push(this.getNewObj("b 4", "lbl4", 4));
  //   arr.push(this.getNewObj("Label 5", "lbl5", 5));

  //   this.pkgList = arr;
  // }

  // private getNewObj(lbl: string, lblval: string, id: number): ISelectOption {
  //   let item: ISelectOption = new PackageOption();
  //   item.label = lbl;
  //   item.value = lblval;
  //   item.id = id;
  //   return item;
  // }

  // private testFunc(): void {
  //   this.comonService.publishEvt(GET_SELECTED_ITEMS);
  // }

  // private getSeletedClickHandler(event: any): void {
  //   console.log(event);
  // }

  invokeAddFunction(): void {
    this.hmisApi.setPackages(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setPackagesAsPerId(this.compData.ID, this.compData);
  }
}
