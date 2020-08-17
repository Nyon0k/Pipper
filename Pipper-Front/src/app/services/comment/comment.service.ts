import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl: string = 'http://localhost:8000/api/';

  
  constructor(public http:HttpClient) { }

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  listPostComment(post_id): Observable<any>{
    return this.http.get(this.apiUrl + 'showPostUserComment/' + post_id)
  }

  listPostInfo(post_id): Observable<any>{
    return this.http.get(this.apiUrl + 'showPost/' + post_id)
  }

  deleteComment(commentId): Observable<any>{
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    return this.http.delete(this.apiUrl + 'deleteComment/' + commentId, this.httpHeaders); 
    
  }
}
