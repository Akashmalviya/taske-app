import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { API } from 'src/app/shared/constants/endpoints';
import { ApiHandlerService } from 'src/app/shared/services/api-handler.service';
import { StorageAccessorService } from 'src/app/shared/services/localstorage-accessor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   logoutsub : Subscription

  constructor(
    private _api : ApiHandlerService,
    private router : Router,
    public storage : StorageAccessorService,

  ) { }

  ngOnInit(): void {
  }


  logout(){
    const api = API.USER_ENDPONTS.LOGOUT_ADMIN;
  this.logoutsub =  this._api.apiGet(api).subscribe({
    next:next=>{
      this.logoutsub.unsubscribe();
      this.storage.deleteData();
      this.storage.deleteToken();
      this.router.navigate(['/'])
    }
  })
  }


}
