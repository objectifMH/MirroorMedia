import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormValidationComponent } from './Inscription/form-validation.component';
import { ListeTendanceSlideComponent } from './liste-tendance-slide/liste-tendance-slide.component';
import { ListeRechercheFilmComponent } from './liste-recherche-film/liste-recherche-film.component';
import { PeopleComponent } from './people/people.component';
import { FilmComponent } from './film/film.component';
import { SpbComponent } from './spb/spb.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ConsoleComponent } from './console/console.component';

const routes: Routes = [

  /* {path: '/', component: ListeTendanceSlideComponent}, */
  {path: 'home', component: ListeTendanceSlideComponent},
  {path: 'inscription', component: FormValidationComponent},
  {path: 'recherche/:query/:page', component: ListeRechercheFilmComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'people/:id', component: PeopleComponent},
  {path: 'film/:id/:type', component: FilmComponent},
  {path: 'spb', component: SpbComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'console', component: ConsoleComponent},

  {path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
