import { NgModule } from '@angular/core';
import {HomePostComponent} from '../home-post/home-post.component';

@NgModule({
    declarations: [HomePostComponent],
    exports: [HomePostComponent]
})
export class HomePostModules{}