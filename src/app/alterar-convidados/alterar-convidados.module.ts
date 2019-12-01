import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlterarConvidadosPage } from './alterar-convidados.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarConvidadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlterarConvidadosPage]
})
export class AlterarConvidadosPageModule {}
