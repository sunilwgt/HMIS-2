import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HmisExternalApisService } from '../../services/hmis-external-apis.service';
import { ImageConverter } from '../../utils/image-converter';

const UPLOAD_IMAGE:string = "Upload Image";
const TAKE_SCREENSHOT:string = "Take screenshot";

@Component({
  selector: 'hmis-imgcapture',
  templateUrl: './imgcapture.component.html',
  styleUrls: ['./imgcapture.component.scss']
})
export class ImgcaptureComponent implements OnInit, OnDestroy {

  @ViewChild('videoElement') videoElement: any;
  @ViewChild('canvasElement') canvasElement: any;
 // @ViewChild('image_upload_preview') imgElement: any;

  private _videoRef:any;
  private _canvasRef:any;
  private _imgRef:any;
  private _videoStated:boolean = true;
  private _alreadyInitialized:boolean = false;
  private _btnLabel:string = UPLOAD_IMAGE;
  private _storeVidStream:any;
  private _showImg:boolean = true;

  constructor(private externalApi:HmisExternalApisService) { }

  ngOnInit() {
    this._videoRef = this.videoElement.nativeElement;
    this._canvasRef = this.canvasElement.nativeElement;
  //  this._imgRef = this.imgElement.nativeElement;
  }

  private imgProcessHandler():void{
    this._videoStated = !this._videoStated;
    if(!this._videoStated){
     this._showImg = true;
     this._btnLabel = TAKE_SCREENSHOT;
     if(!this._alreadyInitialized){
      this.initializeCamera({ video: true, audio: false });
     }else{
      this._videoRef.play();
     }

    }else{
      this._showImg = false;
      this._btnLabel = UPLOAD_IMAGE;
      this._videoRef.pause();
      this.takeSnapshot();
    }
  }

  private initializeCamera(config:any) {
     this._alreadyInitialized = true;
      var browser = <any>navigator;
      browser.getUserMedia = (browser.getUserMedia ||
        browser.webkitGetUserMedia ||
        browser.mozGetUserMedia ||
        browser.msGetUserMedia);

      browser.mediaDevices.getUserMedia(config).then(stream => {
        this._videoRef.srcObject  = stream;
        this._storeVidStream = stream;
        this._videoRef.onloadedmetadata = (e =>{
          this._videoRef.play();
         })
      });

  }


  private takeSnapshot(){
    this._canvasRef.width = this._videoRef.videoWidth;
    this._canvasRef.height = this._videoRef.videoHeight;
    this._canvasRef.getContext('2d').drawImage(this._videoRef, 0, 0);

    // let blobData = new Blob([this._canvasRef.toDataURL()], { type: "multipart/form-data"})
    let blobData = new ImageConverter(this._canvasRef.toDataURL('image/jpeg', 0.5)).dataURItoBlob();
    //this._imgRef.src = this._canvasRef.toDataURL();
   // console.log(this._imgRef.src);
    this.externalApi.loadProfileImage(blobData, "patientimage.jpg");
   // console.log(this._canvasRef.toDataURL())
   //
  }

  ngOnDestroy() {
    this._videoRef = null;
    this._canvasRef = null;
    if(this._storeVidStream !== undefined){
      this._storeVidStream.getTracks().map(function (val) {
        val.stop();
      });
    }
  }

}
