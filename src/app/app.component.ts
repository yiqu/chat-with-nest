import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { RestService } from './shared/rest.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'chatwithnest';
  userFg: FormGroup;
  alertFg: FormGroup;

  userName: string;

  constructor(public rs: RestService, private fb: FormBuilder) {
    this.userFg = this.fb.group({
      name: createFormControl2("Kevin", false),
      message: createFormControl2("Hello World!", false)
    });

    this.alertFg = this.fb.group({
      alertText: createFormControl2("This is an alert!!! " + new Date().getTime(), false),
    });
  }

  onSend() {
    const d = new Date().getTime();
    const data = {
      ...this.userFg.value,
      time: d
    }
    this.rs.sendMsg(data);
  }

  onSendAlert() {
    const d = new Date().getTime();
    const txt = this.alertFg.value?.alertText;
    this.rs.sendAlert(txt);
  }
}

export function createFormControl2(value: any, disabled: boolean, validators: any[] = [], asyncValids: any[] = []): FormControl {
  let fc = new FormControl({
    value: value,
    disabled: disabled
  }, validators, asyncValids);
  return fc;
}
