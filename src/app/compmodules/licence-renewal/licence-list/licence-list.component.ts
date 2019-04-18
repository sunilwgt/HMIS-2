import { Component, OnInit } from '@angular/core';
import { HmisApisService} from '../../../services/hmis-apis.service';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';

import { Subscription } from 'rxjs/Subscription';
import { CompLoadManagerService } from '../../../utils/computils/comp-load-manager.service';
import { RL_LICENCE } from '../../../models/common';

@Component({
  selector: 'app-licence-list',
  templateUrl: './licence-list.component.html',
  styleUrls: ['./licence-list.component.scss']
})
export class LicenceListComponent implements OnInit {

  private compData: LicenceListComponent;
  private _subscription: Subscription;
  private licence = [];
  private licenceResource = new DataTableResource([]);
  private licenceCount = 0;

  constructor(private hmisApi: HmisApisService, private compLoadManager: CompLoadManagerService) {


   }


   reloadDepartments(params) {
    //his.patientsResource.query(params).then(patients => this.patients = patients);

  }

// special params:
translations = <DataTableTranslations>{
  indexColumn: 'Index column',
  expandColumn: 'Expand column',
  selectColumn: 'Select column',
  paginationLimit: 'Max results',
  paginationRange: 'Result range'
};

private addlicence(): void {
  this.compLoadManager.redirect(RL_LICENCE);
}

ngOnInit() {
  //console.log(films);
}

ngOnDestroy() {


}

}
