import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTarefaPageRoutingModule } from './editar-tarefa-routing.module';

import { EditarTarefaPage } from './editar-tarefa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditarTarefaPageRoutingModule
  ],
  declarations: [EditarTarefaPage]
})
export class EditarTarefaPageModule {}
