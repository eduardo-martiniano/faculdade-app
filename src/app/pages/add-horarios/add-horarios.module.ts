import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHorariosPageRoutingModule } from './add-horarios-routing.module';

import { AddHorariosPage } from './add-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddHorariosPageRoutingModule
  ],
  declarations: [AddHorariosPage]
})
export class AddHorariosPageModule {}
