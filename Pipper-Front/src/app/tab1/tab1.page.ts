import { Component, OnInit, Input } from '@angular/core';
import { HomePostComponent } from '../components/home-post/home-post.component';
import { PostService} from '../services/post/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public posts = []

  showSeguindo = false;
  showTopo = false;
  showNovo = true;
  
  constructor(public postService: PostService, public router: Router) {}

  ngOnInit() {
    this.getlistPostNovo();
    this.getlistPostRating();
  }

  getlistPostNovo(){
    this.postService.listPostsNovo().subscribe ((res) =>{
      this.posts = res;
      console.log(res);
    })
  }

  getlistPostRating(){
    this.postService.listPoststTopo().subscribe ((res) =>{
      this.posts = res;
      console.log(res);
    })
  }

  public redirectPost(post) {
    this.router.navigate(['/post', {'postId': post}]);
  }
  
  showFollow() {
    this.showSeguindo = true;
    this.showTopo = false;
    this.showNovo = false;
  }

  showTop() {
    this.showTopo = true;
    this.showSeguindo = false;
    this.showNovo = false;
  }

  showNew() {
    this.showNovo = true;
    this.showSeguindo = false;
    this.showTopo = false;
  }
}


