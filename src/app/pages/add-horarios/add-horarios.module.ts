import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHorariosPageRoutingModule } from './add-horarios-routing.module';

import { AddHorariosPage } from './add-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddHorariosPageRoutingModule
  ],
  declarations: [AddHorariosPage]
})
export class AddHorariosPageModule {}
