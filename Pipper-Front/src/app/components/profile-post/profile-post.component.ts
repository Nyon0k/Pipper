import { Component, OnInit, Input, Output } from '@angular/core';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss'],
})
export class ProfilePostComponent implements OnInit {
  spacePhoto;
  @Input() post;
  constructor(public postService: PostService) { }

  ngOnInit() {
    if (this.post.photo == null){
      this.spacePhoto = false;
    } else {
      this.spacePhoto = true;
    }
  }

}
