import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormValidationComponent } from './Inscription/form-validation.component';
import { ListeTendanceSlideComponent } from './liste-tendance-slide/liste-tendance-slide.component';
import { ListeRechercheFilmComponent } from './liste-recherche-film/liste-recherche-film.component';

const routes: Routes = [
  {path: 'home', component: ListeTendanceSlideComponent},
  {path: 'inscription', component: FormValidationComponent},
  {path: 'recherche', component: ListeRechercheFilmComponent},
  /* {path: '**', redirectTo: '/' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
