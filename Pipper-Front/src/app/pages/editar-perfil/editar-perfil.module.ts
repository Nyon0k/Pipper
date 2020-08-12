import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { EditarPerfilPageRoutingModule } from './editar-perfil-routing.module';

import { EditarPerfilPage } from './editar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [EditarPerfilPage]
})
export class EditarPerfilPageModule {}
