import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MenuItem } from '../../models/menu';
import { ComponentInfo } from '../../models/compinfo';

export const POPUP:string = "popup";
export const CONTAINER:string = "container";
export const CLOSE_POPUP:string = "closePopup";

@Injectable()
export class CompLoadManagerService {

  private dObs = new Subject<any>();

  private _observer:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _menus:Array<MenuItem> = [];
  private _popupmenu:Array<ComponentInfo> = [];

  constructor() { }

  public loadComponent(mitem:MenuItem):void{
    if(mitem.isPopup){
      // console.log('ispopup');
      this.publishEvt({type:POPUP, value:mitem});
      return;
    }
    if(mitem.compInfo){
      // console.log('container');
      this.publishEvt({type:CONTAINER, value:mitem.compInfo});
    }
  }

  public redirect(routestring:string, returnCompInfoOnly:boolean = false):ComponentInfo{
    // console.log('routestring' , routestring);
    let {isExists, menuitem} = this.isItPopupOnlyMenuItem(routestring);
    if(isExists){
      if(!returnCompInfoOnly){
        this.loadComponent(menuitem);
      }
      return menuitem.compInfo;
    }

    let breakOuter:boolean = false;
    let tempCompInfo:ComponentInfo;
    for(let v of this._menus) {
      if(v.routeLink && v.routeLink === routestring){
        tempCompInfo = v.compInfo;
        if(!returnCompInfoOnly) this.loadComponent(v);
        break;
      } 
      if(v.hasSubmenu){
        for (let m of v.submenus) {
          if(m.routeLink && m.routeLink === routestring){
            tempCompInfo = m.compInfo;
            if(!returnCompInfoOnly) this.loadComponent(m);
            breakOuter = true;
            break;
          }

          if(m.hasSubmenu){
            for(let o of m.submenus){
              if(o.routeLink && o.routeLink === routestring){
                tempCompInfo = o.compInfo;
                if(!returnCompInfoOnly) this.loadComponent(o);
                breakOuter = true;
                break;
              }
            }
          }

          if(breakOuter){
            break;
          }

        }
      }

      if(breakOuter){
        break;
      }

    }

    return tempCompInfo;
  }

  public closePopup():void{
    this.publishEvt({type:CLOSE_POPUP});
  }

  public publishEvt(data:any):void{
    this.dObs.next(data);
  }

  public setHeaderTitle(titleStr:string):void{
    this._observer.next(titleStr);
  }

  public getMenuCompInfoAsPerId(compRefId: number):ComponentInfo{
    let tempcinfo: ComponentInfo;
    for (let v of this._popupmenu) {
      if (v.compId === compRefId) {
        tempcinfo = v;
        break;
      }
    }

    return tempcinfo;
  }

  private isItPopupOnlyMenuItem(routerlink:string):any{
    for (const v of this._popupmenu) {
      if(v.routeLink === routerlink){
        let tm:MenuItem = new MenuItem();
        tm.isPopup = true;
        tm.compInfo = v;
        return {isExists:true, menuitem: tm};
      }
    }
    return {isExists:false, menuitem: undefined};
  }

  private loadDefaultMenuComp():void{
    this.loadComponent(this._menus[0]);
    this.setHeaderTitle(this._menus[0].name);
  }



  get dataObserver():Observable<any>{
    return this.dObs.asObservable();
  }

  get managerObs():Observable<any>{
    return this._observer.asObservable();
  }

  set menus(value:Array<MenuItem>){
    this._menus = value;
    this.loadDefaultMenuComp();
  }

  set popupMenuItems(value:Array<ComponentInfo>){
    this._popupmenu = value;
  }

}
