import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {LoginComponentComponent} from './login-component.component';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
    declarations: [LoginComponentComponent],
    exports: [LoginComponentComponent],
    providers: [AuthService]
})
export class LoginComponentModule{}