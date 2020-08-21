import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowTagsComponent } from '../show-tags/show-tags.component';
import { CommentService } from '../../services/comment/comment.service';


@NgModule({
    imports: [CommonModule],
    declarations: [ShowTagsComponent, CommentService],
    exports: [ShowTagsComponent]
})
export class ShowTagsModules{}