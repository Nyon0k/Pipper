import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { UserService } from "../../services/user/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  @Input() user;

  photo: SafeResourceUrl;
  registerForm: FormGroup;
  user_id;
  constructor(
    public formbuilder: FormBuilder,
    public toastController: ToastController,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router) { 
    this.registerForm = this.formbuilder.group({
      name: [null],
      nickname: [null],
      email: [null, [Validators.email]],
      password: [null, [Validators.minLength(6)]],
    })

    this.user_id = Number(localStorage.getItem('id_user'));
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

  ionViewWillEnter(){
    console.log('IVWE');
  }

  editarPerfil(){
    if(this.photo){
      this.registerForm.value.photo = this.photo['changingThisBreaksApplicationSecurity'];
      }else{
        this.registerForm.value.photo = null;
      }
    this.userService.editUser(this.registerForm.value).subscribe((res) =>{
      console.log(res)
      console.log('perfil editado');
      this.presentToast();
      this.router.navigate(['/profile', {'userId': this.user_id}]);

    });
  }

  back() {
    this.router.navigate(['/profile', {'userId': this.user_id}]);
  }


}
