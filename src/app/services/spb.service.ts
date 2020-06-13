import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { InOutService } from './in-out.service';

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
  userCart;
  userCarts;

  urlSpb = 'https://filmlksapi.herokuapp.com/';

  constructor(private httpClient: HttpClient , private inout: InOutService) {
    this.isAuthenticated = new BehaviorSubject<boolean>(false);
    //this.userAuthenticated = new BehaviorSubject<any>({ pseudo: null, role: null });
    this.userAuthenticated = { pseudo: null, role: null, mdp: null, cart: null, carts:null };
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
        // on recupère dans le local storage le panier 
        //this.userCart = localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')) : {};
       
        //this.inout.setCart(this.userCart);
        let setUserStorage = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {} ;
        let setUser = { pseudo: user.pseudo, role: user.role, mdp: user.mdp , cart: this.userCart, carts: this.userCarts };
        console.log(setUserStorage.pseudo, setUser.pseudo);
        if ( setUserStorage.pseudo === setUser.pseudo)
        {
          setUser = setUserStorage ;
        }
        
        this.setUserAuthenticated(setUser);
        this.setIsAuthenticated(true);
      }
    }
  }

  public setIsAuthenticated(res) {
    this.isAuthenticated.next(res);
  }

  public getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }

  public setUserAuthenticated(res) {
    
    // On stock dans le local storage l'utilisateur avec son panier ( pout l'instant juste le prix et la qté )
    
    if ( res !== null )
    {
      let stateStringify = JSON.stringify(res)
      localStorage.setItem('user', stateStringify);
    }

    this.userAuthenticated = res;
  }

  public getUserAuthenticated() {
    return this.userAuthenticated;
  }

  public inscription(login, mdp){
    let res = true;
    for ( let user of this.users)
    {
      if  ( user.pseudo === login )
      {
        res = false;
      }
    }
    if ( res )
    {
      this.users = [...this.users,  { pseudo: login, mdp: mdp, role: "USER" }]
    }
    return res;
  }

}
