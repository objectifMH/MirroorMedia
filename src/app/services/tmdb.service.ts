import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  discover = 'https://api.themoviedb.org/3/discover/movie?api_key=369db2052a84d1a49d133d25a3983cbd&language=en-US&sort_by=popularity.desc';
  constructor(private httpClient: HttpClient) { }

  public getDiscover() {
    console.log('Get Discover est appelé');
    return this.httpClient.get(this.discover);
  }


}