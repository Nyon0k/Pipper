import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Capacitor, FilesystemDirectory } from '@capacitor/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../services/auth/auth.service';
import { Router, Routes, RouterModule } from '@angular/router';
const { Camera, Filesystem } = Plugins;
import { PopoverController } from '@ionic/angular';
import { TagsComponent } from '../components/tags/tags.component';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
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
  photo: SafeResourceUrl;
  postForm: FormGroup;

  creator_rating;
  starColor1 = false;
  starColor2 = false;
  starColor3 = false;
  starColor4 = false;
  starColor5 = false;


  constructor(
    private sanitizer: DomSanitizer, 
    public toastController: ToastController,
    public formbuilder: FormBuilder, 
    public authservice: AuthService, 
    public router: Router,
    public popoverController: PopoverController) {

  this.postForm = this.formbuilder.group({
    title: [null,[Validators.required]],
    text: [null, [Validators.required]],
    //photo: [null]
  });
 }

 ngOnInit() {

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

 star(n){
   switch(n){
     case(1):
      this.creator_rating=1;
      this.starColor1 = true;
      this.starColor2 = false;
      this.starColor3 = false;
      this.starColor4 = false;
      this.starColor5 = false;
      break
     case(2):
      this.creator_rating=2;
      this.starColor1 = true;
      this.starColor2 = true;
      this.starColor3 = false;
      this.starColor4 = false;
      this.starColor5 = false;
      break
     case(3):
      this.creator_rating=3;
      this.starColor1 = true;
      this.starColor2 = true;
      this.starColor3 = true;
      this.starColor4 = false;
      this.starColor5 = false;
      break
     case(4):
      this.creator_rating=4;
      this.starColor1 = true;
      this.starColor2 = true;
      this.starColor3 = true;
      this.starColor4 = true;
      this.starColor5 = false;
      break
     case(5):
      this.creator_rating=5;
      this.starColor1 = true;
      this.starColor2 = true;
      this.starColor3 = true;
      this.starColor4 = true;
      this.starColor5 = true;
      break
   }

 }

  async takePhoto(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    console.log(image);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log(this.photo);
  }

  async createPostAlertSuccess() {
    const toast = await this.toastController.create({
      message: 'Sua publicação foi criada com sucesso!',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  async createPostAlertError() {
    const toast = await this.toastController.create({
      message: 'Sua publicação não pode ser criada.',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  submitForm(postForm){
    postForm.value.creator_rating = this.creator_rating;
    if(this.photo)
    postForm.value.photo = this.photo['changingThisBreaksApplicationSecurity'];
    console.log(postForm.value);
    this.authservice.createPost(postForm.value).subscribe(
      (res)=> {
        this.router.navigate(['/tabs/tab1'])
        console.log(res);
        console.log("Post foi criado.");
        this.router.navigate(['/tabs/tab1']);
        this.createPostAlertSuccess();
      },
      (err) => {
        console.log(err);
        this.createPostAlertError();
      }
    );
}

}
