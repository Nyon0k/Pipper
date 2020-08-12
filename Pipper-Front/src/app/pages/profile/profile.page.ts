import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class Button {
  follow: string;
  chance: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  followButton: Button;

  constructor(public router: Router) { 

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
  
  editar(){
    this.router.navigate(['/editar-perfil']);
  }

}
