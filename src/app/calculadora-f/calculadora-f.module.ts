import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalculadoraFPage } from './calculadora-f.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraFPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalculadoraFPage]
})
export class CalculadoraFPageModule {}
