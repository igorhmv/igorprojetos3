import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

export const routes: Routes = [
  { path: "", component: HomeComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
  ],
  exports: [RouterModule,
      MatInputModule,
      MatTableModule],

  providers: [ 
    DatePipe,
   {provide: LOCALE_ID, useValue: 'pt-BR' },
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
