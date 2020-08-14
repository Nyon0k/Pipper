import { Component, OnInit } from '@angular/core';
import { HomePostComponent } from '../components/home-post/home-post.component';
import { PostService } from '../services/post/post.service';
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
  spinner = false;
  
  constructor(
    public postService: PostService,
    public router: Router) {}

  ngOnInit() {
    this.getlistPost();
  }

  getlistPost(){
    this.postService.listPosts().subscribe ((res) =>{
      this.posts = res;
      console.log(res);
    })
  }

  public redirectPost(post) {
    localStorage.setItem('post', JSON.stringify(post));
    this.router.navigate(['/post']);
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

  doRefresh(event) {
    this.spinner= !this.spinner;
    console.log('Begin async operation');

    setTimeout(() => {
      this.spinner= !this.spinner;
      console.log('Async operation has ended');
      event.target.complete();
      this.getlistPost();
    }, 2000);
  }
}


