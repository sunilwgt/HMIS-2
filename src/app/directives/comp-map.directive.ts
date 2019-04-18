import { Directive, ViewContainerRef, ComponentFactoryResolver, ElementRef, Input } from '@angular/core';
import { ComponentInfo } from '../models/compinfo';

@Directive({
  selector: '[hmisCompMap]'
})
export class CompMapDirective {

  private _componentFactory:any;

  constructor(private vcRef:ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private el: ElementRef) {

   }



  @Input() set hmisCompMap(value:ComponentInfo) {
    if(value){
      this._componentFactory = this.componentFactoryResolver.resolveComponentFactory(value.comp.component);
      this.vcRef.clear();
      let componentRef = this.vcRef.createComponent(this._componentFactory);
    }
  }

}
