import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { UserPopoverComponent } from '../user-popover/user-popover.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public popoverController: PopoverController) { }

  async presentPopover(event){
    const popover = await this.popoverController.create({
      component: LoginComponentComponent,
      cssClass: 'popovercss',
      event,
      translucent: true
    });
    return await popover.present();

  }
}
