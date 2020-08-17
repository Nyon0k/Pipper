import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from "../services/auth/auth.service";
import { Routes, RouterModule, Router } from "@angular/router";
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent implements OnInit {
  user_id;
  userInfo;
  postInfo;

  constructor(public popoverController: PopoverController, public authService: AuthService, public router: Router, public userService: UserService) {
    this.user_id = Number(localStorage.getItem('id_user'));

   }
  
  ngOnInit() {
    this.showUserInfo();
  }


  logout(){
    console.log('teste')
    this.authService.logout().subscribe((res) =>{
      console.log(res)
      localStorage.removeItem('token');
      localStorage.removeItem('id_user');
      console.log('Estou Deslogado!');
      this.popoverController.dismiss();
      this.router.navigate(['/tabs/tab1']);

    });
  }

  perfil(){
    this.router.navigate(['/profile', {'userId': this.user_id}]);
    this.popoverController.dismiss()
  }

  showUserInfo(){
    this.userService.showUser(this.user_id).subscribe((res) =>{
      this.userInfo = res;
      if(this.userInfo.photo == null){
        this.userInfo.photo = '../../assets/chamaBG.png'
      }
      console.log(res);
      console.log('Seu Perfil');
    })
    this.userService.listPostUser(this.user_id).subscribe((res) =>{
      this.postInfo = res;
      if (this.postInfo == null){
        this.postInfo.length = null;
        this.postInfo.followers = null;
        this.postInfo.followed = null;
      }
      console.log(res);
      console.log('Seus posts');
    })
  }

}
