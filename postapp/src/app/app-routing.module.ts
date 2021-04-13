import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { adminGuardService, islogin, UserGuardService } from './shared/services/auth.guard.service';

const routes: Routes = [
  {
    path : '' , canActivate:[islogin], loadChildren :()=> import('./auth/auth.module').then(e=>e.AuthModule)
  },
    {
    path : 'admin' , canActivate:[adminGuardService], loadChildren :()=> import('./admin/admin.module').then(e=>e.AdminModule)
  },
     {
    path : 'user' ,canActivate:[UserGuardService], loadChildren :()=> import('./user/user.module').then(e=>e.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
