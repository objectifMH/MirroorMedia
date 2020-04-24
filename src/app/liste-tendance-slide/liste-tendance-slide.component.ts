import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InOutService } from '../in-out.service';

@Component({
  selector: 'app-liste-tendance-slide',
  templateUrl: './liste-tendance-slide.component.html',
  styleUrls: ['./liste-tendance-slide.component.scss']
})
export class ListeTendanceSlideComponent implements OnInit {

  constructor(private inoutService: InOutService) { }

  @Output()
  afficheFilm = new EventEmitter();

  titre1 = 'Tendance Actuelle';
  titre2 = 'Nouveautés';
  titre3 = 'Films';
  err;
  ngOnInit() {
  }

  detailFilm() {
    console.log('Dans la liste : j ai bien cliqué sur la liste ');
    // this.afficheFilm.emit();
    this.inoutService.setAfficheFilm();
  }
}
