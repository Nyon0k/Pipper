import { NgModule } from '@angular/core';
import {ProfilePostComponent} from '../profile-post/profile-post.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [ProfilePostComponent],
    exports: [ProfilePostComponent]
})
export class ProfilePostModules{}