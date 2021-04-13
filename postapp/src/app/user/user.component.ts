import { API } from './../shared/constants/endpoints';
import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../shared/services/api-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private _api : ApiHandlerService
  ) { }

  listData:any
  mypostSub : Subscription

  ngOnInit(): void {
    this.getPost()
  }
  getPost(){
    const url  = API.USER_ENDPONTS.MY_POST
    this._api.apiGet(url).subscribe({
      next:next=>{
        this.listData =next.data
        console.log(next);

      },
      error:err=>{
        console.log(err);

      }
    })
  }

}
