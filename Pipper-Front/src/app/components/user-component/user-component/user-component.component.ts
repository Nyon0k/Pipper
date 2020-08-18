import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

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

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.followButton = {
      follow: "Seguir",
      chance: false
    }

    if (this.user.photo == null){
      this.user.photo = '../../assets/chamaBG.png';
    }

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

  follow(){
    this.userService.userFollowing(this.user.id).subscribe((res) =>{
      console.log(res)
      console.log('Usuário Seguido')
    })
  }

}
