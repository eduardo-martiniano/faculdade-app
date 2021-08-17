import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarefaDetalhesPageRoutingModule } from './tarefa-detalhes-routing.module';

import { TarefaDetalhesPage } from './tarefa-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarefaDetalhesPageRoutingModule
  ],
  declarations: [TarefaDetalhesPage]
})
export class TarefaDetalhesPageModule {}
