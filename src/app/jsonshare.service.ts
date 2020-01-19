import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { WebSocketService } from './web-socket.service';
import { Observable, Subject } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class JsonshareService {


    messages: Subject<any>;
 
    constructor(private webSocketService: WebSocketService) {
      this.messages = <Subject<any>>webSocketService
      .connect()
      map((response: any): any => {
        return response;
      })
    }

    sendMsg(msg) {
      this.messages.next(msg);
    }
    
}

