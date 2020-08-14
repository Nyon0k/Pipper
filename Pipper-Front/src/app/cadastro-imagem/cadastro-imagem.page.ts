import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from "@angular/router";


@Component({
  selector: 'app-cadastro-imagem',
  templateUrl: './cadastro-imagem.page.html',
  styleUrls: ['./cadastro-imagem.page.scss'],
})
export class CadastroImagemPage implements OnInit {

  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
  }

  async takePicture(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  sair(){
    this.router.navigate(['/tabs/tab1'])
  }

}
