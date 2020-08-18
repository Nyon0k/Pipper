import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comments: any;
  deleteButton = false;
  userId = localStorage.getItem('id_user');
  user;

  constructor(public commentService: CommentService, public userService: UserService) { }

  ngOnInit() {
    this.showUser();
    if (this.comments.user.photo == null){
      this.comments.user.photo = '../../assets/chamaBG.png';
    }

  }

  async showUser(){
    this.userService.showUser(this.userId).subscribe((res) =>{
      this.user = res
      console.log(this.user);
      console.log(this.user.type)
      if(this.user.type == 1){
        this.deleteButton = true;
      } else{
        this.deleteButton = false;
      }
    })
  }

  deleteCommentMod(){
    console.log(this.comments.id);
    this.commentService.deleteComment(this.comments.id).subscribe((res) =>{
      console.log('Comentário Apagado');
      window.location.reload();
    })
  }

}
