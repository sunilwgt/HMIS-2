import { Injectable } from '@angular/core';
import { HmisApisService } from '../services/hmis-apis.service';
import { CommonService } from '../services/common.service';
import { StateService } from '../services/state.service';
import { CompLoadManagerService } from './computils/comp-load-manager.service';

@Injectable()
export class BaseServices {

  constructor(public hmisApi:HmisApisService,
              public comonService:CommonService,
              public stateService: StateService,
              public compLoadManager:CompLoadManagerService){

  }
}
