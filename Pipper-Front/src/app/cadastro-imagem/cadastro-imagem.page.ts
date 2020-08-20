import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from "@angular/router";
import { AuthService} from '../services/auth/auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro-imagem',
  templateUrl: './cadastro-imagem.page.html',
  styleUrls: ['./cadastro-imagem.page.scss'],
})
export class CadastroImagemPage implements OnInit {
  registerForm;
  photo: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer, 
    private router: Router, 
    public authService: AuthService,
    public toastController: ToastController) {
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

  async registerAlertSuccess() {
    const toast = await this.toastController.create({
      message: 'Você criou sua conta! Faça o login para continuar.',
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  async registerAlertError() {
    const toast = await this.toastController.create({
      message: 'Desculpe! Houve algum erro ao criar sua conta.',
      duration: 2000,
      position: "top"
    });
    toast.present();
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
        this.registerAlertSuccess();

      },
      (err) => {
        console.log(err);
        this.registerAlertError();
      }
    );
  }
}
