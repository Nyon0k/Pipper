import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss'],
})
export class SearchPostComponent implements OnInit {

  @Input() post;
  constructor() { }

  ngOnInit() {
    if (this.post.user.photo == null) {
      this.post.user.photo = '../../assets/chamaBG.png'
    }
  }

}
