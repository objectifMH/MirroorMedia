import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { Film } from 'src/film';

@Injectable({
  providedIn: 'root'
})
export class InOutService {

  filmAAfficher: Subject<Film>;
  isAffiche: BehaviorSubject<boolean>;
  bool = false;

  constructor() {
    this.isAffiche = new BehaviorSubject<boolean>(false);
    this.filmAAfficher = new BehaviorSubject<Film>(null);
  }

  public getAfficheFilm() {
    return this.isAffiche.asObservable();
  }

  public setAfficheFilm() {
    console.log('Dans le service : on fixe le setAffiche');
    this.bool = !this.bool;
    this.isAffiche.next(this.bool);
    console.log('Dans le service : setAffiche' , this.isAffiche);
  }

  public setAfficheThisFilm(film) {
    this.filmAAfficher.next(film);
    console.log('Dans le service : on fixe le setAfficheThisFilm' , film);

  }

  public getAfficheThisFilm() {
    console.log('Dans le service : on return le getAfficheThisFilm' , this.filmAAfficher);
    return this.filmAAfficher.asObservable();
  }
}
