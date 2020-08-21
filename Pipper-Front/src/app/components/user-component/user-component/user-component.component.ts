import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss'],
})
export class UserComponentComponent implements OnInit {
  @Input() user: any;

  constructor(public userService: UserService) { }

  ngOnInit() {

    if (this.user.photo == null){
      this.user.photo = '../../assets/chamaBG.png';
    }

  }

}
