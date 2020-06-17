import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { InOutService } from './in-out.service';

@Injectable({
  providedIn: 'root'
})
export class SpbService {

  users = [
    { pseudo: "mario", mdp: "mdpmdp", role: "USER", cart: null, carts: null },
    { pseudo: "meruem", mdp: "mdpmdp", role: "SUPERADMIN", cart: null, carts: null },
    { pseudo: "motoko", mdp: "mdpmdp", role: "ADMIN", cart: null, carts: null },
    { pseudo: "moto", mdp: "mdpmdp", role: "USER", cart: null, carts: null }

  ]
  /* 
    isAuthenticated: BehaviorSubject<boolean>; */
  userAuthenticated: BehaviorSubject<any>;
  userCart;
  userCarts;

  cart: BehaviorSubject<any>;
  carts: BehaviorSubject<any>;

  urlSpb = 'https://filmlksapi.herokuapp.com/';

  constructor(private httpClient: HttpClient, private inout: InOutService) {/* 
    this.isAuthenticated = new BehaviorSubject<boolean>(false); */
    this.userAuthenticated = new BehaviorSubject<any>({ pseudo: null, role: null, mdp: null, cart: null, carts: null });


    this.cart = new BehaviorSubject<any>({ quantity: 0, total: 0 });
    this.carts = new BehaviorSubject<any>(null);


    //this.userAuthenticated = { pseudo: null, role: null, mdp: null, cart: null, carts: null };
    this.getLocatStorageUsers();

  }

  public getLocatStorageUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      const stateStringify = JSON.stringify(this.users)
      localStorage.setItem('users', stateStringify);
    } else {
      this.users = users;
    }
  }

  public getAllMovies() {
    const url = ''.concat(this.urlSpb, 'movies');
    return this.httpClient.get(url);
  }


  // ********** Authentification **********

  public getUsers() {
    return this.users;
  }

  public setUsers(users) {
    this.users = users;
  }

  public login(pseudo, mdp) {
    for (const user of this.users) {
      if (user.pseudo === pseudo && user.mdp === mdp) {

        // on recupère dans le local storage les utilisateurs :
        const users = JSON.parse(localStorage.getItem('users'));
        let userAuth = users.filter(user => user.pseudo === pseudo)
        if (userAuth) {
          userAuth.map(user => {
            this.setUserAuthenticated(user);
            this.setCarts(user.carts);
          })
        }
        else {
          // si c'est un nouveau inscrit, on l'ajoute à la liste dans le locatStorage : 
          let setUser = { pseudo: user.pseudo, role: user.role, mdp: user.mdp, cart: this.userCart, carts: this.userCarts };
          this.users = [...this.users, setUser];

          let stateStringify = JSON.stringify(this.users)
          localStorage.setItem('users', stateStringify);
          this.setUserAuthenticated(setUser);
          
        }
      }
    }
  }

  public setUserAuthenticated(res) {
    console.log(" Dans set User : " , res);
    this.userAuthenticated.next(res);
  }

  public getUserAuthenticated() {
    return this.userAuthenticated.asObservable();
  }

  public inscription(login, mdp) {
    let res = true;
    for (let user of this.users) {
      if (user.pseudo === login) {
        res = false;
      }
    }
    if (res) {
      this.users = [...this.users, { pseudo: login, mdp: mdp, role: "USER", cart: null, carts: null }];
      let stateStringify = JSON.stringify(this.users)
      localStorage.setItem('users', stateStringify);
    }
    return res;
  }


  // ********** Cart et Carts **********
  public setCart(resultat) {
    this.cart.next(resultat);
  }

  public getCart() {
    return this.cart.asObservable();
  }

  public setCarts(resultat) {

    console.log("Ma nouvelle liste ", this.users, this.userAuthenticated['_value']['pseudo'] , resultat)

    for (let user of this.users) {
      if (user.pseudo === this.userAuthenticated['_value']['pseudo']) {
        user.carts = resultat
      }
    }
    const stateStringify = JSON.stringify(this.users)
    localStorage.setItem('users', stateStringify);
    console.log(this.users)

    this.carts.next(resultat);
  }

  public getCarts() {
    console.log(' Dans  getCarts : ' , this.carts);
    return this.carts.asObservable();
  }

}
