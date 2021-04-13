import { API } from './../../shared/constants/endpoints';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiHandlerService } from 'src/app/shared/services/api-handler.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StorageAccessorService } from 'src/app/shared/services/localstorage-accessor.service';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoutsub : Subscription

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private _api : ApiHandlerService,
    private router : Router,
    public storage : StorageAccessorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostComponent);

    dialogRef.afterClosed().subscribe(result => {
     if(result)this.newItemEvent.emit('data')
    });
  }

  logout(){
    const api = API.USER_ENDPONTS.LOGOUT;
  this.logoutsub =  this._api.apiGet(api).subscribe({
    next:next=>{
     this.logoutsub&& this.logoutsub.unsubscribe();
      this.storage.deleteData();
      this.storage.deleteToken();
      this.router.navigate(['/'])
    }
  })
  }

}
