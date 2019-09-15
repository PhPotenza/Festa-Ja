import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InsirirCodigoPage } from './insirir-codigo.page';

const routes: Routes = [
  {
    path: '',
    component: InsirirCodigoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsirirCodigoPage]
})
export class InsirirCodigoPageModule {}
