import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpbService {

  users = [
    { pseudo: "mario", mdp: "mdpmdp", role: "USER" },
    { pseudo: "meruem", mdp: "mdpmdp", role: "SUPERADMIN" },
    { pseudo: "motoko", mdp: "mdpmdp", role: "ADMIN" },
    { pseudo: "moto", mdp: "mdpmdp", role: "USER" }

  ]

  isAuthenticated: BehaviorSubject<boolean>;
  userAuthenticated; //: BehaviorSubject<any>;

  urlSpb = 'https://filmlksapi.herokuapp.com/';

  constructor(private httpClient: HttpClient) {
    this.isAuthenticated = new BehaviorSubject<boolean>(false);
    //this.userAuthenticated = new BehaviorSubject<any>({ pseudo: null, role: null });
    this.userAuthenticated = { pseudo: null, role: null, mdp: null };
  }

  public getAllMovies() {
    const url = ''.concat(this.urlSpb, 'movies');
    return this.httpClient.get(url);
  }


  // ********** Authentification **********

  public getUsers() {
    return this.users;
  }

  public login(pseudo, mdp) {

    
    for (let user of this.users) {
      if (user.pseudo === pseudo && user.mdp === mdp) {
        let setUser = { pseudo: user.pseudo, role: user.role, mdp: user.mdp };
       
        this.setUserAuthenticated(setUser);
        this.setIsAuthenticated(true);
      }
    }
    //return this.setIsAuthenticated(res);
  }

  public setIsAuthenticated(res) {
    if (res)
      console.log("on est authentifié ");
    this.isAuthenticated.next(res);
  }

  public getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }

  public setUserAuthenticated(res) {
    //this.userAuthenticated.next(res);
    this.userAuthenticated = res;
  }

  public getUserAuthenticated() {
    //return this.userAuthenticated.asObservable();
    return this.userAuthenticated;
  }

}
