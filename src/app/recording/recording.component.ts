import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Instance, SignalData } from 'simple-peer'

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

    async ngOnInit() {}
    connect() {
      this.peer.signal(this.targetpeer);
    }


    async startCapture() {
      try {
        const SimplePeer = require('simple-peer')
        const wrtc = require('wrtc')

        // This peer is the initiator and transfering the streaming to the other connected peer
        if (location.hash === '#/recording#init') {
          let webcam = await navigator.mediaDevices.getUserMedia({ video: true, audio:true })
          let screenRecord = await navigator.mediaDevices.getDisplayMedia({ video: { cursor:"motion" } })
          this.peer = new SimplePeer({
            initiator: location.hash === '#/recording#init',
            stream: screenRecord,
            wrtc: wrtc,
            trickle: false
          })
          this.videoElement.srcObject = webcam
          this.videoElement2.srcObject = screenRecord
        }
        else {
          this.peer = new SimplePeer({ wrtc:wrtc })
        }
        // triggers when signal is sent from remote
        this.peer.on('signal', function (data) {
          console.log(JSON.stringify(data));
        })
        this.peer.on('data', (data) => {
          console.log('Received Data: ' + data)
        })
        this.peer.on('stream', (stream) => {
          // got remote video stream, now let's show it in a video tag
          this.videoElement.srcObject = stream

        })
      } catch (error) {
        console.error('ERROR',error)
      }
    }
    stopCapture() {
      if(this.videoElement.srcObject){
        let webcamTracks = (<MediaStream>this.videoElement.srcObject).getTracks();
        let screenRecordTracks = (<MediaStream>this.videoElement2.srcObject).getTracks();

        webcamTracks.forEach(track => track.stop());
        screenRecordTracks.forEach(track => track.stop());

        this.videoElement.srcObject = null;
        this.videoElement2.srcObject = null;
      }
    }


    @ViewChild('myvideo', {static: true}) videoElementRef: ElementRef;
    get videoElement(): HTMLVideoElement {
      return this.videoElementRef.nativeElement
    }
    @ViewChild('myvideo2', {static: true}) videoElementRef2: ElementRef;
    get videoElement2(): HTMLVideoElement {
      return this.videoElementRef2.nativeElement
    }
  }
