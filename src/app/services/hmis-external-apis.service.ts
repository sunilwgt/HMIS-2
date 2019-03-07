import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoaderService } from './loader.service';
import {  RESULT_ERROR} from '../models/common';


const EXTERNAL_URL: string = "http://132.148.142.78:5001";

const REQUEST_GET: string = "GET";
const REQUEST_POST: string = "POST";
const REQUEST_PUT: string = "PUT";
const REQUEST_DELETE: string = "DELETE";

@Injectable()
export class HmisExternalApisService {


  private _result: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private hmisHttp: HttpClient, private loader: LoaderService) { }

  public loadProfileImage(reqObj:any, filename=undefined) {
    let urlstr: string = `${EXTERNAL_URL}/uploadProfileImg`;
    let formdata: FormData = new FormData();
    if(filename){
      formdata.append("docs", reqObj, filename);
    }else{
      formdata.append("docs", reqObj);
    }

    this.genericApiCall(urlstr, "imageUploaded", formdata, REQUEST_POST);
  }

  private genericApiCall(url, rtype: string,
    bodydata: any = null,
    requesttype: string = REQUEST_GET,
    activeLoader: boolean = true) {
    if (activeLoader) this.loader.showLoader = true;


    const httpOpt = {
     headers: new HttpHeaders().set( 'Content-Type', 'multipart/form-data')

      //headers: new HttpHeaders().set("Token", "869d5a33-265e-4e5a-a039-d445582a0732")
    };

    switch (requesttype) {
      case REQUEST_GET:
        this.hmisHttp.get(url).subscribe(
          data => {
            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

      case REQUEST_POST:
        this.hmisHttp.post(url, bodydata).subscribe(
          data => {
            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

      case REQUEST_PUT:
        this.hmisHttp.put(url, bodydata).subscribe(
          data => {
            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

      case REQUEST_DELETE:
        this.hmisHttp.delete(url).subscribe(
          data => {
            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

    }


  }

  private handleError(error: any, requestid: string) {
    this.loader.showLoader = false;
    this._result.next({ resulttype: RESULT_ERROR, result: error, requestid: requestid });
    console.log(error)
  }


  get apiResults() {
    return this._result.asObservable();
  }


}
