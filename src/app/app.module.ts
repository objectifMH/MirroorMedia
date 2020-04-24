import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponentComponent } from './test-component/test-component.component';
import { MatMenuModule, MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TendanceSlideComponent } from './tendance-slide/tendance-slide.component';
import { ListeTendanceSlideComponent } from './liste-tendance-slide/liste-tendance-slide.component';
import { ItemSlideComponent } from './item-slide/item-slide.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    FormValidationComponent,
    TendanceSlideComponent,
    ListeTendanceSlideComponent,
    ItemSlideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
