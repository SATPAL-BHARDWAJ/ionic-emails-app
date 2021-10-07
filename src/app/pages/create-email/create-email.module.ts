import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEmailPageRoutingModule } from './create-email-routing.module';

import { CreateEmailPage } from './create-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEmailPageRoutingModule
  ],
  declarations: [CreateEmailPage]
})
export class CreateEmailPageModule {}
