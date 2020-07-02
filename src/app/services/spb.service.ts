import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { InOutService } from './in-out.service';

@Injectable({
  providedIn: 'root'
})
export class SpbService {

  roles = ['USER', 'ADMIN', 'SUPERADMIN'];

  users: BehaviorSubject<any>;
  /* [
    { pseudo: "mario", mdp: "mdpmdp", role: "USER", cart: null, carts: null },
    { pseudo: "meruem", mdp: "mdpmdp", role: "SUPERADMIN", cart: null, carts: null },
    { pseudo: "motoko", mdp: "mdpmdp", role: "ADMIN", cart: null, carts: null },
    { pseudo: "moto", mdp: "mdpmdp", role: "USER", cart: null, carts: null }

  ] */
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

    this.users = new BehaviorSubject<any>([
      { pseudo: "mario", mdp: "mdpmdp", role: "USER", cart: null, carts: null },
      { pseudo: "meruem", mdp: "mdpmdp", role: "SUPERADMIN", cart: null, carts: null },
      { pseudo: "motoko", mdp: "mdpmdp", role: "ADMIN", cart: null, carts: null },
      { pseudo: "moto", mdp: "mdpmdp", role: "USER", cart: null, carts: null }
    ]);

    this.cart = new BehaviorSubject<any>({ quantity: 0, total: 0 });
    this.carts = new BehaviorSubject<any>(null);


