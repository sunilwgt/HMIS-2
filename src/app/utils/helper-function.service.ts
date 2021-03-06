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

  convertDateToStringyearfirst(d: string): string {
    let date = new Date(d);
    let day: any = date.getDate();
    let m: any = date.getMonth() + 1;
    let y = date.getFullYear();
    if (m < 10) {
      m = '0' + m;
    }
    if (day < 10) {
      day = '0' + day;
    }

    console.log('weli' , date , m , y)
    let final = y+'-'+ m+'-'+day
    return final;

    // return `${d.getFullYear()}-${this.getMonthsArray()[d.getMonth()]}-${d.getDate()}`;


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

    let bmonth = birthmonth + 1;
    let cmonth = todayMonth + 1;
    let finalmonth = cmonth - bmonth;
    if (todayMonth < birthmonth - 1) {
      age--;
    }
    if (birthmonth - 1 === todayMonth && todayDay < birthDay) {
      age--;
    }
    return {age:age , month:finalmonth};
  }

  dateConvertToMin(date:Date):number{
    return date.getHours()*60 + date.getMinutes();
  }

}
