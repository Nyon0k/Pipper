import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroImagemPageRoutingModule } from './cadastro-imagem-routing.module';

import { CadastroImagemPage } from './cadastro-imagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroImagemPageRoutingModule
  ],
  declarations: [CadastroImagemPage]
})
export class CadastroImagemPageModule {}
