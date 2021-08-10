import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMateriaPageRoutingModule } from './add-materia-routing.module';

import { AddMateriaPage } from './add-materia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddMateriaPageRoutingModule
  ],
  declarations: [AddMateriaPage]
})
export class AddMateriaPageModule {}
