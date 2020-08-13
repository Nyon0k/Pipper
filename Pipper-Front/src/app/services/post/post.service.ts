import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl: string = 'http://localhost:8000/api/';



  constructor(public http:HttpClient) { }

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  listPostsNovo(): Observable<any>{
    return this.http.get(this.apiUrl + 'listPostsByCreationDate');
  }

  listPoststTopo(): Observable<any>{
    return this.http.get(this.apiUrl + 'listPostsByRating');
  }

  listPostsSeguindo(user_id): Observable<any>{
    return this.http.get(this.apiUrl + 'listFollowerPosts/' + user_id);
  }
}
