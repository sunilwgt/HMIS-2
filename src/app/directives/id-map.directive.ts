import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ 
    selector: '[idMapping]'
})
export class TemplateMapDirective {
 
 @Input() templateId:string;

 constructor(
   private templateRef: TemplateRef<any>,
   private viewContainer: ViewContainerRef) { }

  @Input() set idMapping(value:string) {
      if(value === this.templateId){
        this.viewContainer.createEmbeddedView(this.templateRef);
     }else{
        this.viewContainer.clear();
     } 
 } 
}