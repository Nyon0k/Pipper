import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ProfilePage } from './profile.page';
import { UserService } from '../../services/user/user.service';

import { ProfilePostComponent } from '../../components/profile-post/profile-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ProfilePage, ProfilePostComponent],
  providers: [ UserService]
})
export class ProfilePageModule {}
