import { NgModule } from '@angular/core';
import {HomePostComponent} from '../home-post/home-post.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [HomePostComponent],
    exports: [HomePostComponent]
})
export class HomePostModules{}