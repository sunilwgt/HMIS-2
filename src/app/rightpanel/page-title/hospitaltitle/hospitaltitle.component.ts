import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompLoadManagerService } from '../../../utils/computils/comp-load-manager.service';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_DELETE_PATIENT } from '../../../models/common';

@Component({
  selector: 'hospital-title',
  templateUrl: './hospitaltitle.component.html',
  styleUrls: ['./hospitaltitle.component.scss']
})
export class hospitaltitleComponent extends BaseComponent implements  OnInit, OnDestroy {

  private title:string;
  private _subscription: Subscription;
  private hosptalData;
  constructor(baseService: BaseServices) {
    super(baseService)
    this.hmisApi.getHospitalSettings("");
   }


   hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_DELETE_PATIENT) {
      this.hosptalData = data.result[0];
    }

  }
  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();

  }

}
