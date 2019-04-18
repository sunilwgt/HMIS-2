import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoaderService } from './loader.service';
import {  RESULT_ERROR} from '../models/common';


const EXTERNAL_URL: string = "http://132.148.142.78:5001";
const externalurl:string = "https://hmismultitenantwebapi.azurewebsites.net/api/File/UploadToAzureFileStorage?containerName=4F4436FD-4BCB-412A-AE30-60E917C768DB"
const getfileurl:string = "https://hmismultitenantwebapi.azurewebsites.net/api/File/GetAllFilesByPatient?containername=4F4436FD-4BCB-412A-AE30-60E917C768DB";
const REQUEST_GET: string = "GET";
const REQUEST_POST: string = "POST";
const REQUEST_PUT: string = "PUT";
const REQUEST_DELETE: string = "DELETE";

@Injectable()
export class HmisExternalApisService {


  private _result: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private hmisHttp: HttpClient, private loader: LoaderService) { }

  public loadProfileImage(reqObj:any, filename=undefined) {
    let urlstr: string = `${externalurl}`;
    let formdata: FormData = new FormData();
    if(filename){
      formdata.append("docs", reqObj, filename);
    }else{
    }
    this.genericApiCall(urlstr, "imageUploaded", formdata, REQUEST_POST);
  }

  getfiles(){
    let urlstr: string = `${getfileurl}`;
    this.genericApiCall(urlstr, "imageDownload", '', REQUEST_GET);

  }


  private genericApiCall(url, rtype: string,
    bodydata: any,
    requesttype: string = REQUEST_GET,
    activeLoader: boolean = true) {

    if (activeLoader) this.loader.showLoader = true;
    const httpOpt = {
     headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
     .set("Token", '435f65d5-ea2e-495f-9816-12f038213cb6').set("Tenant_Key", "MedicareDb")

      //headers: new HttpHeaders().set("Token", "869d5a33-265e-4e5a-a039-d445582a0732")
    };
    const httpoption  =  { headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    .set("Token", 'f17796e9-7d8f-460e-9740-29bb2bc1357e')
    .set("Tenant_Key", "MedicareDb")
    };
    switch (requesttype) {
      case REQUEST_GET:
        this.hmisHttp.get(url ,httpoption).subscribe(
          data => {
            console.log('getdata' , data);
            if (activeLoader) this.loader.showLoader = false;
            this._result.next({ resulttype: rtype, result: data });
          },
          error => {
            this.handleError(error, rtype);
          }
        );
        break;

      case REQUEST_POST:
        this.hmisHttp.post(url, bodydata, httpoption).subscribe(
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
    // console.log(error)
  }


  get apiResults() {
    return this._result.asObservable();
  }


}
