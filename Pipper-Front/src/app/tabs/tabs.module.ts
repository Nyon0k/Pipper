import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { UserPopoverComponent } from '../user-popover/user-popover.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [LoginComponentComponent, UserPopoverComponent],
  declarations: [TabsPage, LoginComponentComponent, UserPopoverComponent]
})
export class TabsPageModule {}
