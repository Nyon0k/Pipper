import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommentService } from '../../services/comment/comment.service';

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
         nickname: 'text'
        photo: '../../assets/chamaBG.png'};
  user_id;
  user_id_check = Number(localStorage.getItem('id_user'));
  meuPerfil = true;
  outroPerfil = false;
  posts;
  post_id;
  followButton: Button;
  postCount;

  constructor(public router: Router, public userService: UserService, private route: ActivatedRoute, public commentService: CommentService) { 
  }
    

  ngOnInit() {
    this.followButton = {
      follow: "Seguir",
      chance: false
    }
    this.listPostUser();
    this.showUserInfo();
    this.check();
    this.followCheck();
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
      if(this.user.photo == null){
        this.user.photo = '../../assets/chamaBG.png'
      }
      console.log(res);
    })
  }

  async listPostUser(){
    await this.route.params.subscribe((params) => (this.user_id = params.userId));
    this.userService.listPostUser(this.user_id).subscribe((res)=>{
      this.posts = res;
      //this.user = res[0].user
      console.log(this.posts);
      console.log(this.user);
      this.postCount = res.length
    })
  }

  async followCheck(){
    await this.route.params.subscribe((params) => (this.user_id = params.userId));
    this.userService.listPostUser(this.user_id).subscribe((res)=>{
      console.log(res)
      this.userService.followCheck(this.user_id_check, this.user_id).subscribe((res) =>{
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
