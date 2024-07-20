import { Call } from '@angular/compiler';
import { EventEmitter, Injectable, Output } from '@angular/core';
// import { Observable, Observer } from 'rxjs';
import { io } from 'socket.io-client';
// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  private socket = io('ws://localhost:3000');
  @Output() callback: EventEmitter<any> = new EventEmitter();

  constructor() {
    // super({ url: 'http://localhost:3000', options: {} });

    this.listen();
  }

  public listen = () => {
    this.socket.on('6', (data: any) => {
      console.log(data);
      this.callback.emit(data);
    });
  };
}
