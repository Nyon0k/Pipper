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

  deletePostUser(post_id): Observable<any>{
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    return this.http.delete(this.apiUrl + 'deletePost/' + post_id, this.httpHeaders);
  }

  editPostUser(post_id, form): Observable<any>{
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'updatePost/' + post_id, form, this.httpHeaders);
  }

  likePost(post_id): Observable<any>{
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'like/' + post_id, null, this.httpHeaders);
  }

  ratePost(post_id, rate): Observable<any>{
    this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'rating/'+ post_id  + '/' + rate, null, this.httpHeaders)
  }

}
