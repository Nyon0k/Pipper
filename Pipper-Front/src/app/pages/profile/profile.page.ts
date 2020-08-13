import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { async } from 'rxjs/internal/scheduler/async';

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
  user: {name: 'text',
         nickname: 'text'};
  user_id;
  posts;
  post_id;
  followButton: Button;

  constructor(public router: Router, public userService: UserService, private route: ActivatedRoute) { 
  }
    

  ngOnInit() {
    this.followButton = {
      follow: "Seguir",
      chance: false
    }
    this.listPostUser();
    this.showUserInfo();
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

  showUserInfo(){
    this.userService.showUser(this.user_id).subscribe((res)=>{
      this.user= res;
      console.log(res);
    })
  }

  async listPostUser(){
    await this.route.params.subscribe((params) => (this.user_id = params.userId));
    this.userService.listPostUser(this.user_id).subscribe((res)=>{
      this.posts = res;
      //this.post_id = res.id;
      console.log(this.posts);
    })
  }

  redirectPost(){
    this.router.navigate(['/post', {'postId': this.post_id}]);
  }

}
