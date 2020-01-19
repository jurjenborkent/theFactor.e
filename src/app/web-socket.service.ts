import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../environments/environment'
import { R3ExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';

@Injectable()
export class WebSocketService {

  private socket; // socket die connectie met socket server.

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.ws_url)

    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received a message from a websocket server")
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, Observable);
  }



}
