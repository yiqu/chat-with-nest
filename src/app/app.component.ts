import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RestService } from './shared/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatwithnest';
  userFg: FormGroup;
  userName: string;

  constructor(public rs: RestService, private fb: FormBuilder) {
    this.userFg = this.fb.group({
      name: createFormControl2("Kevin", false),
      message: createFormControl2("Hello World!", false)
    })
  }

  onSend() {
    const d = new Date().getTime();
    const data = {
      ...this.userFg.value,
      time: d
    }
    console.log(data);
    this.rs.sendMsg(data);
  }
}

export function createFormControl2(value: any, disabled: boolean, validators: any[] = [], asyncValids: any[] = []): FormControl {
  let fc = new FormControl({
    value: value,
    disabled: disabled
  }, validators, asyncValids);
  return fc;
}
