import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlterarBuffetPage } from './alterar-buffet.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarBuffetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlterarBuffetPage]
})
export class AlterarBuffetPageModule {}
