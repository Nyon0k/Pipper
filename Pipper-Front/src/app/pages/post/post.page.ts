import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
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
  posts: [any];
  post_id = JSON.parse(localStorage.getItem('post')).id;
  
  followButton: Button;
  showComment = false;
  
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    public postService: PostService) { }

  delDeletePost(){
    this.postService.deletePost(this.post_id).subscribe ((res) =>{
      console.log(res);
      console.log('O post foi deletado.')
    })
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
            this.delDeletePost()
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

    this.posts=[
      {
      imagem: 'imagem',
      title: JSON.parse(localStorage.getItem('post')).title,
      originalComment: JSON.parse(localStorage.getItem('post')).originalComment,
      likes: JSON.parse(localStorage.getItem('post')).like,
      tags: JSON.parse(localStorage.getItem('post')).tags,
      rating: JSON.parse(localStorage.getItem('post')).rating,
      nome: JSON.parse(localStorage.getItem('post')).user
      }
    ]

    this.followButton = {
      follow: "Seguir",
      chance: false
    }
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

}

