import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { PregnantTreatment } from '../../models/opd';
import { RESULT_TYPE_SET_PREGNANT_TREATMENT, RL_PREGNANT_TREATMENT_LIST, MODE_ADD, RESULT_TYPE_EDIT_PREGNANT_TREATMENT } from '../../models/common';

@Component({
  selector: 'app-pregnant-treatment',
  templateUrl: './pregnant-treatment.component.html',
  styleUrls: ['./pregnant-treatment.component.scss']
})
export class PregnantTreatmentComponent extends BaseComponent implements OnInit {
  private _tempData: PregnantTreatment;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_PREGNANT_TREATMENT) {
      this.compLoadManager.redirect(RL_PREGNANT_TREATMENT_LIST);
      this.hmisApi.getPregnantTreatmentSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_PREGNANT_TREATMENT) {
      this.compLoadManager.redirect(RL_PREGNANT_TREATMENT_LIST);
      this.hmisApi.getPregnantTreatmentSearch("");
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new PregnantTreatment();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setPregnantTreatment(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setPregnantTreatmentAsPerId(this.compData.ID, this.compData);
  }
}
