import { Component, OnInit } from '@angular/core';
import { HmisAuthService } from '../services/hmis-auth.service';
import { User } from '../models/user';
import { ErrorService } from '../services/error.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageType, USER_NAME, PASSWORD, MISSMATCH } from '../models/message';
import { CompLoadManagerService } from '../utils/computils/comp-load-manager.service';
import { RL_FORGET_PASSWORD_MODAL } from '../models/common';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'hmis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User;
  private invaliduser: string;
  private invalidpassword: string;
  private invalidCredentials: string;

  private _subscription: Subscription;


  constructor(private _hmisAuth: HmisAuthService,
    private _errorService: ErrorService,
    private _compLoadManager: CompLoadManagerService,
    private _menuService: MenuService) {
    this._subscription = this._errorService.errorObserver.subscribe((data: MessageType) => {
      if (data) {
        if (data.id === USER_NAME) {
          this.invaliduser = data.msgstring;
        } else if (data.id === PASSWORD) {
          this.invalidpassword = data.msgstring;
        } else if (data.id === MISSMATCH) {
          this.invalidCredentials = data.msgstring;
        } else {
          this.invaliduser = null;
          this.invalidpassword = null;
        }
      }

    })
  }

  ngOnInit() {
    this.user = new User();
    this._compLoadManager.popupMenuItems = this._menuService.getPopupMenuItems();
  }

  private submitLogin(): void {
    // let user:User = {
    //   userName: this._userName,
    //   password: this._userPassword
    // }
    this._hmisAuth.login(this.user);
  }

  private openForgetPasswordModal(): void {
    this._compLoadManager.redirect(RL_FORGET_PASSWORD_MODAL);
  }

}
