import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  photo: SafeResourceUrl;
  registerForm: FormGroup;

  constructor(
    public formbuilder: FormBuilder,
    public toastController: ToastController,
    private sanitizer: DomSanitizer) { 
    this.registerForm = this.formbuilder.group({
      image: [null],
      name: [null,[Validators.required]],
      nickname: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [null, [Validators.required, Validators.minLength(6)]]
    })
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Suas alteções foram salvas.',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  ngOnInit() {
  }

}
