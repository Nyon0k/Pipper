import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';
import { TagsComponent } from '../../components/tags/tags.component';
import { SearchPage } from './search.page';
import { HomePostModules } from '../../components/home-post/home-post.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePostModules,
    SearchPageRoutingModule
  ],
  entryComponents: [TagsComponent],
  declarations: [SearchPage, TagsComponent]
})
export class SearchPageModule {}
