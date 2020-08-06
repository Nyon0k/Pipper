import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopovercomponentPageRoutingModule } from './popovercomponent-routing.module';

import { PopovercomponentPage } from './popovercomponent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopovercomponentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PopovercomponentPage]
})
export class PopovercomponentPageModule {}
