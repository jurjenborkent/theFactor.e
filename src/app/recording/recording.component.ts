import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';

import {customPIP} from '../../assets/js/pip.js'

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

    hosts: Observable<any[]>;
    reciever: Observable<any[]>;

    SimplePeer = require('simple-peer')
    wrtc = require('wrtc')

  constructor(public db: AngularFireDatabase, public router: Router) {
    this.hosts = db.list('hosts').valueChanges();
    this.reciever = db.list('reciever').valueChanges();
  }

  ngOnInit() {
    this.db.list('reciever').remove();
    this.reciever.subscribe(data => {
      if(this.peer){
        this.peer.signal(JSON.parse(data.toString()));
      }
    });
  }

  private handleIncomingSignal(data: any) {
    this.db.object('hosts').update({ content: JSON.stringify(data) });
  }

  async startCapture() {
    try {
      let webcam = await navigator.mediaDevices.getUserMedia({ video: true, audio:false })
      let screenRecord = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "motion" } })

      this.peer = new this.SimplePeer({
        initiator: location.hash === '#/recording',
        stream: screenRecord,
        wrtc: this.wrtc,
        trickle: false
      })

      if(webcam){
        this.videoElement.srcObject = webcam
      }
      this.videoElement2.srcObject = screenRecord

      var options = { mimeType: "video/webm; codecs=vp9" };
      this.mediaRecorder = new MediaRecorder(screenRecord, options);

      this.mediaRecorder.ondataavailable = (event : any) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
          this.download();
        }
      }
      this.mediaRecorder.start();

      this.peer.on('signal', (data : any) => {
        this.handleIncomingSignal(data);
      })

      this.peer.on('data', (data : any) => {
        console.log('Received Data: ' + data)
      })

      this.peer.on('stream', (stream : any) => {
        this.videoElement.srcObject = stream
      })
    } catch (error) {
      console.error('ERROR', error)
    }
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

  async PIP(){
    const togglePipButton = this.btnElement
    const video = this.videoElement

    var pip = new customPIP(video, togglePipButton)
  }

  @ViewChild('mybutton', {static: true}) btnElementRef: ElementRef;
  get btnElement(): any {
    return this.btnElementRef.nativeElement
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
