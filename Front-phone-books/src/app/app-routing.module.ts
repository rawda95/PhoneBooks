import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PhoneBooksComponent} from './phone-books/phone-books.component';
const routes: Routes = [
  {path: 'phonebook', component: PhoneBooksComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
