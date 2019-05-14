import { Injectable, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HmisApisService } from './hmis-apis.service';
import { LoaderService } from './loader.service';
import { UserDetail, UserRP } from '../models/userole';
import { MessageType, USER_NAME, PASSWORD, MISSMATCH } from '../models/message';
import { ErrorService } from './error.service';
import { RESULT_TYPE_USER_ROLE, APP_SESSION_STATE } from '../models/common';
import { RoleManagerService } from './role-manager.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';
import { HelperFunction } from '../utils/helper-function.service';
import { ComponentInfo } from '../models/compinfo';

//const LOGIN_URL: string = "https://webapihmis.azurewebsites.net/api/authenticate";
// const LOGIN_URL: string = "https://webapimultitenanthmis.azurewebsites.net/api/authenticate";
// const LOGIN_URL: string = "https://192.168.1.166:443/api/authenticate";
const LOGIN_URL: string = " https://hmismultitenantwebapi.azurewebsites.net/api/authenticate/";
@Injectable()
export class HmisAuthService implements OnDestroy {
  @Output() getloginvalue: EventEmitter<any>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private observable1: any;
  private _currentUser: User;
  private _subscription: Subscription;
  private _sessionTime: number;
  private _sessionSubscription: Subscription;
  private _stateSubscription: Subscription;
  private _blockFromLogout: boolean = false;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private _router: Router,
    private _hmisHttp: HttpClient,
    private _hmisApi: HmisApisService,
    private _loader: LoaderService,
    private _errorService: ErrorService,
    private _roleManager: RoleManagerService,
    private _stateService: StateService,
    private _helperFunc: HelperFunction) {
    this.getloginvalue = new EventEmitter();

    this._subscription = this._hmisApi.apiResults.subscribe(data => {
      if (data.resulttype === RESULT_TYPE_USER_ROLE) {
        console.log('userrole data' , data);
        let userrole: UserRP = data.result;
        userrole = data.result;
        this._roleManager.userRole = userrole;
        this.getloginvalue.emit(userrole);
        // console.log(userrole);
        this.loggedIn.next(true);
        this._router.navigate(['/']);
      }
    });

    this._stateSubscription = this._stateService.stateObserver.subscribe(data => {
      if (data && data.stateID === APP_SESSION_STATE) {
        this.resetSesstionTime();
      }
    })
  }


  
  login(user: User) {
    this._currentUser = user;

    const httpOptions = {
      headers: this.createAuthHeader()
    };
    // console.log('currentuser' , this._currentUser);
    // console.log("headers", httpOptions);


    let msgType: MessageType = new MessageType();
    this._errorService.throwErrors(msgType);

    if (user.userName !== '' && user.password !== '') {
      // console.log('enter usher')
      this._loader.showLoader = true;
      this._hmisHttp.post(LOGIN_URL, null, httpOptions).subscribe(
        
        data => {
          console.log('logged in data' , data);
          this._loader.showLoader = false;
          let d: any = data;
          // console.log('subscribed data' , data);
          this._hmisApi.hmistoken = d.token;
          //this._hmisApi.hmistoken = "869d5a33-265e-4e5a-a039-d445582a0732";
          //console.log(this._hmisApi.hmistoken);
          let userDetail: UserDetail = new UserDetail();
          userDetail.uid = d.UserId;
          userDetail.username = "admin";
          this.getloginvalue.emit(data);
          
          // this._hmisApi.getUserRole(userDetail);
          userDetail.created_by = d.access_token.UserId;
          userDetail.modified_by = d.access_token.UserId;
          this._hmisApi.userDetail = userDetail;

          this.calculateSessionTime(d.access_token.ExpiresOn);

          this.loggedIn.next(true);
          this._router.navigate(['/']);
        },
        err => {
          this._loader.showLoader = false;
          this.loggedIn.next(false);
          //this._router.navigate(['/errorcomp']);
          msgType.id = MISSMATCH;
          msgType.msgstring = "Invalid credentials please try again";
          this._errorService.throwErrors(msgType);
        }
      )
    } else {
      if (user.userName === '') {
        msgType.id = USER_NAME;
        msgType.msgstring = "Invalid Username";
        this._errorService.throwErrors(msgType);
      }

      if (user.password === '') {
        msgType.id = PASSWORD;
        msgType.msgstring = "Invalid Password";
        this._errorService.throwErrors(msgType);
      }
    }
  }

  private createAuthHeader(): HttpHeaders {
    let uino: string = `Basic ${this._currentUser.userName}:${this._currentUser.password}:MedicareDb`;
    const headers = new HttpHeaders().set('Authorization', uino).set('Tenant_Key', "MedicareDb");
    return headers;
  }

  logout() {
    this.loggedIn.next(false);
    this._router.navigate(['/login']);
  }

  private calculateSessionTime(dateStr: string): void {
    let d: Date = new Date(dateStr);
    let cD: Date = new Date();

    this._sessionTime = (this._helperFunc.dateConvertToMin(d) - this._helperFunc.dateConvertToMin(cD));
    this._sessionTime = (1000 * 60) * this._sessionTime;
    let localsession: number = this._sessionTime;

    setTimeout(() => {
      if (this._sessionSubscription) {
        this._sessionSubscription.unsubscribe();
      }

      if (!this._blockFromLogout) {
        this.logout();
      }


    }, localsession);
  }

  private resetSesstionTime(): void {
    if (this._sessionTime) {

      if (this._sessionSubscription) {
        this._sessionSubscription.unsubscribe();
      }

      this._blockFromLogout = true;
      this.observable1 = Observable.interval(this._sessionTime);

      this._sessionSubscription = this.observable1.subscribe(data => {
        this._sessionSubscription.unsubscribe();
        this.logout();
      });
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();

  }

}
