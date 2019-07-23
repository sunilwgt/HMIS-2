import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { CompDataInfo } from '../../models/registration';
import { PriceListOption } from '../../models/admission';
import { CompData, ComponentInfo } from '../../models/compinfo';
import { HelperFunction } from '../../utils/helper-function.service';
import { RadioData, MODE_VIEW, MODE_EDIT, MODE_STATE, UPDATE_FIELD_STATE, MODAL_ITEM_CLICKED_STATE, UPDATE_FIELD_DATA_STATE, INBUILD_COND, VALIDATE_FIELD_STATE, INVALID_FIELD, VALID_FIELD, CustomErrorInfo, GET_SELECTED_ITEM, MODE_ADD, MODE_CURRENT_DATE_ADD } from '../../models/common';
import { GenericPopup } from '../generic-popup';
import { BaseServices } from '../../utils/base.service';
import { State } from '../../models/state';
import { Subscription } from 'rxjs/Subscription';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hmis-vertical-label-type',
  templateUrl: './vertical-label-type.component.html',
  styleUrls: ['./vertical-label-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLabelTypeComponent implements OnInit, OnDestroy, OnChanges {
  mindate;
  maxdate;
  maxdateforpcalender;
  mindateforpcalender;
  eventmindate;
  eventmaxdate;
  @Input() data: Array<any> = [];
  @Input() templateid: string;
  @Input() labelname: string;
  @Input() placeholderLabel: string;
  @Input() selectOptions: Array<any> = [];
  @Input() radioOptions: Array<RadioData> = [];
  @Input() checkBoxValue: string;
  @Input() showInfoIcon: boolean = false;
  @Input() infoIconClass: string;
  @Input() compInfo: ComponentInfo = null;
  @Input() modalOption: NgbModalOptions;
  @Input() instanceID?: string;
  @Input() errorMessage?: string = "";
  @Input() condition: string = INBUILD_COND;
  @Input() isrequire: boolean = false;
  @Input() fieldValue: any;
  @Input() amount: any;
  @Input() description: any;
  @Input() selectedValue: string;
  @Input() instanceId: string;
  @Input() set isEditable(value: boolean) {
    this._isEditable = value;
  }
  @Input() set propName(value: string) {
    this._dynamicGrpName = "_grp" + value;
    this._propName = value;
  };

  @Input() set showCustomError(value: CustomErrorInfo) {
    if (value) {
      this.showErrorMsg = value.isErrorShow;
      if (!this._fieldState) {
        this._fieldState = this.baseService.stateService.createNewState(VALIDATE_FIELD_STATE);
      }
      this._fieldState.currentstate = value.fieldStatus;
      this._fieldState.stateData = value.data;
      this.errorMessage = value.errorMessage;
    }
  };

  @Input() set updateTabIndex(indexno: number) {
    this.currentTabIndex = indexno;
  }

  @Output() compValueChange: EventEmitter<any>;
  @Output() change: EventEmitter<any>;
  @Output() customValidation: EventEmitter<any>;
  @Output() clickNext: EventEmitter<any>;
  @Output() errorOccur: EventEmitter<any>;
  @Output() getSelectedItem: EventEmitter<any> = new EventEmitter();


  @ViewChild(GenericPopup)
  private genericPopup: GenericPopup;

  private compValue: CompData;
  private gencomp: any = GenericCompType;
  private compDataInfo: CompDataInfo;
  private showErrorMsg: boolean = false;
  private currentTabIndex: number = 0;

  private _dynamicGrpName: string;
  private _propName: string;
  private _isEditable: boolean = true;
  private state: State;
  private _fieldState: State;
  private _stateSubscription: Subscription;
  private _selectedItem: any;
  private searchstr: string = "";
  private priceCompValueInfo: PriceListOption;


  constructor(private helperFunc: HelperFunction, private baseService: BaseServices) {

    this.compValueChange = new EventEmitter();
    this.change = new EventEmitter();
    this.customValidation = new EventEmitter();
    this.clickNext = new EventEmitter();
    this.errorOccur = new EventEmitter();
    this.compDataInfo = new CompDataInfo();
    this.priceCompValueInfo = new PriceListOption();
    this.compValue = new CompData();
    this.state = this.baseService.stateService.createState(MODE_STATE);
    this._stateSubscription = this.baseService.stateService.stateObserver.subscribe(data => {
      if (data && data.stateID === UPDATE_FIELD_STATE) {

        if (data.currentstate === this._propName && data.stateData[data.currentstate] !== undefined) {
          this.updateFieldValue(data.stateData);
        }
      }

      if (data && this.instanceID
        && this.instanceID === data.instanceID
        && data.stateID === MODAL_ITEM_CLICKED_STATE) {
        this.compValue.fieldValue = data.stateData.label;
        this.genericPopup.closePopup();
        this.onModelChange(data.stateData.value);
      }

      if (data && data.stateID === UPDATE_FIELD_DATA_STATE) {
        this.updateFieldValue(this.state.stateData);

      }

      if (data && data.stateID === VALIDATE_FIELD_STATE) {
        if (this.templateid === GenericCompType[GenericCompType.Compradio]) {
          this.checkValidationCond(this.compDataInfo, undefined, true);
        } else {
          this.checkValidationCond(this.compDataInfo);
        }
      }

    })
  }

  ngOnInit() {
    if (this.isrequire) {
      this._fieldState = this.baseService.stateService.createNewState(VALIDATE_FIELD_STATE);
      if (this.state.currentstate !== MODE_EDIT && this.state.currentstate !== MODE_VIEW) {
        this._fieldState.currentstate = INVALID_FIELD;
      } else {
        this._fieldState.currentstate = VALID_FIELD;
      }
      this.baseService.stateService.registerState(this._fieldState);

    }

    if (this.selectOptions && this.selectOptions.length > 0) {
      this.compValue.fieldValue = 0;
    }

    if (this.state.currentstate === MODE_EDIT && this.state.stateData[this._propName] !== undefined) {

      this.updateFieldValue(this.state.stateData);
    }
    if (this.state != undefined) {
      if (this.state.currentstate === MODE_CURRENT_DATE_ADD && this.state.stateData !== undefined) {
        this.updateFieldValue(this.state.stateData);
      }
    }

    if (this.state.currentstate === MODE_VIEW) {
      if (this.state.stateData[this._propName] !== undefined) {
        this.updateFieldValue(this.state.stateData);
      }
      this._isEditable = false;
    }
    if (this.fieldValue && this.fieldValue.length) {
      this.compValue.fieldValue = this.fieldValue;
    }
    this.pcalenderdate()
  }

  ngOnChanges() {
    if (this.fieldValue && this.fieldValue.length) {
      this.compValue.fieldValue = this.fieldValue;
    }
  }

  gettodaydate() {
    const data = new Date();
  }
  private updateFieldValue(statedata: any): void {

    if (this.templateid === GenericCompType[GenericCompType.Compbillrow]) {
      this.compValue.fieldValue = 0;
    }
    else if (this.templateid === GenericCompType[GenericCompType.Compdate]) {
      this.compValue.fieldValue = this.helperFunc.convertToDateString(statedata[this._propName]);
    }
    else if (this.templateid === GenericCompType[GenericCompType.Compdatepast]) {
      this.compValue.fieldValue = this.helperFunc.convertToDateString(statedata[this._propName]);

    } else if (this.templateid === GenericCompType[GenericCompType.Compdatebetween]) {
      this.compValue.fieldValue = this.helperFunc.convertToDateString(statedata[this._propName]);
    }
    else if (this.templateid === GenericCompType[GenericCompType.Compbillselectrow]) {

    }

    else if (this.templateid === GenericCompType[GenericCompType.Compradio]) {

      for (let v of this.radioOptions) {
        if (v.value === statedata[this._propName]) {
          v.checked = true;
          break;
        }
      }
    }
    else {
      this.compValue.fieldValue = statedata[this._propName];

    }
  }

  settimeinformatwithdb(e) {
    var da = new Date(e);
    var h: any = da.getHours();
    var m: any = da.getMinutes();
    var s: any = da.getSeconds();

    if (h < 10) {
      h = '0' + h;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }

    let finaltime = h + ":" + m + ":" + s;

    return finaltime


  }
  settimeinformat(e) {
    var da = new Date();
    var h: any = da.getHours();
    var m: any = da.getMinutes();
    var s: any = da.getSeconds();
    var hours: any = (h + 24) % 24;
    var mid = 'AM';
    if (hours == 0) { //At 00 hours we need to show 12 am
      hours = 12;
    }
    else if (hours > 12) {
      hours = hours % 12;
      mid = 'PM';
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }

    let finaltime = hours + ":" + m + ":" + s + " " + mid

    return finaltime


  }

  private onModelChange(evt: any, item: any = null) {
    if (this.templateid === GenericCompType[GenericCompType.Compdate]) {
      evt = this.helperFunc.convertDateToString(evt);

      this.compDataInfo.extraprops = {
        calculatedAge: this.helperFunc.getCalculatedAge(evt)
      }
    }
    if (this.templateid === GenericCompType[GenericCompType.pdatewithtime]) {
      // 2019-07-22T18:05:53
      let time = this.settimeinformatwithdb(evt);
      let a = this.helperFunc.convertDateToStringyearfirst(evt);
      evt = a + "T" + time

      // this.compDataInfo.extraprops = {
      //   calculatedAge: this.helperFunc.getCalculatedAge(evt)
      // }
    }
    if (this.templateid === GenericCompType[GenericCompType.Compdatepast]) {
      this.setmaxdate(evt, this.mindate, this.maxdate)
      // evt = this.helperFunc.convertDateToString(evt);
      // this.compDataInfo.extraprops = {
      //   calculatedAge: this.helperFunc.getCalculatedAge(evt)
      // }
    }
    if (item != null) {
      this.priceCompValueInfo.label = item.label;
      this.priceCompValueInfo.value = item.value;
    } else {
      this.compDataInfo.propname = this._propName;
      this.compDataInfo.newval = evt;
      this.checkValidationCond(this.compDataInfo);
      this.compValueChange.emit(this.compDataInfo);

    }

  }
  onchange(item) {
    var data = {
      price: item.value,
      label: item.label
    }
    this.change.emit(data);
  }

  private onClickModelChange(radiovalue: any): void {
    this.compDataInfo.propname = this._propName;

    if (radiovalue.target.value === "true" || radiovalue.target.value === "false") {
      this.compDataInfo.newval = radiovalue.target.value === "true" ? true : false;
    } else {
      this.compDataInfo.newval = radiovalue.target.value;
    }

    this.checkValidationCond(this.compDataInfo, radiovalue, true);
    this.compValueChange.emit(this.compDataInfo);
  }

  private showIconInfoDetails(): void {
    if (this.compInfo !== null) {
      this.genericPopup.openPopup(this.compInfo);
    }
  }

  private checkValidationCond(cdatainfo: CompDataInfo, radioObj: any = undefined, isradio: boolean = false): void {
    if (this.isrequire) {
      if (this.condition === INBUILD_COND) {
        this.setErrors(cdatainfo, radioObj, isradio);
      } else {
        this.customValidation.emit(cdatainfo);
      }
    }
  }

  private setErrors(cdatainfo: CompDataInfo, radioObj: any = undefined, isradio: boolean = false): void {
    if (radioObj && radioObj.target.value === "") {
      this.showErrorMsg = true;
      this._fieldState.currentstate = INVALID_FIELD;
      this._fieldState.stateData = cdatainfo;
      this.errorOccur.emit({ type: "Error", data: cdatainfo })
    } else if (!radioObj && (!this.compValue.fieldValue || this.compValue.fieldValue === "")) {
      this.showErrorMsg = true;
      this._fieldState.currentstate = INVALID_FIELD;
      this._fieldState.stateData = cdatainfo;
      this.errorOccur.emit({ type: "Error", data: cdatainfo })
    } else {
      this.showErrorMsg = false;
      this._fieldState.currentstate = VALID_FIELD;
      this._fieldState.stateData = cdatainfo;
    }

    if (this.templateid === GenericCompType[GenericCompType.Compselect]
      && this.compValue.fieldValue === 0) {
      this.showErrorMsg = true;
      this._fieldState.currentstate = INVALID_FIELD;
      this._fieldState.stateData = cdatainfo;
      this.errorOccur.emit({ type: "Error", data: cdatainfo })
    }

    // Hack:[avik] if any radio button is requre then at edit mode radio error msg should not come
    // at any condition because user couldn't remove radio button selection.
    if (this.state.currentstate === MODE_EDIT && isradio) {
      this.showErrorMsg = false;
      this._fieldState.currentstate = VALID_FIELD;
      this._fieldState.stateData = cdatainfo;
    }
  }

  private onClickNextBtn(): void {
    this.currentTabIndex++;
    this.clickNext.emit(this.currentTabIndex);
  }

  ngOnDestroy() {
    this._stateSubscription.unsubscribe();
  }


  private selectedItemClick(event: any): void {
    if (event.isSelected) {
      this._selectedItem = event.data;
    } else {
      this._selectedItem = null;
    }

    this.emitSelectedItem();

    this.compValue.fieldValue = event.data.label;
    this.compValue.amount = event.data.others;
  }


  private emitSelectedItem(): void {
    this.getSelectedItem.emit({ type: GET_SELECTED_ITEM, data: this._selectedItem, instanceId: this.instanceId });
    this.resetSearchInput();
  }

  private resetSearchInput(): void {
    if (this._selectedItem !== null) {
      this.searchstr = this._selectedItem[this.propName];
      // this.searchstr = this._selectedItem.value;
      // this.propId = this._selectedItem.id;
    }

  }

  date(e) {
    const date = new Date();
    let day: any = date.getDate();
    let m: any = date.getMonth() + 1;
    let y = date.getFullYear();
    if (m < 10) {
      m = '0' + m;
    }
    if (day < 10) {
      day = '0' + day;
    }
    const maxyear = (y + 50);
    const min = y + '-' + m + '-' + day;
    const max = maxyear + '-' + m + '-' + day;
    this.mindate = min;
    this.maxdate = max;

  }

  setmaxdate(e, mind, maxd) {
    const eventdate = new Date(e);
    let day: any = eventdate.getDate();
    let m: any = eventdate.getMonth() + 1;
    let y = eventdate.getFullYear();
    if (m < 10) {
      m = '0' + m;
    }
    if (day < 10) {
      day = '0' + day;
    }

    // const maxyear = (y + 50);
    const min = mind
    const max = y + '-' + m + '-' + day;
    this.eventmindate = min;
    this.eventmaxdate = max;
    var input = document.getElementById("Compdatebetween");
    input.setAttribute("min", this.eventmindate);
    input.setAttribute("max", this.eventmaxdate);

  }




  pcalenderdate() {
    // const date = new Date();
    // let day: any = date.getDate();
    // let m: any = date.getMonth() + 1;
    // let y = date.getFullYear();
    // if (m < 10) {
    //   m = '0' + m;
    // }
    // if (day < 10) {
    //   day = '0' + day;
    // }
    // const maxyear = (y + 50);
    // const min = y + '-' + m + '-' + day;
    // const max = maxyear + '-' + m + '-' + day;
    // this.mindateforpcalender = min;
    // this.maxdateforpcalender = max;

  }

  afunc() {

    let date = new Date();
    let day: any = date.getDate();
    let m: any = date.getMonth() + 1;
    let y = date.getFullYear();
    if (m < 10) {
      m = '0' + m;
    }
    if (day < 10) {
      day = '0' + day;
    }
    const maxyear = (y + 50);
    const min = y + '-' + m + '-' + day;
    const max = maxyear + '-' + m + '-' + day;
    this.mindateforpcalender = min;
    this.maxdateforpcalender = max;


  }
}
