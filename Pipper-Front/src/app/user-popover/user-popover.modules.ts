import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserPopoverComponent } from '../user-popover/user-popover.component';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
    declarations: [UserPopoverComponent],
    exports: [UserPopoverComponent],
    providers: [AuthService]
})
export class UserPopoverModule{}