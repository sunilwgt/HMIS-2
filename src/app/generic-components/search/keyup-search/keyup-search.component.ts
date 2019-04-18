import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../../services/common.service';
import { PackagePipe } from '../../../pipes/package.pipe';
import { GET_SELECTED_ITEMS, GET_SELECTED_ITEM, TEXT_BOX_ON_ENTER } from '../../../models/common';

@Component({
  selector: 'hmis-keyup-search',
  templateUrl: './keyup-search.component.html',
  styleUrls: ['./keyup-search.component.scss']
})
export class KeyupSearchComponent implements OnInit {
  @Input() data: Array<any> = [];
  @Input() instanceId: string;
  @Input() labelname: string;
  @Input() multiselect: boolean = false;
  @Input() propName: string;

  @Output() getSelectedItem: EventEmitter<any> = new EventEmitter();
  @Output() getSelectedItems: EventEmitter<any> = new EventEmitter();
  @Output() onEnterClick: EventEmitter<any> = new EventEmitter();
  @Output() onKeyUp: EventEmitter<any> = new EventEmitter();

  private _openDropDown: boolean = false;
  private _selectedItems: Array<any> = [];
  private _selectedItem: any;
  private searchstr: string = "";
  private _subscription: Subscription;
  private propId: string;

  constructor(private cmnService: CommonService) {
    this._subscription = this.cmnService.cmnObserver.subscribe(data => {
      if (data === GET_SELECTED_ITEMS) {
        this.emitSelectedItems();
      }
    });

  }

  ngOnInit() {
  }

  private dropDownBtnClick(): void {
    this._openDropDown = !this._openDropDown;
  }

  private selectedItemClick(event: any): void {
    if (event.isSelected) {
      this._selectedItem = event.data;
      this.addSelectedItem(event.data);
      this.data = [];
    } else {
      this._selectedItem = null;
      this.removeSelectedItem(event.data);
    }

    if (!this.multiselect) {
      this.emitSelectedItem();
    }
  }

  private addSelectedItem(item: any): void {
    let { isExits, indexNo } = this.isItemExists(item.id);
    if (!isExits) this._selectedItems.push(item);
  }

  private removeSelectedItem(item: any): void {
    let { isExits, indexNo } = this.isItemExists(item.id);
    if (isExits) this._selectedItems.splice(indexNo, 1);
  }

  private isItemExists(checkID: string | number): any {
    let indexno: number = 0;
    for (let v of this._selectedItems) {
      if (v.id === checkID) {
        return { isExits: true, indexNo: indexno };
      }
      indexno++;
    }

    indexno = -1;
    return { isExits: false, indexNo: indexno };
  }

  private emitSelectedItems(): void {
    this.getSelectedItems.emit({ type: GET_SELECTED_ITEMS, data: this._selectedItems, instanceId: this.instanceId });
  }

  private emitSelectedItem(): void {
    this.getSelectedItem.emit({ type: GET_SELECTED_ITEM, data: this._selectedItem, instanceId: this.instanceId });
    this.resetSearchInput();
  }

  private emitEnterFunc(): void {
    this.onKeyUp.emit({ type: TEXT_BOX_ON_ENTER, data: this.searchstr });
  }

  private resetSearchInput(): void {
    if (this._selectedItem !== null) {
      this.searchstr = this._selectedItem[this.propName];
    }

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();

  }

}
