import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl: string = 'http://localhost:8000/api/';
  constructor(public http:HttpClient) { }

  listPostComment(post_id): Observable<any>{
    return this.http.get(this.apiUrl + 'postUserComment/' + post_id)
  }

  listPostInfo(post_id): Observable<any>{
    return this.http.get(this.apiUrl + 'showPost/' + post_id)
  }
}
