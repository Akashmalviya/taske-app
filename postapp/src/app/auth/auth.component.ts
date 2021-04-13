import { ToastsContainer } from './../shared/components/toaster/toaster.component';
import { ToastService } from './../shared/services/toaster.service';

import { HttpClient } from '@angular/common/http';
import { API } from './../shared/constants/endpoints';
import { AbstractControl, Validators } from '@angular/forms';
import { FormControl, FormGroup, FormGroupDirective, NgForm, } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiHandlerService } from '../shared/services/api-handler.service';
import { Subscription } from 'rxjs';
import { StorageAccessorService } from '../shared/services/localstorage-accessor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** Error when the parent is invalid */
export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers:[ToastsContainer]
})
export class AuthComponent implements OnInit {
   matcher = new MyErrorStateMatcher();
    errorMatcher = new CrossFieldErrorMatcher();

  signUp : FormGroup;
  @ViewChild('nav') nav: any;
  login : FormGroup;

  constructor(private _fb :FormBuilder,
    private http: HttpClient,
    private storage : StorageAccessorService,
   private toastr: ToastrService,
    private router : Router,
    private _api : ApiHandlerService) { }
  hidePasswordSignUp1 = true;
  hidePasswordSignUp2 = true;
  hidePasswordLogin = true;

  activeId = 2

  loginSub : Subscription
  signSub : Subscription

  ngOnInit(): void {
    this.createSignUpForm();
    this.createLoginForm();

 }

  createSignUpForm(){
    this.signUp = this._fb.group({
      email : new FormControl('', [
    Validators.required,
    Validators.email,
  ]),
      password :['',Validators.required],
      confirm_password :[],
      name:['',Validators.required]
    }, {validator: this.passwordConfirming})
  }
   createLoginForm(){
    this.login = this._fb.group({
      email : new FormControl('', [
    Validators.required,
    Validators.email,
  ]),
      password :['',Validators.required],

    })
  }

  get signUpFormCntrl(){
    return this.signUp.controls
  }
  get loginFormCntrl(){
    return this.login.controls
  }

    passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
        return {invalid: true};
    }
}


signUpUser(){


  if(this.signUp.invalid)return;
  const URL = API.USER_ENDPONTS.SIGN_UP;
  this.signSub =this._api.apiPost(URL,this.signUp.value).subscribe({
    next:next=>{
     this.nav.select(1)
     this.toastr.success('Congratulation! You are signUp', 'Please Login!');
      this.signSub && this.signSub.unsubscribe()
     this.signUp.reset();
    },
    error:error=>{
      console.log(error);
      this.toastr.error(error.error);
    },
    complete:()=>{

    }
  })

  // this._api.apiPost()

}
loginUser(){


  if(this.login.invalid)return;
  const URL = API.USER_ENDPONTS.LOGIN;
 this.loginSub = this._api.apiPost(URL,this.login.value).subscribe({
    next:next=>{
      console.log(next);
       this.loginSub && this.loginSub.unsubscribe()
      this.storage.storeData(next.data)
      this.storage.storeToken(next['token'])
      if(next.data['role'] === 'user') this.router.navigate(['user'])
      if(next.data['role'] === 'admin') this.router.navigate(['admin'])
 this.toastr.success('Congratulation! You are Logged in');

    },
    error:error=>{
      console.log(error);
      this.loginSub && this.loginSub.unsubscribe()
this.toastr.error('Invalid Id Password');
    },
    complete:()=>{

    }
  })

  // this._api.apiPost()

}
}
