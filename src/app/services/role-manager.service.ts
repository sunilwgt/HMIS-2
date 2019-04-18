import { Injectable } from '@angular/core';
import { UserRP } from '../models/userole';

@Injectable()
export class RoleManagerService {

  private _userRP: UserRP;

  constructor() { }

  public hasAccess(menuinfo: any = null): boolean {
    return true;
  }

  private varifyPermission(): void {

  }

  set userRole(value: UserRP) {
    this._userRP = value;
  }

}
