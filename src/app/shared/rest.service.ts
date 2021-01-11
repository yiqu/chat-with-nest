import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client/build/index';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MessageData } from './model';

@Injectable({providedIn: 'root'})
export class RestService {

  //private socket;
  userCount: number = 0;
  messageToClient$: Observable<MessageData[]> = this.socket.fromEvent('messageToClientz');


  constructor(private http: HttpClient, private socket: Socket) {
    this.getUsers();
    //this.connect();
    this.socket.fromEvent('messageToServer').subscribe((res) => {
      console.log("server: ",res)
    });
    this.socket.fromEvent('messageToClientz').subscribe((res) => {
      console.log("client:", res)
    });

    this.socket.fromEvent("users").subscribe((res) => {
      this.userCount = +res;
    })
  }


  // connect() {
  //   console.log("connecting...")
  //   this.socket = io("http://localhost:3000");
  //   this.socket.on("messageToServer", (data) => {
  //     console.log("received:: ", data)
  //   })
  // }

  sendMsg(data) {
    this.socket.emit("messageToServer", data);
  }

  getUsers() {
    this.http.get("api/users/all").subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

}
