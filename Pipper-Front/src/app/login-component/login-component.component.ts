import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public popoverController: PopoverController, public formbuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formbuilder.group({
      nickname: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
   }

  ngOnInit() {}

  submitForm(form){
    console.log(form);
    console.log(form.value);
  }

  close(){
    this.popoverController.dismiss()
  }

}
