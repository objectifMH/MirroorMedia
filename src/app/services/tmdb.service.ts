import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  urlBase =  'https://api.themoviedb.org/3/';
  discoverFilms = 'discover/movie?api_key=369db2052a84d1a49d133d25a3983cbd&language=en-US&sort_by=popularity.desc';
  discoverTv = 'discover/tv?api_key=369db2052a84d1a49d133d25a3983cbd&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false';
  
  constructor(private httpClient: HttpClient) { }

  public getDiscoverFilms() {
    return this.httpClient.get(this.urlBase + this.discoverFilms);
  }
  public getDiscoverTvs() {
    return this.httpClient.get(this.urlBase + this.discoverTv);
  }
  //movie/{movie_id}/credits?api_key=<<api_key>> https://api.themoviedb.org/3/movie/603/credits?api_key=369db2052a84d1a49d133d25a3983cbd
  public getActeursByFilm(film) {
    console.log(film);
    const pref = film.title !== undefined ? 'movie' : 'tv';
    return this.httpClient.get(this.urlBase + pref + '/' + film.id + '/credits?api_key=369db2052a84d1a49d133d25a3983cbd');
  }



}