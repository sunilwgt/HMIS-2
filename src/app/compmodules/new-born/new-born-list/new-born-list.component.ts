import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { NewBorn } from '../../../models/opd';
import { BaseServices } from '../../../utils/base.service';
import { ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RL_NEW_BORN, RESULT_TYPE_GET_NEW_BORN_LIST, MODE_ADD, RESULT_TYPE_DELETE_NEW_BORN, RESULT_TYPE_GET_NEW_BORN_LIST_DATEWISE } from '../../../models/common';
import { DatePipe } from '@angular/common';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { Angular2Csv } from 'angular2-csv';




@Component({
  selector: 'app-new-born-list',
  templateUrl: './new-born-list.component.html',
  styleUrls: ['./new-born-list.component.scss']
})
export class NewBornListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  private csvdata = []
  private isreadonly = true;
  private newBorn = [];
  private newBornResource = new DataTableResource([]);
  private newBornCount = 0;
  private dateValuefrom;
  private dateValueto;
  private convertedfromdate;
  private convertedtodate;
  modalOption: NgbModalOptions;
  private modalRef: NgbModalRef;
  closeResult: any;
  private displaydialog: boolean = false;
  private clickdialog: boolean = false;
  private rowdata: any;

  constructor(baseService: BaseServices, private snackbar: MatSnackBar,
    public datepipe: DatePipe, private modalServices: NgbModal) {
    super(baseService);
    // this.hmisApi.getNewBornSearch("");
  }

  hmisApiSubscribe(data: any): void {
    // if (data.resulttype === RESULT_TYPE_GET_NEW_BORN_LIST) {
    //   this.newBorn = data.result;
    //   this.arrangeDataForNewBorn(data.result);
    //   this.newBornResource = new DataTableResource(this.newBorn);
    //   this.newBornResource.count().then(count => {
    //     this.newBornCount = count;
    //   });
    // }

    if (data.resulttype === RESULT_TYPE_GET_NEW_BORN_LIST_DATEWISE) {
      this.newBorn = data.result;
      this.arrangeDataForNewBorn(data.result);
      this.newBornResource = new DataTableResource(this.newBorn);
      this.newBornResource.count().then(count => {
        this.newBornCount = count;
      });
    }
    if (data.resulttype === RESULT_TYPE_DELETE_NEW_BORN) {
      // this.hmisApi.getNewBornSearch("");
      this.getdate()
      this.hmisApi.getnewborndatewise(this.convertedfromdate, this.convertedtodate, '');
    }
  }

  private arrangeDataForNewBorn(result) {
    for (let key in result) {
      if (this.newBorn[key].dob !== null) {
        var dateOfBirth = this.newBorn[key].dob.split("T");
        this.newBorn[key]['baby_dob'] = this.datepipe.transform(dateOfBirth[0], 'dd-MM-yyyy');
      }

    }
  }

  reloadNewBorn(params) {
    this.newBornResource.query(params).then(newBorn => this.newBorn = newBorn);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  ongridclick(e, con) {
    if (this.clickdialog === false) {
      this.displaydialog = true;
      this.rowdata = e.row.item;
      this.open(con)
    }
  }

  open(content) {
    this.modalRef = this.modalServices.open(content, { size: 'lg' })
  }
  closemodal(reason) {
    this.modalRef.close()
  }


  private ClickEventHandler(eventObj: ActionType, mode, item): void {
    this.clickdialog = true;
    setInterval(() => {
      this.clickdialog = false;
    }, 1);

    switch (mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_NEW_BORN);
        this.state.currentstate = MODE_EDIT;
        var date = new Date(item.dob);
        item.dob = date;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_NEW_BORN);
        this.state.currentstate = MODE_VIEW;
        var date = new Date(item.dob);
        item.dob = date;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        break;

      case MODE_DELETE:
        this.hmisApi.deleteNewBornAsPerId(item.ID);
        break;
    }
  }


  private addNewBorn(): void {
    const a = this.comonService.getpermissionrole();
    if (a === 'readonly') {
      this.snackbar.open('Not Allowed', 'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
    } else {
      this.state.currentstate = MODE_ADD;
      this.compLoadManager.redirect(RL_NEW_BORN);
    }


  }

  ngOnInit() {
    this.compLoadManager.setHeaderTitle('New Born')

    const a = this.comonService.getpermissionrole();
    if (a === 'readonly') {
      this.isreadonly = true;
    } else {
      this.isreadonly = false;

    }
    this.getdate()
    this.hmisApi.getnewborndatewise(this.convertedfromdate, this.convertedtodate, '');
  }


  searchPatient() {
    this.convertdate();
    this.hmisApi.getnewborndatewise(this.convertedfromdate, this.convertedtodate, '');

  }

  getdate() {
    const data = new Date();
    this.dateValuefrom = data;
    this.dateValueto = data;
    this.convertdate();
  }



  convertdate() {
    const a = this.comonService.convertdate(this.dateValuefrom, this.dateValueto)
    this.convertedfromdate = a.from;
    this.convertedtodate = a.to;
    this.setdate(this.convertedfromdate, this.convertedtodate);
  }

  setdate(f, t) {
    this.comonService.setdatefornewbornsearch(f, t)
  }



  exportToCSV() {

    _.forEach(this.newBorn, (value, key) => {
      var newArray: any = {
        "patient_registration_no": value.patient_registration_no,
        "admission_sequence": value.admission_sequence,
        "baby_alias_name": value.baby_alias_name,
        "mother_name": value.mother_name,
        "father_name": value.father_name,
        "sex": value.sex,
        "baby_dob": value.baby_dob,
        "baby_height": value.baby_height,
        "baby_weight": value.baby_weight,
        "critical_illness_note": value.critical_illness_note,
        "delivery_note": value.delivery_note,
        "delivery_type_name": value.delivery_type_name,


      };
      this.csvdata.push(newArray);
    });
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      headers: ["Registeration Number", "Admission No.", "Baby Name.", "Mother Name", "Father Name", "Baby Gender", "Baby Dob", "Baby Height", "Baby Weight", "Critical illness note", "Delievery Note", "Delievery Type Name"]
    };
    new Angular2Csv(this.csvdata, 'New Born list', options);
  }

}
