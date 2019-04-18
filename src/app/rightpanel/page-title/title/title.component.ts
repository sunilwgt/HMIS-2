import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompLoadManagerService } from '../../../utils/computils/comp-load-manager.service';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_DELETE_PATIENT, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST } from '../../../models/common';

@Component({
  selector: 'hmis-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent extends BaseComponent  implements OnInit, OnDestroy {

  private title:string="Dashboard";
  private _subscription: Subscription;
  private hosptalData;
  private hospitalname;
  constructor(baseService: BaseServices , compLoadManager:CompLoadManagerService) {
    super(baseService)
    this._subscription =  this.compLoadManager.managerObs.subscribe(val=>{
        this.title = val;
      })
      this.hmisApi.getHospitalSettings("");
   }

   hmisApiSubscribe(data: any): void {
     if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hosptalData = data.result[0];
      this.hospitalname = data.result[0].hospital_name;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();

  }

}
