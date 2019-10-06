import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalculadoraEPage } from './calculadora-e.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraEPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalculadoraEPage]
})
export class CalculadoraEPageModule {}
