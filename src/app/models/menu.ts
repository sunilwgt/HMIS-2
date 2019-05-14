import { ComponentInfo } from "./compinfo";

export class MenuItem{
  permissionname:string;
  menuid:number;
  name:string;
  hasSubmenu?:boolean = false;
  hasSubmenuPermission?:boolean = true;
  hasPermission?:boolean = true;
  iconClass?:string;
  submenus?:Array<MenuItem> = [];
  compInfo?:ComponentInfo;
  isPopup?:boolean = false;
  routeLink?:string;
  isActive?:boolean = false;

  constructor(){

  }
}
