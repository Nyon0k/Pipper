import { Component, OnInit } from '@angular/core';
import { HomePostComponent } from '../components/home-post/home-post.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  showSeguindo = false;
  showTopo = false;
  showNovo = true;
  
  constructor() {}

  ngOnInit() {
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


