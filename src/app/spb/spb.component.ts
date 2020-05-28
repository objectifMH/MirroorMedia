import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpbService } from '../services/spb.service';

@Component({
  selector: 'app-spb',
  templateUrl: './spb.component.html',
  styleUrls: ['./spb.component.scss']
})
export class SpbComponent implements OnInit {


  films: any = [];
  results: any =[];

  constructor(private route: ActivatedRoute, private router: Router, private spb: SpbService) {
    
  }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.spb.getAllMovies().subscribe(
      result => {
        this.films = result['_embedded']['movies'];
        this.results= result['_embedded']['movies'];
        console.log("films spb boot :" , this.films);
      }
      ,
      error => console.log('Une erreur est survenue, On arrive pas à charger les films de la spb bd', error)
    );
  }

}
