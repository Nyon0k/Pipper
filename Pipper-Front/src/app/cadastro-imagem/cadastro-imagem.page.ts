import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from "@angular/router";
import { AuthService} from '../services/auth/auth.service';


@Component({
  selector: 'app-cadastro-imagem',
  templateUrl: './cadastro-imagem.page.html',
  styleUrls: ['./cadastro-imagem.page.scss'],
})
export class CadastroImagemPage implements OnInit {
  registerForm;
  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private router: Router, public authService: AuthService) {
    this.registerForm = this.router.getCurrentNavigation().extras;
   }
  
  ngOnInit() {
    console.log(this.registerForm)
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
    this.router.navigate(['/tabs/tab1']);
  }

  voltar(){
    this.router.navigate(['/cadastro']);
  }

  cadastro(){
    if(this.photo){
      this.registerForm.photo = this.photo['changingThisBreaksApplicationSecurity'];
      }else{
        this.registerForm.photo = null;
      }
    console.log(this.registerForm);
    this.authService.register(this.registerForm).subscribe(
      (res)=> {
        console.log(res);
        this.router.navigate(['/tabs/tab1']);

      },
      (err) => {
        console.log(err);
      }
    );
  }
}
