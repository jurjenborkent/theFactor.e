import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Instance, SignalData } from 'simple-peer'

import { VideoJSRecordComponent } from './videojs.record.component'

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: [
    './recording.component.scss',
    '../../../node_modules/video.js/dist/video-js.css',
    '../../../node_modules/videojs-wavesurfer/dist/css/videojs.wavesurfer.css',
    '../../../node_modules/videojs-record/dist/css/videojs.record.css'
  ]
})
export class RecordingComponent implements OnInit {

    targetpeer: any;
    peer: any;
    stream: MediaStream

    async ngOnInit() {
      try {
        const SimplePeer = require('simple-peer')
        const wrtc = require('wrtc')

        // This peer is the initiator and transfering the streaming to the other connected peer
        if (location.hash === '#init') {
          let stream = await navigator.mediaDevices.getUserMedia({ video: true })
          this.peer = new SimplePeer({
            initiator: location.hash === '#init',
            stream: stream,
            wrtc: wrtc,
            trickle: false
          })
          this.videoElement.srcObject = stream
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
    connect() {
      this.peer.signal(this.targetpeer);
    }

    @ViewChild('myvideo', {static: true}) videoElementRef: ElementRef;
    get videoElement(): HTMLVideoElement {
      return this.videoElementRef.nativeElement
    }
  }
