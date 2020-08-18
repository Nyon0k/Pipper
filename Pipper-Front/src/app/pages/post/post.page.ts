import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService} from '../../services/auth/auth.service';
import { CommentService} from '../../services/comment/comment.service'
import { UserService } from '../../services/user/user.service';
import { PostService } from '../../services/post/post.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';


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
  photo;
  photoPost: SafeResourceUrl;
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
  userType;
  commentForm: FormGroup;
  followButton: Button;
  showComment = false;
  postForm: FormGroup;
  editMode = false;
  editModeOff = true;
  editButton = false;
  deleteButton = false;
  
  constructor(
      public toastController: ToastController, 
      public formbuilder: FormBuilder, 
      public authService: AuthService, 
      public commentService: CommentService, 
      private route: ActivatedRoute, 
      public userService: UserService, 
      public router: Router, 
      public postService: PostService,  
      public alertController: AlertController,
      private sanitizer: DomSanitizer) {
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

  async takePicture(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.photoPost = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));

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
      this.photoPost = res.photo;
      console.log(this.post);
      console.log(res.user_id);
      //Usuário Dono do post
      this.userService.showUser(res.user_id).subscribe((res)=>
        {
          console.log(res);
          this.user = res.name;
          this.user_id = res.id;
          this.photo = res.photo;
          if (this.photo == null){
            this.photo = '../../assets/chamaBG.png';
          }
          //Usuário Visitante do post
          this.userService.showUser(this.user_id_check).subscribe((res)=>{
            this.userType = res.type;
            console.log(res);
            console.log(this.userType)
            if (this.user_id == this.user_id_check || this.userType == 1){
              this.deleteButton = true
            }
        
            if (this.user_id_check == this.user_id){
              this.editButton = true
            }
        })

        })


    }
    )
  }

  redirectUser(){
    console.log('oi')
    this.router.navigate(['/profile', {'userId': this.user_id}]);
  }

  deletePost(){
    if (this.user_id == this.user_id_check || this.userType == 1){
    this.postService.deletePostUser(this.post_id).subscribe((res) =>{
      console.log(res);
      console.log('Post Apagado!');
      this.router.navigate(['/tabs/tab1']);
    })
    } else{
      console.log('Voce nao pode apagar este post!')
    }
  }

  editPost(postForm){
    if(this.photoPost){
      postForm.value.photo = this.photoPost['changingThisBreaksApplicationSecurity'];
      } else{
        postForm.value.photo = null;
      }
    this.postService.editPostUser(this.post_id, postForm.value).subscribe((res) =>{
      this.editMode = false;
      this.editModeOff = true;
      this.post = res;
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

  likePost(){
    this.postService.likePost(this.post_id).subscribe((res) =>{
      console.log('Post liked!')
    })
  }

  voltar(){
    this.router.navigate(['/tabs/tab1']);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.showPost();
      this.likePost();
      this.listComments();
    }, 2000);
  }
}