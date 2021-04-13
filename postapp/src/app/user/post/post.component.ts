import { API } from './../../shared/constants/endpoints';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/auth/auth.component';
import { ApiHandlerService } from 'src/app/shared/services/api-handler.service';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toaster.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  constructor(
    private _api : ApiHandlerService,
    private toaster : ToastrService,
     public dialogRef: MatDialogRef<PostComponent>,
  ) { }

  ngOnInit(): void {
  }

  postSub:Subscription;

  createPost(form :NgForm){
    if(form.invalid)return;
    this._api.apiPost(API.USER_ENDPONTS.CREATE_POST,form.value).subscribe({
      next:next=>{

        console.log(next)
        this.toaster.success('Post is Create')
        this.dialogRef.close(true);
         this.postSub.unsubscribe()
      },
      error:error=>{
       this.postSub && this.postSub.unsubscribe()
        this.toaster.success('Something went wrong')

        console.log(error)
      }
    })
  }
}
