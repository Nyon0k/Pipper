import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:8000/api/';

  httpHeaders: object = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  constructor( public http: HttpClient ) { }


  public editUser(form): Observable<any>{
    this.httpHeaders['headers']["Authorization"] = 'Bearer ' + localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'updateUser/', form, this.httpHeaders);
  }

  public showUser(id): Observable<any>{
    return this.http.get(this.apiUrl + 'showUser/' + id);
  }

  public listPostUser(id){
    return this.http.get(this.apiUrl + 'listPostsByAUser/' + id);
  }
}
