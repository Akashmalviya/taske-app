import { Component, OnInit } from '@angular/core';
import { API } from '../shared/constants/endpoints';
import { ApiHandlerService } from '../shared/services/api-handler.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loading = false

  post:any

  constructor(
    private _api : ApiHandlerService
  ) { }

  userList:any

  ngOnInit(): void {
    this.getUserList()
  }
  getUserList(){
    this._api.apiGet(API.USER_ENDPONTS.USER_LIST).subscribe({
      next:next=>{
        console.log(next);
this.userList = next.data
      },
      error:err=>{
        console.log(err);

      },

    })


  }
   getUserPostList(ID){
      this.loading = true
    this._api.apiGet(API.USER_ENDPONTS.USER_POST_LIST(ID)).subscribe({
      next:next=>{
        console.log(next);
this.post = next.data
this.loading = false

      },
      error:err=>{
        console.log(err);
this.loading = false
      },

    })


    }

}
