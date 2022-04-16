import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServiceClientService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Disposition': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };

  getRequest(action: string, request: any): Observable<any> {
    if(request) {
      let query: string[] = [];
      Object.keys(request).forEach((key) => {
        if(request[key]) {
          query.push(`${key}=${request[key]}`);
        }
      });
      if(query.length > 0){
        action = `${action}?${query.join('&')}`;
      }
    }
    return this.httpClient.get(environment.endUrl + action, { headers: this.httpOptions.headers });
  }

  postBodyRequest(action: string, request: any, id: number = 0): Observable<any> {
    if (id == 0) {
      return this.httpClient.post(environment.endUrl + action, request, { headers: this.httpOptions.headers });
    }
    else {
      return this.httpClient.put(environment.endUrl + action + '/' + id, request, { headers: this.httpOptions.headers });
    }
  }

  postFormRequest(action: string, form: FormData, request: any, id: number = 0, properties: string[] = []): Observable<any> {
    Object.keys(request).forEach((key) => {
      if(request[key]) {
        if(properties.includes(key)) {
          form.append(key, (new Date(request[key])).toDateString());
        }
        else {
          form.append(key, request[key]);
        }
      }
    });
    if (id == 0) {
      return this.httpClient.post(environment.endUrl + action, form, { headers: this.httpOptions.headers });
    }
    else {
      return this.httpClient.put(environment.endUrl + action + '/' + id, form, { headers: this.httpOptions.headers });
    }
  }

  deleteRequest(action: string, id: number): Observable<any> {
    return this.httpClient.delete(environment.endUrl + action + '/' + id, { headers: this.httpOptions.headers });
  }

}
