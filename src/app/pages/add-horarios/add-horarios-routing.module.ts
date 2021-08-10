import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHorariosPage } from './add-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: AddHorariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHorariosPageRoutingModule {}
