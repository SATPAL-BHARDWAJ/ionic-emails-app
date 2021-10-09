import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEmailPageRoutingModule } from './create-email-routing.module';

import { CreateEmailPage } from './create-email.page';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateEmailPageRoutingModule,
  ],
  declarations: [CreateEmailPage],
  providers: [EmailComposer]
})
export class CreateEmailPageModule {}
