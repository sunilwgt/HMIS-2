import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HmisAuthService } from '../services/hmis-auth.service';

@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class InnerHeaderComponent implements OnInit {
  public togmenu:boolean=false;

 //public commonService:any;
  constructor(private commonService:CommonService, private hmisAuthService:HmisAuthService ) {
    //this.commonService=CommonService;
  }

  public proclick(){
    this.togmenu=!this.togmenu;
  }

  minisidebar (){
    this.commonService.minisidebar = !this.commonService.minisidebar;
  }

  private logoutClickHandler():void{
    this.hmisAuthService.logout();
  }


  ngOnInit() {

  }



}
