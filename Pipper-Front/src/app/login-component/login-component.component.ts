import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public popoverController: PopoverController, public formbuilder: FormBuilder, private router: Router, public authService: AuthService) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
   }

  ngOnInit() {}

  login(loginForm) {
      this.authService.login(loginForm.value).subscribe((res) => {
        console.log(res);
        localStorage.setItem('token', res.success.token);
        localStorage.setItem('user_email', res.success.email);
        console.log('Estou Logado!')
        this.popoverController.dismiss();
        this.router.navigate(['/tabs/tab1']);
      });
    }

  close(){
    this.popoverController.dismiss();
    this.router.navigate(['/cadastro']);
  }
}
