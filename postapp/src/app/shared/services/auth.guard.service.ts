import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageAccessorService } from './localstorage-accessor.service';

@Injectable()
export class UserGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private localStorage: StorageAccessorService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorage.fetchToken();
      const user = this.localStorage.fetchData();
    // console.log('Current URL : ', state.url);//'candidates'
    if (token && user.role === 'user') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}

@Injectable()
export class adminGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private localStorage: StorageAccessorService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorage.fetchToken();
      const user = this.localStorage.fetchData();
    // console.log('Current URL : ', state.url);//'candidates'
    if (token && user.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}



@Injectable()
export class islogin implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private localStorage: StorageAccessorService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorage.fetchToken();
     const user = this.localStorage.fetchData();
    // console.log('Current URL : ', state.url);//'candidates'
    if (token) {
      if(user.role === 'user'){
        this.router.navigate(['user'])
      }
      if(user.role === 'admin'){
        this.router.navigate(['admin'])
      }
      return false
    }else return true

  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}

