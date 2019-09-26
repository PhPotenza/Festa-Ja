import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdicionarBuffetPage } from './adicionar-buffet.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarBuffetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdicionarBuffetPage]
})
export class AdicionarBuffetPageModule {}
