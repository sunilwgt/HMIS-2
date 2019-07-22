import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { RESULT_TYPE_SET_PRICE, RL_PRICE_LIST, RESULT_TYPE_EDIT_PRICE, MODE_ADD, RESULT_TYPE_GET_WARD,RESULT_TYPE_GET_PACKAGE_SEARCH } from '../../models/common';
import { Price } from '../../models/opd';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent extends BaseComponent implements OnInit {

  selectedPackage:any;
  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = false;
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_PRICE) {
      this.compLoadManager.redirect(RL_PRICE_LIST);
      this.hmisApi.getPriceSearch("");
      this.compLoadManager.closePopup();
    }
  /*   if (data.resulttype === RESULT_TYPE_GET_PACKAGE_SEARCH) {
      if (data.result && data.result[0]) {
        this.selectedPackage = data.result[0];
        //this.updatePatientDetails();
        this.compData.search_package = this.selectedPackage.package_name;

      } 

    } */
    if (data.resulttype === RESULT_TYPE_EDIT_PRICE) {
      this.compLoadManager.redirect(RL_PRICE_LIST);
      this.hmisApi.getPriceSearch("");
      this.compLoadManager.closePopup();
    }

  }
  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Price();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setPrice(this.compData);

  }

  invokeEditFunction(): void {
    this.hmisApi.setPriceAsPerId(this.compData.ID, this.compData);
  }
 /* private onEnterClickHandler(evntObj: any): void {
    this.hmisApi.getPackageSearch(evntObj.data);
    console.log("Prescription Search Result",this.selectedPatient);
  } */
}
