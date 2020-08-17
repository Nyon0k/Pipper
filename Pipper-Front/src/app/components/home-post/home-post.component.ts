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
  
  @Input() post: any;
  @Output() postClicked = new EventEmitter<number>();

  followButton: Button;
  
  constructor() { }

  ngOnInit() {
    this.followButton = {
      follow: "Seguir"
    }

    if (this.post.user.photo == null){
      this.post.user.photo = '../../assets/chamaBG.png';
    }
  }

  postClick(id){
    this.postClicked.emit(id);
  }
}
