import { Component, OnInit, Input } from '@angular/core';

class Button {
  follow: string;
  chance: boolean;
}

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss'],
})
export class UserComponentComponent implements OnInit {
  @Input() user: any;
  followButton: Button;
  showComment = false;

  constructor() { }

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
