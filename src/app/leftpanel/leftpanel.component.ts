import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '../models/menu';
import { MenuService } from '../services/menu.service';
import { CompLoadManagerService } from '../utils/computils/comp-load-manager.service';
import { MENU_ITEM_CLICK } from '../models/common';
import { HmisAuthService } from '../services/hmis-auth.service';
import { _MatMenuItemMixinBase } from '@angular/material/menu/typings/menu-item';
import { BaseServices } from '../utils/base.service';

@Component({
  selector: 'hmis-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftpanelComponent implements OnInit {
  private rolemenuItems: Array<any> = []
  private _menuItems: Array<MenuItem> = [];
  private _lastClickedItemId: number = 0;
  private closedMenu: number;

  constructor(private _menuService: MenuService,
    private _compLoadManager: CompLoadManagerService, public HmisAuthService: HmisAuthService, private baseservice: BaseServices) {
    this.HmisAuthService.getloginvalue.subscribe(
      (data: any) => {
        console.log('leftpanel data', data)
        this._menuItems = this._menuService.getrolebasedmenuitem();
        this._compLoadManager.menus = this._menuItems;
      });
  }

  //for with roles
  ngOnInit() {
    this._menuItems = this._menuService.getrolebasedmenuitem();
    const a = this._menuService.getuserpermissions();
    const b = [];
    // console.log('permissions' , a) ; 
    // console.log('menuitems' , this._menuItems)
    console.log('menuitems' , this._menuItems);
    // b[0].push(this._menuItems[0]);
    b[0] = this._menuItems[0]
    for (let ab of a) {
      const bc = (this._menuItems.filter((res) => res.permissionname === ab))
      console.log('filteredmenus', bc)
      if (bc.length > 0) {
        // b[0] = 'null'
        b.push(...bc)
      }
    }
    console.log(b);
    this._compLoadManager.menus = b;
    this.rolemenuItems = b;
    this._compLoadManager.popupMenuItems = this._menuService.getPopupMenuItems();
  }



  // for withoput roles
  // ngOnInit() {
  //   console.log('helo from html')
  //   this._menuItems = this._menuService.getrolebasedmenuitem();
  //   const a = this._menuService.getuserpermissions();
  //   console.log('a', a)
  //   const b = []
  //   // for (let ab of a) {
  //   // const bc  = (this._menuItems.filter((res) => res.permissionname === ab))
  //   // console.log('bc' , bc)
  //   // if(bc.length > 0){
  //   //   // b[0] = 'null'
  //   //   b.push(...bc)
  //   // }
  //   // }
  //   this._compLoadManager.menus = this._menuItems;
  //   // this._compLoadManager.menus = b;
  //   // this.rolemenuItems = b;

  //   this._compLoadManager.popupMenuItems = this._menuService.getPopupMenuItems();
  // }


  /// for two loops 
  // ngOnInit() {
  //   this._menuItems = this._menuService.getMenuItem();
  //   const permissions = this._menuService.getuserpermissions();
  //   console.log('all menuitems', this._menuItems)
  //   console.log('permissions', permissions)
  //   for (let m of this._menuItems) {
  //     if (!m.hasOwnProperty('submenus')) {
  //       console.log('no submenus', m)
  //       let b = (permissions.filter((res) => res === m.permissionname))
  //       console.log('b', b);
  //       if (b.length > 0) {
  //         console.log('has permisson')
  //       } else {
  //         console.log('has  not permisson')
  //         this._menuItems = this._menuItems.filter((res) => res !== m);
  //       }
  //       // console.log('hasnot  submenus1 ', m)
  //     } else {
  //       console.log('has submenus1 ', m)
  //       const psub = [];
  //       for (let submenus1 of m.submenus) {
  //         let a = (permissions.filter((res) => res === submenus1.permissionname))
  //         if (a.length > 0) {
  //           psub.push(submenus1)
  //         }
  //       }
  //       console.log('psub', psub)
  //       m.submenus = []
  //       m.submenus = psub;
  //       if (psub.length < 1) {
  //         this._menuItems = this._menuItems.filter((res) => res !== m);
  //       }

  //     }
  //     console.log('changedmenuitems', this._menuItems)
  //   }
  //   this.rolemenuItems = this._menuItems;
  //   this._compLoadManager.menus = this.rolemenuItems;

  //   this._compLoadManager.popupMenuItems = this._menuService.getPopupMenuItems();
  // }










  private menuItemClickHandler(evntObj: any, item: any): void {
    this.setpermission(item);
    if (this._lastClickedItemId !== 0 &&
      evntObj.type === MENU_ITEM_CLICK &&
      evntObj.menuid !== this._lastClickedItemId) {
      this.closedMenu = this._lastClickedItemId;
    }
    this._lastClickedItemId = evntObj.menuid;
  }



  setpermission(item) {
    const permission = item.permissionname.slice(-9);
    if (permission === 'Executive') {
      this.baseservice.comonService.setpermissionrole('readonly')

    } else {
      this.baseservice.comonService.setpermissionrole('crud')
    }


  }
}

