import { Component, OnInit } from '@angular/core';
import { SpbService } from '../services/spb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userAuth;
  films = [];

  constructor(private spb: SpbService, private router: Router) { }

  ngOnInit(): void {
    this.recupereAuth();
  }


  recupereAuth() {
    //this.spb.getIsAuthenticated().subscribe(
      this.spb.getUserAuthenticated().subscribe(
      rep => {
        this.userAuth = rep;
        if ( this.userAuth.carts )
        this.films = rep.carts.filter(film => film.inCart === true);

        
        console.log("recupere auth dans spb" , this.userAuth.pseudo);
        if (this.userAuth.pseudo === null) {
         
          // Si l'utilisateur n'est pas connecté on est renvoyé vers la home : 
          this.router.navigate(['/home']);
        }
      },
      error => console.log("erreur pour récuperer si on est authentifié")
    );
  }

}
