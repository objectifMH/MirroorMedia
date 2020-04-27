import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponentComponent } from './affiche-film-component/TestComponentComponent';
import { MatMenuModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { FormValidationComponent } from './Inscription/form-validation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TendanceSlideComponent } from './tendance-slide/tendance-slide.component';
import { ListeTendanceSlideComponent } from './liste-tendance-slide/liste-tendance-slide.component';
import { ItemSlideComponent } from './item-slide/item-slide.component';
import { ListeRechercheFilmComponent } from './liste-recherche-film/liste-recherche-film.component';
import { MainPageComponent } from './main-page/main-page.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    FormValidationComponent,
    TendanceSlideComponent,
    ListeTendanceSlideComponent,
    ItemSlideComponent,
    ListeRechercheFilmComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
