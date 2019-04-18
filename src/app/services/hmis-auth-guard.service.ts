import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { HmisAuthService } from './hmis-auth.service';

@Injectable()
export class HmisAuthGuard implements CanActivate{
  constructor(
    private hmisAuthService:HmisAuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.hmisAuthService.isLoggedIn.map((isLogged: boolean) => {
        if (!isLogged){
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      });
  }

}
