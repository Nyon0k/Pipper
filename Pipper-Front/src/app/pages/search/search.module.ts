import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';
import { TagsComponent } from '../../components/tags/tags.component';
import { SearchPage } from './search.page';
import { HomePostModules } from '../../components/home-post/home-post.module';
import { UserComponentComponent } from '../../components/user-component/user-component/user-component.component';
import { SearchService }  from '../../services/search/search.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePostModules,
    SearchPageRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [TagsComponent, UserComponentComponent],
  declarations: [SearchPage, TagsComponent, UserComponentComponent],
  providers: [SearchService]
})
export class SearchPageModule {}
