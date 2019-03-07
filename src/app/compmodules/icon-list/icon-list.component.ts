import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {
  @Input() set imageName(value:string){
    this.imgPath = `${this.basePath}${value}.png`;
  }

  private imgPath:string;
  private basePath:string = 'app/images/'
  constructor() { }

  ngOnInit() {
  }

}
