import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from "@angular/router";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  registerForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formbuilder.group({
      name: [null,[Validators.required]],
      nickname: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [null, [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {
  }

  submitForm(form){
    console.log(form);
    console.log(form.value);
  }

}

