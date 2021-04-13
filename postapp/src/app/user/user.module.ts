import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';

import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
const routes: Routes = [
  {
    path : '' , component :UserComponent
  },
];
@NgModule({
  declarations: [UserComponent, HeaderComponent, PostComponent],

  imports: [
    CommonModule,
      RouterModule.forChild(routes),
      MatDialogModule,
       MatFormFieldModule,
       MatButtonModule,
      MatInputModule,
      MatListModule,
      FormsModule
  ],
  entryComponents:[PostComponent]

})
export class UserModule { }
