import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HmisAuthGuard } from './services/hmis-auth-guard.service';
import { AppdashboardComponent } from './appdashboard/appdashboard.component';

const routes: Routes = [
  { path: '', component: AppdashboardComponent, canActivate: [HmisAuthGuard] },
  { path: 'dashboard', component: AppdashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'errorcomp', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
