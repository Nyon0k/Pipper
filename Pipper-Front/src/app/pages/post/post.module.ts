import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PostPageRoutingModule } from './post-routing.module';
import { PostPage } from './post.page';

import { CommentComponent } from '../../components/comment/comment.component';
import { CommentService } from '../../services/comment/comment.service';
import { AuthService } from '../../services/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [PostPage, CommentComponent],
  providers: [CommentService, AuthService]
})
export class PostPageModule {}
