import { ComponentRef } from "./compref";

export class ComponentInfo {
  compName: string;
  compId: number;
  comp: ComponentRef;
  routeLink?: string;
  headerTitle?: string;
  constructor() {

  }

}

export class CompData {
  fieldValue: string | number | boolean;
  amount?: any;
  description?: any;
  constructor() {

  }
}
