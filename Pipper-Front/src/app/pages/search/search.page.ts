import { Component, OnInit ,Input } from '@angular/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { TagsComponent } from '../../components/tags/tags.component';
import { SearchPostComponent } from '../../components/search-post/search-post.component';
import { SearchService } from '../../services/search/search.service';
import { PostService } from '../../services/post/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  tag = [];
  posts;
  servico;
  produto;
  fisico;
  online;
  entretenimento;
  saude;
  esporte;
  alimentacao;
  utilidades_domesticas;
  infantis;
  followCheck;
  followPost;
  userId = localStorage.getItem('id_user')
  
  searchPost = false;
  searchUser= true;
  botaoPost = false;
  botaoUser = false;
  searchForm: FormGroup;
  users = [];
  

  constructor(public toastController: ToastController, public popoverController: PopoverController, public searchService: SearchService, public formbuilder: FormBuilder, public postService: PostService, public router: Router) {
    this.searchForm = this.formbuilder.group({
      name: [null]
    });
  }
    async presentPopover(event){
      console.log(event);
      const popover = await this.popoverController.create({
        component: TagsComponent,
        cssClass: 'tagspopovercss',
        event,
        mode: "md",
        translucent: true
      });
      
      await popover.present();
      const { data } = await popover.onDidDismiss();
      if (data.servico){
        this.servico = true;
        if (!this.tag.includes(1)){
          this.tag.push(1);
        }
      }
      if (data.produto){
        this.produto = true;
        if (!this.tag.includes(2)){
          this.tag.push(2);
        }
      }
      if (data.fisico){
        this.fisico = true;
        if (!this.tag.includes(3)){
          this.tag.push(3);
        }
      }
      if (data.online){
        this.online = true;
        if (!this.tag.includes(4)){
          this.tag.push(4);
        }
      }
      if (data.entretenimento){
        this.entretenimento = true;
        if (!this.tag.includes(5)){
          this.tag.push(5);
        }
      }
      if (data.saude){
        this.saude = true;
        if (!this.tag.includes(6)){
          this.tag.push(6);
        }
      }
      if (data.esporte){
        this.esporte = true;
        if (!this.tag.includes(7)){
          this.tag.push(7);
        }
      }
      if (data.alimentacao){
        this.alimentacao = true;
        if (!this.tag.includes(8)){
          this.tag.push(8);
        }
      }
      if (data.utilidades_domesticas){
        this.utilidades_domesticas = true;
        if (!this.tag.includes(9)){
          this.tag.push(9);
        }
      }
      if (data.infantis){
        this.infantis = true;
        if (!this.tag.includes(10)){
          this.tag.push(10);
        }
      }
      console.log(data)
  
      
    }

  ngOnInit() {

  }

  searchPoste(){
      this.searchPost = true;
      this.searchUser = false;
      this.botaoUser = false;
  }

  searchUsuario(){
    this.searchUser = true;
    this.searchPost = false;
    this.botaoPost = false;
    this.servico = false;
    this.produto = false;
    this.fisico = false;
    this.online = false;
    this.entretenimento = false;
    this.saude = false;
    this.esporte = false;
    this.alimentacao = false;
    this.utilidades_domesticas = false;
    this.infantis = false;
  }

  search(){
    if (this.searchUser == true){
    this.botaoUser = true;
    this.botaoPost = false;
    this.searchPage();
    console.log(this.searchForm.value);

    }
    if (this.searchPost == true){
      this.botaoPost = true;
      this.botaoUser = false;
    }
 }
 close(num){
  let index;
  switch(num){
    case 1:
      this.servico = !this.servico;
      index = this.tag.indexOf(1);
      this.tag.splice(index,1);
      break;
    case 2:
      this.produto = !this.produto;
      index = this.tag.indexOf(2);
      this.tag.splice(index,1);
      break;
    case 3:
      this.fisico = !this.fisico;
      index = this.tag.indexOf(3);
      this.tag.splice(index,1);
      break;
    case 4:
      this.online = !this.online;
      index = this.tag.indexOf(4);
      this.tag.splice(index,1);
      break;
    case 5:
      this.entretenimento = !this.entretenimento;
      index = this.tag.indexOf(5);
      this.tag.splice(index,1);
      break;
    case 6:
      this.saude = !this.saude;
      index = this.tag.indexOf(6);
      this.tag.splice(index,1);
      break;
    case 7:
      this.esporte = !this.esporte;
      index = this.tag.indexOf(7);
      this.tag.splice(index,1);
      break;
    case 8:
      this.alimentacao = !this.alimentacao;
      index = this.tag.indexOf(8);
      this.tag.splice(index,1);
      break;
    case 9:
      this.utilidades_domesticas = !this.utilidades_domesticas;
      index = this.tag.indexOf(9);
      this.tag.splice(index,1);
      break;
    case 10:
      this.infantis = !this.infantis;
      index = this.tag.indexOf(10);
      this.tag.splice(index,1);
      break;
  }
}

 searchPage(){
    this.searchService.search(this.searchForm.value).subscribe((res)=>{
      this.users = res[0];
      console.log(this.users)
      console.log(res);
      console.log('Usuário Procurado');
    })
 }

 searchTag(){
   console.log(this.tag)
   this.searchService.searchTag(this.tag).subscribe((res)=>{
     console.log(res);
     this.posts = res;
   })
 }

 doRefresh(event) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
    this.searchPage();
  }, 2000);
}

async presentToast2() {
  const toast = await this.toastController.create({
    message: 'Você não pode fazer isso.',
    duration: 2000,
    position: "top"
  });
  toast.present();
}

public redirectPostId(id){
  this.router.navigate(['/post', {'postId': id}])
}

public redirectId(id){
  if (this.userId) {
  this.router.navigate(['/profile', {'userId': id}]);
  } else {
    this.presentToast2();
  }
}

}
