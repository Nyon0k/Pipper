import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:string = 'http://localhost:8000/api/'

  constructor(public http: HttpClient) { }

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  public register(form): Observable<any> {
    return this.http.post(this.apiUrl + 'register',  form, this.httpHeaders);
  }

  public login(form): Observable<any> {
    return this.http.post(this.apiUrl + 'login',  form, this.httpHeaders);
  }

}
