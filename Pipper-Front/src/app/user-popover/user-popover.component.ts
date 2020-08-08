import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}


  close(){
    this.popoverController.dismiss()
  }
}
