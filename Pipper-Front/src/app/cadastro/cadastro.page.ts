import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from "@angular/router";
import { PopoverController } from '@ionic/angular';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  registerForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private router: Router, public popoverController: PopoverController, public authservice: AuthService) {
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
    form.value.type = 0;
    this.router.navigate(['cadastro-imagem'], form.value)
    // console.log("Usuário Cadastrado");
    // this.authservice.register(form.value).subscribe(
    //   (res)=> {
    //     console.log(res);

    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  async presentPopover(event){
    const popover = await this.popoverController.create({
      component: LoginComponentComponent,
      cssClass: 'popovercss',
      event,
      translucent: true
    });
    return await popover.present();

  }

}

