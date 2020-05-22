import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url = 'http://localhost:8088/';

  constructor(private http: HttpClient) { }

  getFilms() {
    return this.http.get(this.url+'movies');
  }
  
}
