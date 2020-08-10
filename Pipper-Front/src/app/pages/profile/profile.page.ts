import { Component, OnInit } from '@angular/core';

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

  constructor() { 

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
  
}
