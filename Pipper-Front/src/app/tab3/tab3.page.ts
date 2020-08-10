import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  photo: SafeResourceUrl;
  registerForm: FormGroup;

  constructor(private sanitizer: DomSanitizer, public formbuilder: FormBuilder) {

  this.registerForm = this.formbuilder.group({
    title: [null,[Validators.required]],
    form: [null, [Validators.required]],
  });
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

  submitForm(form){
    console.log(form);
    console.log(form.value);
  }

}
