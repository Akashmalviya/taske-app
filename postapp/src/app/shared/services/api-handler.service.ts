import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageAccessorService } from './localstorage-accessor.service';

interface ErroeObject {
  caller?: string;
  errorTitle?: string;
  errorMessage?: string;
}

interface Extras {
  contentType: {
    isFormDataContent?: boolean;
    isJsonContent?: boolean;
  };
}

interface HttpResponseData {
  data?: any;
  message?: any;
  error?: any;
  success?: any;
}

@Injectable()
export class ApiHandlerService {

  constructor(private http: HttpClient, private localStorage: StorageAccessorService) { }

  apiGet(url, params?, extras?: Extras) {
    let options = this.renderHeaders(extras);
    options = this.appendParams(options, params);
    return this.http.get<any>(url, options);
  }

  apiPost(url, reqBody, params?, extras?: Extras) {
    let options = this.renderHeaders(extras);
    options = this.appendParams(options, params);
    reqBody = reqBody ? reqBody : {};
    return this.http.post<HttpResponseData>(url, reqBody, options);
  }

  apiUpdate(url, reqBody, params?, extras?: Extras) {
    let options = this.renderHeaders(extras);
    options = this.appendParams(options, params);
    return this.http.put(url, reqBody, options);
  }
 apiPatch(url, reqBody, params?, extras?: Extras) {
    let options = this.renderHeaders(extras);
    options = this.appendParams(options, params);
    return this.http.patch(url, reqBody, options);
  }
  apiDelete(url, params?, extras?) {
    let options = this.renderHeaders(extras);
    options = this.appendParams(options, params);
    return this.http.delete(url);
  }

  private renderHeaders(extras: Extras) {
    // if extras is present then apply check
    if (extras) {
      if (extras.contentType.isFormDataContent) {
        return {};
      }
    } else {
      // else assume it to be json data
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          'Expires': '-1',
          'Pragma': 'no-cache'
        })
      };
    }
  }

  private appendParams(originalOptions, paramsObj) {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.append(key, paramsObj[key]);
      }
    }
    return Object.assign({}, originalOptions, { params: params });
  }

}
