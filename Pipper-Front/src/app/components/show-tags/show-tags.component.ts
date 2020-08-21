import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { CommentService } from '../../services/comment/comment.service';

@Component({
  selector: 'app-show-tags',
  templateUrl: './show-tags.component.html',
  styleUrls: ['./show-tags.component.scss'],
})

export class ShowTagsComponent implements OnInit {
  tags = [];
  tag_id;

  @Input() post: any;
  @Input() event;

  constructor(public postService: PostService, public commentService: CommentService) { }

  ngOnInit() {
    this.showPost();
  }

  showPost(){
  this.commentService.listPostInfo(this.event).subscribe((res)=>{
    console.log(res);
  });
  }

}
