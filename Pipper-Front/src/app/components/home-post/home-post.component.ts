import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

class Button {
  follow: string;
}

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss'],
})
export class HomePostComponent implements OnInit {
  optionSlide = {
    loop: true,
    direction: 'horizontal',
}; //slide da tag
  
  spacePhoto;
  @Input() post: any;
  followButton: Button;
  
  constructor() { }

  ngOnInit() {
    this.followButton = {
      follow: "Seguir"
    }
    if (this.post.user.photo == null){
      this.post.user.photo = '../../assets/chamaBG.png';
    }

    if (this.post.photo == null){
      this.spacePhoto = false;
    } else{
      this.spacePhoto = true;
    }

  }


}
