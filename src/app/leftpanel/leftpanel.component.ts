import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '../models/menu';
import { MenuService } from '../services/menu.service';
import { CompLoadManagerService } from '../utils/computils/comp-load-manager.service';
import { MENU_ITEM_CLICK } from '../models/common';
import { HmisAuthService } from '../services/hmis-auth.service';

@Component({
  selector: 'hmis-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftpanelComponent implements OnInit {

  private _menuItems: Array<MenuItem> = [];
  private _lastClickedItemId: number = 0;
  private closedMenu: number;

  constructor(private _menuService: MenuService,
    private _compLoadManager: CompLoadManagerService, public HmisAuthService: HmisAuthService) {
    this.HmisAuthService.getloginvalue.subscribe(
      (data: any) => {
        this._menuItems = this._menuService.getMenuItem();
        this._compLoadManager.menus = this._menuItems;
      });
  }

  ngOnInit() {
    // this._menuItems = this._menuService.getMenuItem();
    // this._compLoadManager.menus = this._menuItems;
    // this._compLoadManager.popupMenuItems = this._menuService.getPopupMenuItems();
  }

  private menuItemClickHandler(evntObj: any): void {
    if (this._lastClickedItemId !== 0 &&
      evntObj.type === MENU_ITEM_CLICK &&
      evntObj.menuid !== this._lastClickedItemId) {
      this.closedMenu = this._lastClickedItemId;
    }
    this._lastClickedItemId = evntObj.menuid;

  }
}
