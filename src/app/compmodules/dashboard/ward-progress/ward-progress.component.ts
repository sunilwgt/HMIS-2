import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hmis-ward-progress',
  template: `
    <h4 class="card-title">Ward</h4>

    <div class="ward" *ngFor="let i of items">
    <p class="">{{i.label}} <span class="pull-right">30%</span></p>
    <ngb-progressbar type="erro" [value]="i.value" height=".3rem"></ngb-progressbar>
    </div>`,
  styleUrls: ['./ward-progress.component.scss']
})
export class WardProgressComponent implements OnInit {

  @Input() items:Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
