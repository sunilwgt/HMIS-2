import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';

@Component({
  selector: 'app-ottype-list',
  templateUrl: './ottype-list.component.html',
  styleUrls: ['./ottype-list.component.scss']
})
export class OttypeListComponent extends BaseComponent implements OnInit {

  constructor(baseService: BaseServices) {
    super(baseService);

  }

  ngOnInit() {
  }

}
