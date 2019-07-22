import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoaderService } from './loader.service';
import {  RESULT_ERROR, RESULT_TYPE_GET_IMAGE_REGISTERATION} from '../models/common';
import { HmisApisService } from './hmis-apis.service';


const EXTERNAL_URL: string = "http://132.148.142.78:5001";

const patientimageuploadurl:string = "https://hmismultitenantwebapi.azurewebsites.net/api/";

const externalurl:string = "https://hmismultitenantwebapi.azurewebsites.net/api/File/UploadToAzureFileStorage?containerName=4F4436FD-4BCB-412A-AE30-60E917C768DB"
const getfileurl:string = "https://hmismultitenantwebapi.azurewebsites.net/api/File/GetAllFilesByPatient?containername=4F4436FD-4BCB-412A-AE30-60E917C768DB";
const REQUEST_GET: string = "GET";
const REQUEST_POST: string = "POST";
const REQUEST_PUT: string = "PUT";
const REQUEST_DELETE: string = "DELETE";

@Injectable()
export class HmisExternalApisService {
  private imageblob: any;

  private _result: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private hmisHttp: HttpClient, private loader: LoaderService , private hmisapiservice:HmisApisService) { }


  setimageblob(blob) {
    this.imageblob = blob;
  }
  getimageblob(){
    return this.imageblob;
  }

  public loadProfileImage(reqObj:any, id ,filename=undefined ) {
    let urlstr: string = `${patientimageuploadurl}File?patient_id=${id}`;
    // let urlstr = "https://hmismultitenantwebapi.azurewebsites.net/api/File?patient_id=a4799f1d-b90d-4a30-bb0d-423fed69b150"
    let formdata: FormData = new FormData();
    if(filename){
      formdata.append("docs", reqObj, filename);
      console.log('form data1' , filename)
    }else{
      console.log('form else' , filename)
      formdata.append("docs", reqObj , reqObj.name);
    }

    // formdata.append('myFile' , reqObj , reqObj.name)
    console.log('form data2' , formdata)
    this.genericApiCalll(urlstr, "imageUploaded", formdata, REQUEST_POST);
  }

  getfiles(id){
    let urlstr: string =`${patientimageuploadurl}File/GetAllFilesByPatient?containername=${id}`;
    this.genericApiCalll(urlstr, "imageDownload", '', REQUEST_GET);

  }

  getregisterationfiles(id){
    let urlstr: string =`${patientimageuploadurl}File/GetAllFilesByPatient?containername=${id}`;
    this.genericApiCalll(urlstr, RESULT_TYPE_GET_IMAGE_REGISTERATION, '', REQUEST_GET);
  }


  private genericApiCalll(url, rtype: string,
    bodydata,
    requesttype: string = REQUEST_GET,
    activeLoader: boolean = true) {
console.log('bodydata' , url ,rtype , bodydata)
    if (activeLoader) this.loader.showLoader = true;
    // const httpOpt = {
    //  headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    //  .set("Token", '435f65d5-ea2e-495f-9816-12f038213cb6').set("Tenant_Key", "MedicareDb")

    //   //headers: new HttpHeaders().set("Token", "869d5a33-265e-4e5a-a039-d445582a0732")
    // };

    let Token = this.hmisapiservice._hmistoken; 
    console.log('token' , Token);
    const httpoption  =  { headers: new HttpHeaders()
    .set("Token", Token)
    .set("Tenant_Key", "MedicareDb")
  
    }
    console.log('httpoption' , httpoption);
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
            console.log('image upload data' , data);
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
