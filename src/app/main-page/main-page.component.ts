import { Component, OnInit } from '@angular/core';
import { InOutService } from '../services/in-out.service';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { TmdbService } from '../services/tmdb.service';
import { SpbService } from '../services/spb.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;
  faUserCircle = faUserCircle;

  isFilmAffiche;
  isSelectedIcon = { home: false, favoris: false, inscription: false, login: false, spb: false, logout: false, person: false };
  isShow = true;
  cart = { quantity: 0, total: 0 };
  userAuth;

  constructor(private inoutService: InOutService, private route: ActivatedRoute, private router: Router,
    private tmdb: TmdbService, private spb: SpbService) {
  }


  ngOnInit() {
    // On fixe la bonne icone au niveau de la navbar en fonction du chemin 
    const chemin = window.location.pathname.substr(1);
    this.isSelectedIcon[chemin] = true;

    this.getIsAuthenticated();
    setTimeout(() => this.recupereSpb(), 2000);  
  }

  clickIcon(li) {
    const attr = li.getAttribute('data-icon');
    // tslint:disable-next-line:forin
    for (const icon in this.isSelectedIcon) {
      this.isSelectedIcon[icon] = false;
      if (icon === attr) {
        this.isSelectedIcon[icon] = true;
      }
    }
  }

  clickSearch(element: any) {
    if (element.value) {
      this.router.navigate(['/recherche/' + element.value + '/1']);
    }
    element.value = '';
  }

  showMenu() {
    this.isShow = !this.isShow;
    console.log(this.isShow);
  }

  // On récupère la cart gràce au service
  recupereSpb() {
    //this.inoutService.getCart().subscribe(
    this.spb.getCart().subscribe(
      data => {
        this.cart = data;
      },
      err => {
        console.log('erreur observable dans main.coments', err);
      }
    );
  }

  getIsAuthenticated() {
    this.spb.getUserAuthenticated().subscribe(
      data => {
        this.userAuth = data;
      }
      ,
      error => console.log("Erreur, récuperation getUserAuthenticated")
    );

  }

  logOut() {
    console.log("vous allez etre deconnecté");
    //this.spb.setIsAuthenticated(false);
    this.spb.setCart({ quantity: 0, total: 0 });

    this.spb.setUserAuthenticated({ pseudo: null, role: null, mdp: null, cart: null, carts: null });
    this.router.navigate(['/login']);
  }

}
