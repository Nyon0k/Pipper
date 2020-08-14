import { Component, OnInit, Input } from '@angular/core';
import { HomePostComponent } from '../components/home-post/home-post.component';
import { PostService } from '../services/post/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public posts1 = []
  public posts2 = []
  public posts3 = []

  showSeguindo = false;
  showTopo = false;
  showNovo = true;
  spinner = false;
  
  constructor(public postService: PostService, public router: Router) {}
  user_id = localStorage.getItem('id_user');
  ngOnInit() {
    this.getlistPostNovo();
    this.getlistPostRating();
    this.getlistPostFollow();
  }

  getlistPostNovo(){
    this.postService.listPostsNovo().subscribe ((res) =>{
      this.posts1 = res;
      console.log(res);
    })
  }

  getlistPostRating(){
    this.postService.listPoststTopo().subscribe ((res) =>{
      this.posts2 = res;
      console.log(res);
    })
  }

  getlistPostFollow(){
    this.postService.listPostsSeguindo(this.user_id).subscribe((res)=>{
      this.posts3 = res;
      console.log(res);
    })
  }

  public redirectPost(post) {
    this.router.navigate(['/post', {'postId': post}]);
  }
  
  showFollow() {
    if (this.user_id != null){
    this.showSeguindo = true;
    this.showTopo = false;
    this.showNovo = false;
    } else{
      console.log('Você não está logado!')
      this.showSeguindo = false;
    }
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

  doRefresh(event) {
    this.spinner= !this.spinner;
    console.log('Begin async operation');

    setTimeout(() => {
      this.spinner= !this.spinner;
      console.log('Async operation has ended');
      event.target.complete();
      this.getlistPostNovo();
      this.getlistPostRating();
      this.getlistPostFollow();
    }, 2000);
  }
}


