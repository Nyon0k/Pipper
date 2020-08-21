import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  servico:boolean = false;
  produto:boolean = false;
  fisico:boolean = false;
  online:boolean = false;
  entretenimento:boolean = false;
  saude:boolean = false;
  esporte:boolean = false;
  alimentacao:boolean = false;
  utilidades_domesticas:boolean = false;
  infantis:boolean = false;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  //Checagem para colocar a tag na página
  ativarTag(num) {
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
    console.log(this.servico)
    this.popoverController.dismiss({ servico:this.servico, produto:this.produto, fisico:this.fisico, online:this.online, entretenimento:this.entretenimento, saude:this.saude, esporte:this.esporte, alimentacao:this.alimentacao, utilidades_domesticas:this.utilidades_domesticas, infantis:this.infantis });
  }
}
