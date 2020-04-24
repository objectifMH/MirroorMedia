import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InOutService {

  isAffiche: BehaviorSubject<boolean>;
  bool = false;

  constructor() {
    this.isAffiche = new BehaviorSubject<boolean>(false);
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
}
