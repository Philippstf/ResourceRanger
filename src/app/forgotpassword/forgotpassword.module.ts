import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotpasswordPageRoutingModule } from './forgotpassword-routing.module';
import { ForgotPasswordPage } from './forgotpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotpasswordPageRoutingModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotpasswordPageModule {}
