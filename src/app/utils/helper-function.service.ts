import { Injectable } from '@angular/core';

@Injectable()
export class HelperFunction {

  constructor() { }

  convertToDateString(dateStr: string): string {
    let d: Date = new Date(dateStr);
    let mon: string;
    let dstr: string;

    if ((d.getMonth() + 1) < 10) {
     // var m=d.getMonth();
      mon = `0${d.getMonth() + 1}`
    } else {
      mon = `${d.getMonth() + 1}`
    }


    if (d.getDate() < 10) {
      dstr = `0${d.getDate()}`
    } else {
      //var s= d.getDate();
      dstr = `${d.getDate()}`
    }

    return `${d.getFullYear()}-${mon}-${dstr}`;
  }

  convertDateToString(date: string): string {
    let d: Date = new Date(date);
    return `${d.getDate()}-${this.getMonthsArray()[d.getMonth()]}-${d.getFullYear()}`;
  }


  private getMonthsArray(): Array<any> {
    return ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  }

  getCalculatedAge(birthDate) {
    let getDobObj = new Date(birthDate);
    let birthmonth = getDobObj.getMonth();
    let birthDay = getDobObj.getDate();
    let birthYear = getDobObj.getFullYear();
    let todaydate = new Date();
    let todayMonth = todaydate.getMonth();
    let todayDay = todaydate.getDate();
    let currentYear = todaydate.getFullYear();
    let age = currentYear - birthYear;
    if (todayMonth < birthmonth - 1) {
      age--;
    }
    if (birthmonth - 1 === todayMonth && todayDay < birthDay) {
      age--;
    }
    return age;
  }

  dateConvertToMin(date:Date):number{
    return date.getHours()*60 + date.getMinutes();
  }

}
