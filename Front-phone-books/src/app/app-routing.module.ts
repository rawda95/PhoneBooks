import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PhoneBooksComponent} from './phone-books/phone-books.component';
const routes: Routes = [
  {path: '', component: PhoneBooksComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
