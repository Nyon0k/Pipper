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
  user_id_check = Number(localStorage.getItem('id_user'));
  meuPerfil = true;
  outroPerfil = false;
  posts;
  post_id;
  followButton: Button;
  postCount;

  constructor(public router: Router, public userService: UserService, private route: ActivatedRoute) { 
  }
    

  ngOnInit() {
    this.followButton = {
      follow: "Seguir",
      chance: false
    }
    this.listPostUser();
    this.showUserInfo();
    this.check();
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
      this.postCount = res.length
    })
  }

  redirectPost(post_id){
    this.router.navigate(['/post', {'postId': post_id}]);
  }

  check(){
    if (this.user_id != this.user_id_check){
      this.meuPerfil = !this.meuPerfil;
      this.outroPerfil = !this.outroPerfil;
    }
  }

  follow(){
    this.userService.userFollowing(this.user_id).subscribe((res) =>{
      console.log(res)
      console.log('Seguindo!');
    })
  }

  /*unFollow(){
    this.userService.userUnFollowing(this.user_id_check, this.user_id).subscribe((res) =>{
      console.log(res)
      console.log('Deixei de Seguir!');
    })
  }*/

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.listPostUser();
      this.showUserInfo();
    }, 2000);
  }
}
