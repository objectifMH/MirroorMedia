import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpbService {

  urlSpb =  'http://localhost:8088/';

  constructor(private httpClient: HttpClient) { }

  public getAllMovies() {
    const url = ''.concat(this.urlSpb, 'movies');
    return this.httpClient.get(url);
  }

}
