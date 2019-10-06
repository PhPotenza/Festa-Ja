import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalculadoraGPage } from './calculadora-g.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraGPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalculadoraGPage]
})
export class CalculadoraGPageModule {}
