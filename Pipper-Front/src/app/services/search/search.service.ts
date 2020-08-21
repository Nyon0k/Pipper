import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  search(form): Observable<any>{
    return this.http.put(this.apiUrl + 'search', form);
  }

  searchTag(tagId): Observable<any>{
    return this.http.put(this.apiUrl + 'searchtag', tagId);
  }

}