    //this.userAuthenticated = { pseudo: null, role: null, mdp: null, cart: null, carts: null };
    this.getLocatStorageUsers();

  }

  public getLocatStorageUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      this.setLocalStorageUsers(this.users.value);
    } else {
      // this.users = users;
      this.setUsers(users);
    }

    return users;
  }

  public setLocalStorageUsers(users) {
    console.log("65 >>>  setLocalStorageUsers ", users);
    const stateStringify = JSON.stringify(users);
    localStorage.setItem('users', stateStringify);
  }

  public getRoles() {
    return this.roles;
  }

  public deleteFilmlocalStorage(film) {
    let users = this.getLocatStorageUsers();
      for (let user of users)
      {
        if ( user.carts && user.carts.length > 0 ) 
        {   
          let newCarts =  [];
          for (let cart of user.carts)
          {
            if ( cart.id !== film.id )
            {
              newCarts = [...newCarts, cart];
              //console.log(cart)
            }
          }
               user.carts = newCarts;
             
        }
        if ( user.pseudo === this.userAuthenticated.value.pseudo)
        {
          this.setUserAuthenticated(user);
        }
      };
  //this.setLocalStorageUsers(users);
  this.setUsers(users);
  }

  public editFilmlocalStorage(film) {
    console.log("102  >>>  debut edit film local storage ", film);
    let users = this.getLocatStorageUsers();
      for (let user of users)
      {
        if ( user.carts && user.carts.length > 0 ) 
        {   
          let newCarts =  [];
          for (let cart of user.carts)
          {
            if ( cart.id === film.id )
            {
              console.log("cart ", cart ,' film ', film, parseInt(film.prix) )
              cart = { date: film.date,  prix:film.prix, title:film.title, id:film.id, inCart:cart.inCart};
            }
            newCarts = [...newCarts, cart];
          }
          user.carts = newCarts;
          //console.log(user.carts)
        }
        if ( user.pseudo === this.userAuthenticated.value.pseudo)
        {
          this.setUserAuthenticated(user);
        }
      };
      
      console.log(" fin >>< " , users);
      console.log()
      this.setUsers(users);
  //this.setLocalStorageUsers(users);
  //console.log(" fin >>< " , users);
  }


  // ********** Authentification **********

  public getUsers() {
    return this.users.asObservable();
  }

  public setUsers(users) {
    this.setLocalStorageUsers(users);
    this.users.next(users);
  }

  public deteleUser(user) {
    this.setUsers(this.users.value.filter( u => u.pseudo !== user.pseudo));
  }

  public validRoleUser(user, newRole) {
    user.role = newRole['roleControl'];
    console.log(user, this.users);

    this.setUsers(this.users.value);
  }

  public login(pseudo, mdp) {
    for (const user of this.users.value) {
      if (user.pseudo === pseudo && user.mdp === mdp) {

        // on recupère dans le local storage les utilisateurs :
        const users = JSON.parse(localStorage.getItem('users'));
        const userAuth = this.users.value.filter(user => user.pseudo === pseudo)
        if (userAuth) {
          userAuth.map(user => {
            this.setUserAuthenticated(user);
            this.setCarts(user.carts);
          })
        }
        else {
          // si c'est un nouveau inscrit, on l'ajoute à la liste dans le locatStorage : 
          const setUser = { pseudo: user.pseudo, role: user.role, mdp: user.mdp, cart: this.userCart, carts: this.userCarts };
          let userVal = this.users.value;
          userVal = [...this.users.value, setUser];
          this.setUsers(userVal);

          const stateStringify = JSON.stringify(this.users.value)
          localStorage.setItem('users', stateStringify);
          this.setUserAuthenticated(setUser);
          
        }
      }
    }
  }

  public setUserAuthenticated(res) {
    this.userAuthenticated.next(res);
  }

  public getUserAuthenticated() {
    return this.userAuthenticated.asObservable();
  }

  public inscription(login, mdp) {
    let res = true;
    for (const user of this.users.value) {
      if (user.pseudo === login) {
        res = false;
      }
    }
    if (res) {
      let usersVal = this.users.value;
      usersVal = [...this.users.value, { pseudo: login, mdp, role: 'USER', cart: null, carts: null }];
      // this.users = [...this.users, { pseudo: login, mdp: mdp, role: "USER", cart: null, carts: null }];
      this.setUsers(usersVal);
      const stateStringify = JSON.stringify(this.users.value);
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
    console.log('Dans SetCats', resultat);
    for (const user of this.users.value) {
      if (user.pseudo === this.userAuthenticated['_value']['pseudo']) {
        user.carts = resultat;
      }
    }
    const stateStringify = JSON.stringify(this.users.value);
    localStorage.setItem('users', stateStringify);
    console.log(this.users);

    this.carts.next(resultat);
  }

  public getCarts() {
    console.log(' Dans  getCarts : ' , this.carts);
    return this.carts.asObservable();
  }

  // ********** API Spring boot **********

  // Films
  public getAllMovies() {
    const url = ''.concat(this.urlSpb, 'movies');
    return this.httpClient.get(url);
  }

  public getAllMoviesFull() {
    const url = ''.concat(this.urlSpb, 'films');
    return this.httpClient.get(url);
  }

  public deleteFilm(film) {
    const url = ''.concat(this.urlSpb, 'movies/'+film.id);
    // On va aussi supprimer le films dans le local storage : 
    this.deleteFilmlocalStorage(film);

    return this.httpClient.delete(url);
  }

  public editFilm(film) {
    const url = ''.concat(this.urlSpb, 'movies/'+film.id);
    this.editFilmlocalStorage(film);

    return this.httpClient.put(url, film);
  }

  public addFilm(film) {
    const url = ''.concat(this.urlSpb, 'movies');
    console.log(url , film);
    //this.editFilmlocalStorage(film);

    return this.httpClient.post(url, film);
  }

  // Director 
  public getAllDirectors() {
    const url = ''.concat(this.urlSpb, 'directors');
    return this.httpClient.get(url);
  }

  public getAllDirectorsFull() {
    const url = ''.concat(this.urlSpb, 'directeurs');
    return this.httpClient.get(url);
  }


  // Actor
  public getAllActeurs() {
    const url = ''.concat(this.urlSpb, 'actors');
    return this.httpClient.get(url);
  }

  public getActeurs(acteur) {
    const url = ''.concat(this.urlSpb, 'acteurWithFilms/', acteur.id);
    return this.httpClient.get(url);
  }


}
