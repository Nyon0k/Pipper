import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { AuthService } from '../services/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [LoginComponentComponent],
  declarations: [CadastroPage, LoginComponentComponent],
  providers: [AuthService]
})
export class CadastroPageModule {}
