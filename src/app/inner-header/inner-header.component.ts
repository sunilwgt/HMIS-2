import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HmisAuthService } from '../services/hmis-auth.service';
import { Subscription } from 'rxjs';
import { RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST } from '../models/common';
import { BaseComponent } from '../utils/base.component';
import { BaseServices } from '../utils/base.service';

@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class InnerHeaderComponent extends BaseComponent implements OnInit {
  public togmenu:boolean=false;
  private title:string="Dashboard";
  private _subscription: Subscription;
  private hosptalData;
  private hospitalname;
 //public commonService:any;
  constructor(private commonService:CommonService, private baseService: BaseServices, private hmisAuthService:HmisAuthService ) {
    //this.commonService=CommonService;
    super(baseService)
    this.hmisApi.getHospitalSettings("");

  }

  public proclick(){
    this.togmenu=!this.togmenu;
  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
     this.hosptalData = data.result[0];
     this.hospitalname = data.result[0].hospital_name;
   }
 }
  minisidebar (){
    this.commonService.minisidebar = !this.commonService.minisidebar;
  }

  private logoutClickHandler():void{
    this.hmisAuthService.logout();
  }


  ngOnInit() {

  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    // this._subscription.unsubscribe();

  }


}




