import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Capacitor, FilesystemDirectory } from '@capacitor/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../services/auth/auth.service';
import { Router, Routes, RouterModule } from '@angular/router';
import { start } from 'repl';
const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  photo: SafeResourceUrl;
  postForm: FormGroup;

  rating;
  starColor1 = false;
  starColor2 = false;
  starColor3 = false;
  starColor4 = false;
  starColor5 = false;


  constructor(private sanitizer: DomSanitizer, public formbuilder: FormBuilder, public authservice: AuthService, public router: Router) {

  this.postForm = this.formbuilder.group({
    title: [null,[Validators.required]],
    text: [null, [Validators.required]],
    //photo: [null]
  });
 }

 star(n){
   switch(n){
     case(1):
      this.rating=1;
      this.starColor1 = true;
      this.starColor2 = false;
      this.starColor3 = false;
      this.starColor4 = false;
      this.starColor5 = false;
      break
     case(2):
      this.rating=2;
      this.starColor1 = true;
      this.starColor2 = true;
      this.starColor3 = false;
      this.starColor4 = false;
      this.starColor5 = false;
      break
     case(3):
      this.rating=3;
      this.starColor1 = true;
      this.starColor2 = true;
      this.starColor3 = true;
      this.starColor4 = false;
      this.starColor5 = false;
      break
     case(4):
      this.rating=4;
        this.starColor1 = true;
        this.starColor2 = true;
        this.starColor3 = true;
        this.starColor4 = true;
        this.starColor5 = false;
      break
     case(5):
      this.rating=5;
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

  submitForm(postForm){
    postForm.value.rating = this.rating;
    if(this.photo)
    postForm.value.photo = this.photo['changingThisBreaksApplicationSecurity'];
    console.log(postForm.value);
    this.authservice.createPost(postForm.value).subscribe(
      (res)=> {
        this.router.navigate(['/tabs/tab1'])
        console.log(res);
        console.log("Post foi criado.");
        this.router.navigate(['/tabs/tab1']);
      },
      (err) => {
        console.log(err);
      }
    );
}

}
