import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client/build/index';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MessageData } from './model';

export class SocketNameSpace extends Socket {
  constructor(socketConfig: SocketIoConfig){
    super(socketConfig);
  }
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  userCount: number = 0;
  currentAlert: string = "";

  chatNameSpace  = new SocketNameSpace({url: 'http://localhost:3000/chat', options: {
    path: '/websockets'
  }});
  alertNameSpace  = new SocketNameSpace({url: 'http://localhost:3000/alert', options: {
    path: '/websockets'
  }});

  messageToClient$: Observable<MessageData[]> = this.chatNameSpace.fromEvent('messageToClientz');

  constructor(private http: HttpClient, private socket: Socket) {
    this.getUsers();

    this.chatNameSpace.fromEvent('messageToClientz').subscribe((res) => {
      console.log("client:", res)
    });

    this.chatNameSpace.fromEvent("users").subscribe((res) => {
      this.userCount = +res;
    });

    this.alertNameSpace.fromEvent('alertToClient').subscribe((res) => {
      this.currentAlert = res + "";
    });
  }

  sendMsg(data) {
    this.chatNameSpace.emit("messageToServer", data);
  }

  sendAlert(alert) {
    this.alertNameSpace.emit("alertToServer", alert);
  }

  getUsers() {
    this.http.get("api/users/all").subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

}
