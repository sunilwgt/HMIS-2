import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menu';
import { CompLoadManagerService } from '../../utils/computils/comp-load-manager.service';
import { CommonService } from '../../services/common.service';
import { MENU_ITEM_CLICK } from '../../models/common';

@Component({
  selector: 'app-leftmenuitem',
  templateUrl: './leftmenuitem.component.html',
  styleUrls: ['./leftmenuitem.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuitemComponent implements OnInit {
  @Input() menuInfo: MenuItem;
  @Input() set closedMenu(menuID: number) {
    if (menuID === this.menuID) {
      this.isActive = false;
    }
  }
  @Output() menuClick: EventEmitter<any> = new EventEmitter();

  private isActive: boolean = false;
  private menuID: number;

  constructor(private _compManager: CompLoadManagerService, public commonService: CommonService) { }

  ngOnInit() {
    this.menuID = this.menuInfo.menuid;
  }

  private menuClickHandler() {
    this.isActive = !this.isActive;
    if (this.isActive === true) {
      this.menuClick.emit({ type: MENU_ITEM_CLICK, menuid: this.menuID });
    }
    this._compManager.setHeaderTitle(this.menuInfo.name);

    if (!this.menuInfo.hasSubmenu) {
      this._compManager.loadComponent(this.menuInfo);
    }
  }

  private subMenuClickHandler(event, mitem) {
    mitem.isActive = !mitem.isActive;
    event.stopImmediatePropagation();
    this._compManager.setHeaderTitle(mitem.name);
    if (!mitem.hasSubmenu) {
      this._compManager.loadComponent(mitem);
    }
  }

  private subMenuLevel3ClickHandler(event, sitem) {
    event.stopImmediatePropagation();
    this._compManager.loadComponent(sitem);
  }

}
