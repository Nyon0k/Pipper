import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from "../services/auth/auth.service";
import { Routes, RouterModule, Router } from "@angular/router";

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent implements OnInit {
  user_id;

  constructor(public popoverController: PopoverController, public authService: AuthService, public router: Router) {
    this.user_id = Number(localStorage.getItem('id_user'));

   }
  
  ngOnInit() {}


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
}
