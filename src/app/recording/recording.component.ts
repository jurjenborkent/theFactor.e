import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Instance, SignalData } from 'simple-peer';
import { AngularFireDatabase } from '@angular/fire/database';
import { AnyTxtRecord } from 'dns';
import { Observable } from 'rxjs'




@Component({
  moduleId: module.id,
  selector: 'app-recording',
  templateUrl: 'recording.component.html',
  styleUrls: [
    'recording.component.scss'
  ]
})
export class RecordingComponent implements OnInit {

  targetpeer: any;
  peer: any;
  stream: MediaStream
  mediaRecorder: any
  recordedChunks: BlobPart[] = new Array()
  connectObject: any;

  items: Observable<any[]>;
  itemValue: '';



  constructor(public db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }
  ngOnInit() {
  }

  private handleIncomingSignal(data: any) {
    this.db.list('items').push({ content: data});
}

  onSubmit() {
    this.db.list('items').push({ content: this.itemValue });
  }

  async startCapture(db: AngularFireDatabase) {
    try {
      const SimplePeer = require('simple-peer')
      const wrtc = require('wrtc')

      if (location.hash === '#/recording#init') {
        // let webcam = await navigator.mediaDevices.getUserMedia({ video: true, audio:true })
        let screenRecord = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "motion" } })
        this.peer = new SimplePeer({
          initiator: location.hash === '#/recording#init',
          stream: screenRecord,
          wrtc: wrtc,
          trickle: false
        })

        // this.videoElement.srcObject = webcam
        this.videoElement2.srcObject = screenRecord

        var options = { mimeType: "video/webm; codecs=vp9" };
        this.mediaRecorder = new MediaRecorder(screenRecord, options);

        this.mediaRecorder.ondataavailable = (event) => {
          console.log("data-available");
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
            console.log(this.recordedChunks);
            this.download();
          }
        }
        this.mediaRecorder.start();
      }
      else {
        this.peer = new SimplePeer({ wrtc: wrtc })
      }
      this.peer.on('signal', (data) => this.handleIncomingSignal(data));
      
      this.peer.on('data', (data) => {
        console.log('Received Data: ' + data)
      })
      this.peer.on('stream', (stream) => {
        this.videoElement.srcObject = stream
      })
    } catch (error) {
      console.error('ERROR', error)
    }
  }
  connect() {
    this.peer.signal(this.targetpeer);
  }
  download() {
    var blob = new Blob(this.recordedChunks, {
      type: "video/webm"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = "screencapture.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  stopCapture() {
    if (this.videoElement.srcObject) {
      let webcamTracks = (<MediaStream>this.videoElement.srcObject).getTracks();
      let screenRecordTracks = (<MediaStream>this.videoElement2.srcObject).getTracks();

      webcamTracks.forEach(track => track.stop());
      screenRecordTracks.forEach(track => track.stop());

      this.videoElement.srcObject = null;
      this.videoElement2.srcObject = null;


      this.mediaRecorder.stop();
    }
  }
  @ViewChild('myvideo', { static: true }) videoElementRef: ElementRef;
  get videoElement(): HTMLVideoElement {
    return this.videoElementRef.nativeElement
  }
  @ViewChild('myvideo2', { static: true }) videoElementRef2: ElementRef;
  get videoElement2(): HTMLVideoElement {
    return this.videoElementRef2.nativeElement
  }
}
