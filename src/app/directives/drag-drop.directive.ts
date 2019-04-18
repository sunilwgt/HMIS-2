import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[dragdrop]'

})
export class DragDropDirective {
  @Output() dropHandler: EventEmitter<any> = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event']) public onDragOver(event){
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event){
    event.preventDefault();
    event.stopPropagation();
  }
  @HostListener('drop', ['$event']) public onDrop(event){
    event.preventDefault();
    event.stopPropagation();
    this.dropHandler.emit({files: event.dataTransfer.files});
  }


}
