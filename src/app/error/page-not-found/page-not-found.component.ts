import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  firstDigit = 4;
  secondDigit = 0;
  thirdDigit = 4;
  firstRandNumber: any = 0;
  secondRandNumber: any = 0;
  thirdRandNumber: any = 0;
  timer: any = 1;
  constructor() {

  }

  ngOnInit() {
    setInterval(() => {
      if (this.timer <= 15) {
        this.randStatus();
      } else {
        this.showCorrectCode();
      }
      this.timer++;
    }, 100);
  }


  randStatus() {
    this.firstRandNumber = this.randomNum();
    this.secondRandNumber = this.randomNum();
    this.thirdRandNumber = this.randomNum();
  }
  randomNum() {
    return Math.floor(Math.random() * 9) + 1;
  }
  showCorrectCode() {
    this.firstRandNumber = this.firstDigit;
    this.secondRandNumber = this.secondDigit;
    this.thirdRandNumber = this.thirdDigit;
  }
}
