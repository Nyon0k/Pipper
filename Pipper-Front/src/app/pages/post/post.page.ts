import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  
  followButton: Button;
  showComment = false;
  
  constructor(public toastController: ToastController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Seu comentário foi enviado.',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  async presentCopy() {
    const toast = await this.toastController.create({
      message: 'O link do post foi copiado.',
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

