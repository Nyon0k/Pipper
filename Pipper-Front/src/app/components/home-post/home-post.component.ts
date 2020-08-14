import { Component, OnInit, Input } from '@angular/core';

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

  followButton: Button;
  
  constructor() { }

  ngOnInit() {
    this.followButton = {
      follow: "Seguir"
    }
  }

}
