import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HomePostModules } from '../components/home-post/home-post.module';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { PostService } from '../services/post/post.service';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePostModules,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HttpClientModule
  ],
  declarations: [Tab1Page],
  providers: [PostService]
})
export class Tab1PageModule {}
