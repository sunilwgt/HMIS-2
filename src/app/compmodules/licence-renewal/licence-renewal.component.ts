import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Registration, DOB, CompDataInfo, PatientExt } from '../../models/registration';
import { CommonService } from '../../services/common.service';
import { Option, RadioData } from '../../models/common';

import { Subscription } from 'rxjs/Subscription';
import { CompLoadManagerService } from '../../utils/computils/comp-load-manager.service';

@Component({
  selector: 'app-licence-renewal',
  templateUrl: './licence-renewal.component.html',
  styleUrls: ['./licence-renewal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LicenceRenewalComponent implements OnInit {

  private compData: Registration ;
  private gencomp: any = GenericCompType;
  private bloodOptions:Array<Option>;
  private booleanOptions:Array<RadioData>;
  private genderOptions:Array<RadioData>;
  private bplOption:Array<RadioData>;
  private isConsentOption:Array<RadioData>;
  private _tempData:Registration;
  private _apisubscription:Subscription;

  showNav: any = [];

  constructor(private comonService: CommonService) {
    this.showNav[0] = true;


  }

  ngOnInit() {
    this.bloodOptions = this.comonService.bloodOptions;
 // this.booleanOptions = this.comonService.radioYesNoOptions;
    this.bplOption = this.comonService.radioYesNoOptions;
    this.isConsentOption = this.comonService.radioYesNoOptions;
    this.genderOptions = this.comonService.genderOptions;

  }


  private submitClickHandler(): void {

  }

  private valueChangeHandler(evt: CompDataInfo): void {
    this.compData[evt.propname] = evt.newval;
  }

  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
  }

  ngOnDestroy() {
  }

}
