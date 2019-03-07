import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';




import { DataTableModule } from 'angular5-data-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HmisAuthService } from './services/hmis-auth.service';
import { HmisAuthGuard } from './services/hmis-auth-guard.service';
import { MenuService } from './services/menu.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompLoadManagerService } from './utils/computils/comp-load-manager.service';
import { CommonService } from './services/common.service';
import { HmisApisService } from './services/hmis-apis.service';
import { HelperFunction } from './utils/helper-function.service';


import { StateService } from './services/state.service';
import { LoaderService } from './services/loader.service';

import { ErrorService } from './services/error.service';
import { RoleManagerService } from './services/role-manager.service';
import { BaseServices } from './utils/base.service';
import { ENTRY_COMPONENTS, DECLARATION_COMPONENTS } from './exports.files';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HmisExternalApisService } from './services/hmis-external-apis.service';

import {OnlyNumber} from './directives/onlynumber.directive';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [DECLARATION_COMPONENTS,OnlyNumber],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule,
    TooltipModule,
    
  ],
  entryComponents: ENTRY_COMPONENTS,
  providers: [HmisAuthService, HmisAuthGuard, MenuService, CompLoadManagerService, CommonService, HmisApisService, HelperFunction, StateService, LoaderService, ErrorService, RoleManagerService, BaseServices, HmisExternalApisService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  //{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(router: Router) {
  }

}
