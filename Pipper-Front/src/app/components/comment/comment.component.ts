import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comments: any;
  deleteButton = false;

  constructor(public commentService: CommentService) { }

  ngOnInit() {
    console.log(this.comments.user.type)
    if(this.comments.user.type == 1){
      this.deleteButton = true;
    }
    if (this.comments.user.photo == null){
      this.comments.user.photo = '../../assets/chamaBG.png';
    }

  }

  deleteCommentMod(){
    console.log(this.comments.id);
    this.commentService.deleteComment(this.comments.id).subscribe((res) =>{
      console.log('Comentário Apagado');
      window.location.reload();
    })
  }

}
