import { Component } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { PopovercomponentPage } from '../popovercomponent/popovercomponent.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private popover:PopoverController) {

  }
  CreatePopOver()
  {
    this.popover.create({component:PopovercomponentPage, showBackdrop:false}).then((popoverElmement)=>{
    popoverElmement.present();
    })
  }

}
