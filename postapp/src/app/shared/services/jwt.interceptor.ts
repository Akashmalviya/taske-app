import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageAccessorService } from './localstorage-accessor.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private localStorage : StorageAccessorService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = this.localStorage.fetchToken();

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        // this._loader.show()
        return next.handle(request)
    }
}
