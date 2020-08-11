import { Component } from '@angular/core';
import { PopoverController, iosTransitionAnimation } from '@ionic/angular';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { UserPopoverComponent } from '../user-popover/user-popover.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public popoverController: PopoverController, public router: Router) { }

  async presentPopover(event){
    const popover = await this.popoverController.create({
      component: LoginComponentComponent,
      cssClass: 'popovercss',
      event,
      translucent: true
    });
    return await popover.present();

  }

  async presentPopover2(event){
    const popover = await this.popoverController.create({
      component: UserPopoverComponent,
      cssClass: 'popovercss',
      event,
      translucent: true
    });
    return await popover.present();

  }

  verify(){
    let verification = localStorage.getItem('token');
    if (verification != null){
      this.router.navigate(['/tabs/tab3'])
    } else{
      this.presentPopover(event);
    }
  }

  login(){
    let verification = localStorage.getItem('token');
    if (verification != null){
      this.presentPopover2(event);
    } else{
      this.presentPopover(event);
    }

  }
}
