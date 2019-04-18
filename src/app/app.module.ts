import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DataTableModule } from 'angular5-data-table';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatSnackBarModule, MatFormFieldModule, MatSelectModule,
  MatCheckboxModule, MatInputModule 
} from '@angular/material';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { HttpModule } from '@angular/http';
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
    HttpModule,
    DataTableModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule,
    TooltipModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    MatTableModule,
    MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  ],
  entryComponents: ENTRY_COMPONENTS,
  providers: [   NgbActiveModal,HmisAuthService, HmisAuthGuard, MenuService, CompLoadManagerService, CommonService, HmisApisService, HelperFunction, StateService, LoaderService, ErrorService, RoleManagerService, BaseServices, HmisExternalApisService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  //{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent],
  exports:[MatTableModule]

})
export class AppModule {
  constructor(router: Router) {
  }

}
