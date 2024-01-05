import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarHuecaPage } from './editar-hueca.page';

const routes: Routes = [
  {
    path: '',
    component: EditarHuecaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarHuecaPageRoutingModule {}
