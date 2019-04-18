import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { ITEM_SELECTED } from '../../models/common';

@Component({
  selector: 'hmis-selected',
  template: `
    <label [ngClass]="{'active':_isActive}" (click)="labelClickEvent()">{{itemdata.label}}</label>
  ` ,
  styleUrls: ['./search.component.scss']
})
export class SelectedComponent implements OnInit {
  @Input() itemdata: ISelectOption;

  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  private _isActive: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  private labelClickEvent(): void {
    this._isActive = !this._isActive;
    this.itemSelected.emit({ type: ITEM_SELECTED, data: this.itemdata, isSelected: this._isActive });
  }

}
