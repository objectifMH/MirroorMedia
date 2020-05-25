import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  urlImage =  'https://image.tmdb.org/t/p/original';
  apiKey =  '369db2052a84d1a49d133d25a3983cbd';
  urlBase =  'https://api.themoviedb.org/3/';

  constructor(private httpClient: HttpClient) { }

  public getUrlBaseImg() {
    return this.urlImage;
  }

  public getDiscoverFilms() {
    const url = ''.concat(this.urlBase, 'discover/movie?api_key=', this.apiKey, '&language=en-US&sort_by=popularity.desc');
    return this.httpClient.get(url);
  }
  public getDiscoverTvs() {
    const url = ''.concat(this.urlBase, 'discover/tv?api_key=', this.apiKey,
                '&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false');
    return this.httpClient.get(url);
  }

  // Les acteurs d'un Film :
  public getActeursByFilm(film) {
    console.log(film);
    const pref = film.title !== undefined ? 'movie' : 'tv';
    const url = this.urlBase + pref + '/' + film.id + '/credits?api_key=' + this.apiKey;
    return this.httpClient.get(url);
  }

  // Information acteur :
  public getActeurs(id) {
    const url = ''.concat(this.urlBase, 'person/', id, '?api_key=', this.apiKey);
    return this.httpClient.get(url);
  }

  // Les Séries d'un acteurs :
  public getTvForActeur(id) {
    const url = ''.concat(this.urlBase, 'person/', id, '/tv_credits?api_key=', this.apiKey);
    return this.httpClient.get(url);
  }

  // Les Films d'un acteurs :
  public getFilmsForActeur(id) {
    const url = ''.concat(this.urlBase, 'person/', id, '/movie_credits?api_key=', this.apiKey);
    return this.httpClient.get(url);
  }

  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  // Les informations sur un film :
  public getInfoFilm(id) {
    const url = ''.concat(this.urlBase, 'movie/', id, '?api_key=', this.apiKey);
    return this.httpClient.get(url);
  }

  // Les informations sur un tv :
  public getInfoTv(id) {
    const url = ''.concat(this.urlBase, 'tv/', id, '?api_key=', this.apiKey);
    return this.httpClient.get(url);
  }

  //https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
  // multi Recherche Movie, TvShow, People :

  public search(recherche, page = null) {
    page = page ? page : 1 ;
    const url = ''.concat(this.urlBase, 'search/multi?api_key=', this.apiKey,
                   '&language=en-US&page=', page, '&include_adult=false&query=', recherche);
    return this.httpClient.get(url);
  }


}
