import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.scss']
})
export class NoteComponent implements OnInit {
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
    this.peer = new this.SimplePeer({ wrtc: this.wrtc });
    this.startCapture();
  }

  ngOnInit() {
  }

  async startCapture() {
    try {
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

  private handleIncomingSignal(data: any) {
    if(data.type === "answer"){
      this.db.object('reciever').update({ content: JSON.stringify(data) });
    }
  }
  connect() {
    this.db.object('hosts/content').query.once("value").then(data => {
      this.peer.signal(data.val());
    });
  }

  @ViewChild('myvideo', { static: true }) videoElementRef: ElementRef;
  get videoElement(): HTMLVideoElement {
    return this.videoElementRef.nativeElement
  }

}
