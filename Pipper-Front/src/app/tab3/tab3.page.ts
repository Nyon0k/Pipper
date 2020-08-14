import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Capacitor, FilesystemDirectory } from '@capacitor/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../services/auth/auth.service';
import { Router, Routes, RouterModule } from '@angular/router';
const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  photo: SafeResourceUrl;
  postForm: FormGroup;


  constructor(private sanitizer: DomSanitizer, public formbuilder: FormBuilder, public authservice: AuthService, public router: Router) {

  this.postForm = this.formbuilder.group({
    title: [null,[Validators.required]],
    text: [null, [Validators.required]],
  });
 }

//  async takePhoto() {
//   const options = {
//     resultType: CameraResultType.Uri

//   };
//   console.log('entrou');
//   const originalPhoto = await Camera.getPhoto(options);
//   console.log(originalPhoto)
//   const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path });
//   console.log(photoInTempStorage)
//   let date = new Date(),
//     time = date.getTime(),
//     fileName = time + ".jpeg";
//     console.log(date);

//   await Filesystem.writeFile({
//     data: photoInTempStorage.data,
//     path: fileName,
//     directory: FilesystemDirectory.Data
//   });
//   console.log(FilesystemDirectory);
//   const finalPhotoUri = await Filesystem.getUri({
//     directory: FilesystemDirectory.Data,
//     path: fileName
//   });
//   console.log(finalPhotoUri);
//   let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
//   console.log(photoPath);
// }

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
    this.authservice.createPost(postForm.value).subscribe(
      (res)=> {
        console.log(res);
        console.log("Post foi criado.");
      },
      (err) => {
        console.log(err);
      }
    );
    this.router.navigate(['/tabs/tab1'])
}

}
