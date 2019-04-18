import { Component, OnInit, } from '@angular/core';
import { BaseServices } from '../../utils/base.service';
import { BaseComponent } from '../../utils/base.component';
import { MODE_ADD, RESULT_TYPE_GET_FORGOT_PASSWORD } from '../../models/common';
import { ForgotPassword } from '../../models/user';

@Component({
  selector: 'hmis-forget-password',
  templateUrl: './forget-password.component.html'
})

export class ForgetPasswordModal extends BaseComponent implements OnInit {

  private isEditable: Boolean = true;
  private emailOrPh: String = '';

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_FORGOT_PASSWORD) {
      //console.log(data.result);
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new ForgotPassword();
    }
  }

  // private submitPassClickHandler(): void {
  //   console.log(this.compData);
  //   this.compLoadManager.closePopup();
  // }

  submitClickHandler(): void {
    console.log(this.compData.email_address);
    this.hmisApi.sendEmailForgotpassword(this.compData.email_address);
  }


}
