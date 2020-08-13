import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

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

  public logout(): Observable<any>{
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    console.log(this.httpHeaders);
    return this.http.get(this.apiUrl + 'logout', this.httpHeaders);
  }

  public createPost(form): Observable<any> {
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    console.log(this.httpHeaders);
    return this.http.post(this.apiUrl + 'createPost',  form, this.httpHeaders);
  }

  createComment(form,post_id): Observable<any>{
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    console.log(this.httpHeaders);
    return this.http.post(this.apiUrl+ 'createComment/' + post_id, form, this.httpHeaders);

  }

}
