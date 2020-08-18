import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePostComponent } from '../home-post/home-post.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HomePostComponent],
    exports: [HomePostComponent]
})
export class HomePostModules{}