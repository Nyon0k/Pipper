import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public toastController: ToastController, 
    public popoverController: PopoverController, 
    public formbuilder: FormBuilder, 
    private router: Router, 
    public authService: AuthService) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
   }

  ngOnInit() {}

  async loginAlertError() {
    const toast = await this.toastController.create({
      message: 'E-mail ou senha incorretos.',
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  async loginAlertSuccess() {
    const toast = await this.toastController.create({
      message: 'Você está logado!',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  login(loginForm) {
      this.authService.login(loginForm.value).subscribe(
        (res) => {
        console.log(res);
        localStorage.setItem('token', res.success.token);
        localStorage.setItem('user_email', res.user.email);
        localStorage.setItem('id_user', res.user.id);
        console.log('Estou Logado!')
        this.popoverController.dismiss();
        this.router.navigate(['/tabs/tab1']);
        this.loginAlertSuccess();
        window.location.reload();
      }, 
      (err) => {
        this.loginAlertError();
      });
    }

  close(){
    this.popoverController.dismiss();
    this.router.navigate(['/cadastro']);
  }
}
