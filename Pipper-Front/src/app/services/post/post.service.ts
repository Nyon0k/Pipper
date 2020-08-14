import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http:HttpClient) { }

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  listPosts(): Observable<any>{
    return this.http.get(this.apiURL + 'listPosts');
  }

  deletePost(id): Observable<any>{
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    return this.http.delete(this.apiURL + 'deletePost/' + id, this.httpHeaders);
  }
}
