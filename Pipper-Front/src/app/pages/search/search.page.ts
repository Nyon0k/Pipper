import { Component, OnInit ,Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TagsComponent } from '../../components/tags/tags.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
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
  
  searchPost = false;
  searchUser= true;
  botaoPost = false;
  botaoUser = false;
  

  constructor(public popoverController: PopoverController) {}
    async presentPopover(event){
      console.log(event);
      const popover = await this.popoverController.create({
        component: TagsComponent,
        cssClass: 'tagspopovercss',
        event,
        translucent: true
      });
      await popover.present();
      const { data } = await popover.onDidDismiss();
      if (data.servico){
        this.servico = true;
      }
      if (data.produto){
        this.produto = true;
      }
      if (data.fisico){
        this.fisico = true;
      }
      if (data.online){
        this.online = true;
      }
      if (data.entretenimento){
        this.entretenimento = true;
      }
      if (data.saude){
        this.saude = true;
      }
      if (data.esporte){
        this.esporte = true;
      }
      if (data.alimentacao){
        this.alimentacao = true;
      }
      if (data.utilidades_domesticas){
        this.utilidades_domesticas = true;
      }
      if (data.infantis){
        this.infantis = true;
      }
      console.log(data)
  
      
    }

  ngOnInit() {
    console.log(this.servico)
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
    }
    if (this.searchPost == true){
      this.botaoPost = true;
      this.botaoUser = false;
    }
 }
  close(num){
    switch(num){
      case 1:
        this.servico = !this.servico;
        break;
      case 2:
        this.produto = !this.produto;
        break;
      case 3:
        this.fisico = !this.fisico;
        break;
      case 4:
        this.online = !this.online;
        break;
      case 5:
        this.entretenimento = !this.entretenimento;
        break;
      case 6:
        this.saude = !this.saude;
        break;
      case 7:
        this.esporte = !this.esporte;
        break;
      case 8:
        this.alimentacao = !this.alimentacao;
        break;
      case 9:
        this.utilidades_domesticas = !this.utilidades_domesticas;
        break;
      case 10:
        this.infantis = !this.infantis;
        break;
    }
 }
}
