import { NgModule } from '@angular/core';
import { UserComponentComponent } from '../../../components/user-component/user-component/user-component.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [UserComponentComponent],
    exports: [UserComponentComponent]
})
export class UserComponentComponentModules{}