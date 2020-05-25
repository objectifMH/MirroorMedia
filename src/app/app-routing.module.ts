import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormValidationComponent } from './Inscription/form-validation.component';
import { ListeTendanceSlideComponent } from './liste-tendance-slide/liste-tendance-slide.component';
import { ListeRechercheFilmComponent } from './liste-recherche-film/liste-recherche-film.component';
import { PeopleComponent } from './people/people.component';
import { FilmComponent } from './film/film.component';

const routes: Routes = [

  /* {path: '/', component: ListeTendanceSlideComponent}, */
  {path: 'home', component: ListeTendanceSlideComponent},
  {path: 'inscription', component: FormValidationComponent},
  {path: 'recherche', component: ListeRechercheFilmComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'people/:id', component: PeopleComponent},
  {path: 'film/:id/:type', component: FilmComponent},
  { path: '**', redirectTo: '/home' },

  /* {path: '**', redirectTo: '/' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
