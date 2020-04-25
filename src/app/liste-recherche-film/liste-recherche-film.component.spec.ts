import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRechercheFilmComponent } from './liste-recherche-film.component';

describe('ListeRechercheFilmComponent', () => {
  let component: ListeRechercheFilmComponent;
  let fixture: ComponentFixture<ListeRechercheFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeRechercheFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRechercheFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
