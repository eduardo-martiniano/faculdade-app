import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarefaDetalhesPage } from './tarefa-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: TarefaDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefaDetalhesPageRoutingModule {}
