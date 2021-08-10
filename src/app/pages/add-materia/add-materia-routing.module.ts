import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMateriaPage } from './add-materia.page';

const routes: Routes = [
  {
    path: '',
    component: AddMateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMateriaPageRoutingModule {}
