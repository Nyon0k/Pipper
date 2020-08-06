import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-popovercomponent',
  templateUrl: './popovercomponent.page.html',
  styleUrls: ['./popovercomponent.page.scss'],
})
export class PopovercomponentPage implements OnInit {
  registerForm: FormGroup;

  constructor(private popover: PopoverController, public formbuilder: FormBuilder) {
    this.registerForm = this.formbuilder.group({
      name: [null],
      nickname: [null],
      email: [null],
      password: [null],
      con_password: [null]
    });

  }

  ngOnInit() {
  }
  ClosePopover()
  {
    this.popover.dismiss();
  }

}
