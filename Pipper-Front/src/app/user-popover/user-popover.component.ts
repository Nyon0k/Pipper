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
  constructor(public popoverController: PopoverController, public authService: AuthService, public router: Router) { }

  ngOnInit() {}


  logout(){
    this.authService.logout().subscribe((res) =>{
      console.log(res)
      localStorage.removeItem('token');
      console.log('Estou Deslogado!');
      this.popoverController.dismiss();
      this.router.navigate(['/tabs/tab1']);

    });
  }

  perfil(){
    this.router.navigate(['/profile'])
    this.popoverController.dismiss()
  }
}
