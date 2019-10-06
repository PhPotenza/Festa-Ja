import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalculadoraHPage } from './calculadora-h.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraHPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalculadoraHPage]
})
export class CalculadoraHPageModule {}
