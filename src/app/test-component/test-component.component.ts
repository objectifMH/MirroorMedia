import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Film } from 'src/film';
import { InOutService } from '../in-out.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  @Input()
  film: Film;

  constructor(private inoutService: InOutService) { }

  ngOnInit() {
  }

  closeAffiche() {
    this.inoutService.setAfficheThisFilm(null);
  }

}
