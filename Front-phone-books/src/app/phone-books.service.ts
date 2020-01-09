import { Phonebook } from './phonebook';
import { FilterModel } from './filter-model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneBooksService {

  baseUrl = 'http://localhost:3000/phonebooks';
  constructor(private httpClient: HttpClient) { }

  createPhoneBooks(phonebook: Phonebook ) {
    phonebook.phoneNumber = phonebook.phoneNumber.toString();
    return this.httpClient.post<Phonebook>(`${this.baseUrl}`, phonebook);
  }


  updatePhoneBook(id: number, value: any): Observable<Object> {
    value.phoneNumber = value.phoneNumber.toString();

    return this.httpClient.put(`${this.baseUrl}/${id}`, value);
  }

  deletePhoneBook(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getPhoneBooksList(filter: FilterModel) {

    const params = {
      'filter[offset]': `${filter.offset}`,
      'filter[limit]': `${filter.limit}`,
      'filter[skip]': `${filter.skip}`,

    };
    if (filter.name !== undefined) {
      params[`filter[where][name][like]`] = filter.name;
    }
    return this.httpClient.get<Phonebook[]>(`${this.baseUrl}`, {
      params
    });
  }


  getPhoneListCount() {
    return this.httpClient.get<any>(`${this.baseUrl}/count`);
  }



}
