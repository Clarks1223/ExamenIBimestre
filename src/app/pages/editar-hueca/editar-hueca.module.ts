import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarHuecaPageRoutingModule } from './editar-hueca-routing.module';

import { EditarHuecaPage } from './editar-hueca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarHuecaPageRoutingModule
  ],
  declarations: [EditarHuecaPage]
})
export class EditarHuecaPageModule {}
