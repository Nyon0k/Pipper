import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ShowTagsComponent } from '../../components/show-tags/show-tags.component';

import { AuthService} from '../../services/auth/auth.service';
import { CommentService } from '../../services/comment/comment.service';
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
  nickname;
  userType;

  photo;
  photoPost: SafeResourceUrl;

  post = {id: 0,
    ​
    like: 0,
    ​
    text: "text",
    ​
    individual_rating: 0,
    ​
    tags: "text",
    ​
    title: "text"
  };
  post_id;

  commentForm: FormGroup;
  showComment = false;
  commentCount;

  followButton: Button;
  botaoSeguir = false;

  postForm: FormGroup;
  rateForm;
  
  editMode = false;
  editModeOff = true;
  editButton = false;

  deleteButton = false;

  rateMode = false;
  rating;
  individual_rating;

  starColor1 = false;
  starColor2 = false;
  starColor3 = false;
  starColor4 = false;
  starColor5 = false;
  
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
      private sanitizer: DomSanitizer,
      public popoverController: PopoverController) {
    this.commentForm = this.formbuilder.group({
      text: [null]
    });

    this.postForm = this.formbuilder.group({
      title: [null],
      text: [null]
    });

    this.user_id_check = Number(localStorage.getItem('id_user'));
   }

   async presentTags(ev: any) {
    await this.route.params.subscribe((params) => (this.post_id = params.postId));
    const popover = await this.popoverController.create({
      component: ShowTagsComponent,
      cssClass: 'showTagsComponent',
      event: ev,
      translucent: true,
    });
    return await popover.present();
  };

  async presentAlert() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: 'deleteAlert',
      header: 'ATENÇÃO',
      message: 'Tem certeza que deseja deletar esta publicação?',
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

  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'Você não pode fazer isso.',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  async presentToast3() {
    const toast = await this.toastController.create({
      message: 'A publicação foi deletada.',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  async presentToas4() {
    const toast = await this.toastController.create({
      message: 'Sua publicação foi editada.',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  async presentToas5() {
    const toast = await this.toastController.create({
      message: 'Sua avaliação foi enviada.',
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
    this.followCheck();
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
      this.follow();
    }
    else if (this.followButton.chance) {
      this.followButton.follow = "Seguindo";
      this.follow();
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
    // if(Error){
    //   this.presentToast2();
    // }

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
      this.user = res.user.name;
      this.nickname = res.user.nickname;
      this.user_id = res.user.id;
      this.photo = res.user.photo;
      if(this.user_id != this.user_id_check && this.user_id_check){
        this.botaoSeguir = true;
      }
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
      
    
    }
    )
  }

  async follow(){
    await this.route.params.subscribe((params) => (this.post_id = params.postId));
    this.commentService.listPostInfo(this.post_id).subscribe((res) =>{
      console.log(res)
      this.userService.userFollowing(res.user.id).subscribe((res) =>{
        console.log(res)
        console.log('seguindo')
        window.location.reload();
      })
    })
  }

  async followCheck(){
    await this.route.params.subscribe((params) => (this.post_id = params.postId));
    this.commentService.listPostInfo(this.post_id).subscribe((res) =>{
      console.log(res)
      this.userService.followCheck(this.user_id_check, res.user.id).subscribe((res) =>{
        console.log(res)
        if (res == 1){
          console.log('seguindo');
          this.followButton.chance = true;
          this.followButton.follow = "Seguindo";
        } else{
          console.log('nao seguindo');
          this.followButton.chance = false;
          this.followButton.follow = "Seguir";
        }
      })
    })
  }

  redirectUser(){
    if(this.user_id_check){
    this.router.navigate(['/profile', {'userId': this.user_id}]);
    } else {
      this.presentToast2();
    }
  }

  deletePost(){
    if (this.user_id == this.user_id_check || this.userType == 1){
    this.postService.deletePostUser(this.post_id).subscribe((res) =>{
      console.log(res);
      console.log('Post Apagado!');
      this.router.navigate(['/tabs/tab1']);
      this.presentToast3();
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
      this.presentToas4();
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
      window.location.reload();
    })
    // if(Error){
    //   this.presentToast2();
    // }
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
      this.listComments();
    }, 2000);
  }

  async ratePost(){
    console.log(this.individual_rating)
    this.rating = JSON.parse(this.individual_rating);
    await this.route.params.subscribe((params) => (this.post_id = params.postId));
    this.postService.ratePost(this.post.id, this.individual_rating).subscribe((res) =>{
      this.presentToas5();
      console.log(res);
      this.rateMode = !this.rateMode;
      this.editModeOff = !this.editModeOff;
    })
  }


  rate(){
    if (this.user_id != this.user_id_check && this.user_id_check){
      this.rateMode = !this.rateMode;
      this.editModeOff = !this.editModeOff;
    }
    else{
        this.presentToast2();
    }
  }

  star(n){
    switch(n){
      case(1):
       this.individual_rating=1;
       this.starColor1 = true;
       this.starColor2 = false;
       this.starColor3 = false;
       this.starColor4 = false;
       this.starColor5 = false;
       break
      case(2):
       this.individual_rating=2;
       this.starColor1 = true;
       this.starColor2 = true;
       this.starColor3 = false;
       this.starColor4 = false;
       this.starColor5 = false;
       break
      case(3):
       this.individual_rating=3;
       this.starColor1 = true;
       this.starColor2 = true;
       this.starColor3 = true;
       this.starColor4 = false;
       this.starColor5 = false;
       break
      case(4):
       this.individual_rating=4;
         this.starColor1 = true;
         this.starColor2 = true;
         this.starColor3 = true;
         this.starColor4 = true;
         this.starColor5 = false;
       break
      case(5):
       this.individual_rating=5;
         this.starColor1 = true;
         this.starColor2 = true;
         this.starColor3 = true;
         this.starColor4 = true;
         this.starColor5 = true;
       break
    }
 
  }

}