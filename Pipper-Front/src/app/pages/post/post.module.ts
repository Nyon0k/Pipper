import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';

import { CommentComponent } from '../../components/comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
  ],
  declarations: [PostPage, CommentComponent]
})
export class PostPageModule {}
