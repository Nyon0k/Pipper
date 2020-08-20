import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { checkAvailability } from '@ionic-native/core';
import { PostService } from '../../services/post/post.service';

class Button {
  follow: string;
}

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss'],
})
export class HomePostComponent implements OnInit {
  tags = [];
  tag_id;
  
  @Input() post: any;
  followButton: Button;
  
  constructor(public postService: PostService,  ) { }

  ngOnInit() {
    this.listTags();
    this.followButton = {
      follow: "Seguir"
    }
    
    if (this.post.user.photo == null){
      this.post.user.photo = '../../assets/chamaBG.png';
    }
  }

  listTags(){
    this.postService.listTags(this.post.id).subscribe((res) =>
    {
      this.tags = res;
      console.log(res);
      console.log('Todas as Tags');
    })
  }

}
