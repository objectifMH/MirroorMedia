import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { ListeTendanceSlideComponent } from './liste-tendance-slide/liste-tendance-slide.component';

const routes: Routes = [
  {path: 'home', component: ListeTendanceSlideComponent},
  {path: 'inscription', component: FormValidationComponent},
  /* {path: '**', redirectTo: '/' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
