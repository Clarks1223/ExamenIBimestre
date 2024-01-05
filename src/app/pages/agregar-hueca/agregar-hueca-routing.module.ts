import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarHuecaPage } from './agregar-hueca.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarHuecaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarHuecaPageRoutingModule {}
