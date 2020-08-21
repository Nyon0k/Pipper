import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { LoginComponentComponent } from '../components/login-component/login-component.component';
import { UserPopoverComponent } from '../components/user-popover/user-popover.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [LoginComponentComponent, UserPopoverComponent],
  declarations: [TabsPage, LoginComponentComponent, UserPopoverComponent],
  providers: [AuthService]
})
export class TabsPageModule {}
