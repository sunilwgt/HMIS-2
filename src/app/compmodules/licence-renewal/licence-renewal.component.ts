import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Registration, DOB, CompDataInfo, PatientExt } from '../../models/registration';
import { CommonService } from '../../services/common.service';
import { Option, RadioData, MODE_ADD, RESULT_TYPE_SET_LISCENCE, RL_LICENCE_LIST, RESULT_TYPE_EDIT_LISCENCE } from '../../models/common';

import { Subscription } from 'rxjs/Subscription';
import { CompLoadManagerService } from '../../utils/computils/comp-load-manager.service';
import { BaseServices } from '../../utils/base.service';
import { BaseComponent } from '../../utils/base.component';
import { NewBorn, Liscence } from '../../models/opd';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-licence-renewal',
  templateUrl: './licence-renewal.component.html',
  styleUrls: ['./licence-renewal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LicenceRenewalComponent extends BaseComponent implements OnInit {
// 
 compData: any;
 gencomp: any = GenericCompType;
  private bloodOptions:Array<Option>;
  private booleanOptions:Array<RadioData>;
  private genderOptions:Array<RadioData>;
  private bplOption:Array<RadioData>;
  private isConsentOption:Array<RadioData>;
  private _tempData:Registration;
  private _apisubscription:Subscription;

  showNav: any = [];

  constructor(baseservice:BaseServices , private snackbar:MatSnackBar) {
    super(baseservice)
    this.defaultvalidation = false;
    this.showNav[0] = true;


  }

  hmisApiSubscribe(data: any): void {
   
    if (data.resulttype === RESULT_TYPE_SET_LISCENCE) {
      console.log('set data' ,data)
      this.hmisApi.getLiscenceSearch("");
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_LICENCE_LIST);
      this.snackbar.open('Liscense added successfully', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
    if(data.resulttype === RESULT_TYPE_EDIT_LISCENCE){
      console.log('edit data' , data)
      this.hmisApi.getLiscenceSearch("");
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_LICENCE_LIST);
      this.snackbar.open('Liscense updated successfully', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
    
  }


  ngOnInit() {
   
    console.log("state" , this.state)
  
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Liscence();
    }
  }


//   submitClickHandler(): void {
// console.log('compdata' , this.compData)
// if(this.state.currentstate === MODE_ADD){
//   this.hmisApi.setLiscence(this.compData)
// }else{
  
//   console.log('edit' , this.compData)
//   this.hmisApi.setLiscenceAsPerId(this.compData.ID ,this.compData )
// }

//   }

invokeAddFunction(){
  if(this.state.currentstate === MODE_ADD){
    this.hmisApi.setLiscence(this.compData)
  }
}

invokeEditFunction(){
  this.hmisApi.setLiscenceAsPerId(this.compData.ID ,this.compData )
}


 valueChangeHandler(evt: CompDataInfo): void {
    this.compData[evt.propname] = evt.newval;
  }

  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
  }

  ngOnDestroy() {
  }

}
