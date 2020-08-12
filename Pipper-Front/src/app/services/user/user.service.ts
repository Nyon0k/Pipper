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


  public editUser(id,form): Observable<any>{
    this.httpHeaders['headers']["Authorization"] = 'Bearer ' + localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'updateUser/' + id, form, this.httpHeaders);
  }
}
