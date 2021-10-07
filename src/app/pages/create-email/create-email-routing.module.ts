import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEmailPage } from './create-email.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEmailPageRoutingModule {}
