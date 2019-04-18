import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { MODE_ADD } from '../../models/common';
import { OtType } from '../../models/opd';

@Component({
  selector: 'app-ottype',
  templateUrl: './ottype.component.html',
  styleUrls: ['./ottype.component.scss']
})
export class OttypeComponent extends BaseComponent implements OnInit {

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    // if (data.resulttype === RESULT_TYPE_SET_OPERATION_TYPE) {
    //   this.compLoadManager.redirect(RL_OPERATION_TYPE_LIST);
    //   this.hmisApi.getOperationTypeSearch("");
    //   this.compLoadManager.closePopup();
    // }

    // if (data.resulttype === RESULT_TYPE_EDIT_OPERATION_TYPE) {
    //   this.compLoadManager.redirect(RL_OPERATION_TYPE_LIST);
    //   this.hmisApi.getOperationTypeSearch("");
    //   this.compLoadManager.closePopup();
    // }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new OtType();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setOperationType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setOperationTypeAsPerId(this.compData.ID, this.compData);
  }

}
