import { AdminComponent } from './admin.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path : '' , component :AdminComponent
  },
];
@NgModule({
  declarations: [

    AdminComponent,

    HeaderComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatListModule
  ]
})
export class AdminModule { }
