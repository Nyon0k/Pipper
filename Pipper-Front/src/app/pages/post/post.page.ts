import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService} from '../../services/auth/auth.service';
import { CommentService} from '../../services/comment/comment.service'
import { UserService } from '../../services/user/user.service';
import { PostService } from '../../services/post/post.service';

class Button {
  follow: string;
  chance: boolean;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})

export class PostPage implements OnInit {
  public comments = [];
  user_id;
  user_id_check;
  user;
  post = {id: 0,
    ​
    like: 0,
    ​
    text: "text",
    ​
    rating: 0,
    ​
    tags: "text",
    ​
    title: "text"};
  post_id;
  commentForm: FormGroup;
  followButton: Button;
  showComment = false;
  postForm: FormGroup;
  editMode = false;
  editModeOff = true;
  deleteButton = true;
  
  constructor(public toastController: ToastController, public formbuilder: FormBuilder, public authService: AuthService, public commentService: CommentService, private route: ActivatedRoute, public userService: UserService, public router: Router, public postService: PostService,  public alertController: AlertController) {
    this.commentForm = this.formbuilder.group({
      text: [null]
    });

    this.postForm = this.formbuilder.group({
      title: [null],
      text: [null]
    });

    this.user_id_check = Number(localStorage.getItem('id_user'));
   }

  async presentAlert() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: 'deleteAlert',
      header: 'ATENÇÃO',
      message: 'Tem certeza que deseja deletar essa publicação?',
      buttons: ['Cancelar', {
          text:'Deletar',
          handler: () => {
            this.deletePost()
          },
        }]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Seu comentário foi enviado.',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  ngOnInit() {

    this.followButton = {
      follow: "Seguir",
      chance: false
    }

    this.showPost();

  }

  changeFollow() {
    this.followButton.chance = !this.followButton.chance;
    if (!this.followButton.chance) {
      this.followButton.follow = "Seguir";
    }
    else if (this.followButton.chance) {
      this.followButton.follow = "Seguindo";
    }
    console.log(this.followButton.chance)
  }

  show() {
  this.showComment = !this.showComment;
  }

  sendComment(){
    this.authService.createComment(this.commentForm.value, this.post_id).subscribe((res) =>
    {
      console.log(res)
      console.log('Comentário Enviado')
      this.presentToast();
    })

  }

  listComments(){
    this.commentService.listPostComment(this.post_id).subscribe((res) =>
    {
      this.comments = res;
      console.log(res);
      console.log('Todos os Comentários');
      this.show();
    })
  }

  async showPost(){
    await this.route.params.subscribe((params) => (this.post_id = params.postId));
    this.commentService.listPostInfo(this.post_id).subscribe((res)=>{
      this.post = res;
      console.log(this.post);
      this.userService.showUser(res.user_id).subscribe((res)=>
        {
          console.log(res);
          this.user = res.name;
          this.user_id = res.id;
          if (this.user_id != this.user_id_check){
            this.deleteButton = !this.deleteButton
          }
        })
    }
    )
  }

  redirectUser(){
    console.log('oi')
    this.router.navigate(['/profile', {'userId': this.user_id}]);
  }

  deletePost(){
    if (this.user_id == this.user_id_check){
    this.postService.deletePostUser(this.post_id).subscribe((res) =>{
      console.log(res);
      console.log('Post Apagado!');
      this.router.navigate(['/tabs/tab1']);
    })
    } else{
      console.log('Voce nao pode apagar este post!')
    }
  }

  editPost(){
    this.postService.editPostUser(this.post_id, this.postForm.value).subscribe((res) =>{
      this.editMode = false;
      this.editModeOff = true;
      console.log(res)
      console.log('Post Editado!');
    })
  }
  
  edit(){
    if (this.user_id == this.user_id_check){
    this.editMode = !this.editMode;
    this.editModeOff = !this.editModeOff;
    }
  }
}

