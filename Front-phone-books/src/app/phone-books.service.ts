import { Phonebook } from './phonebook';
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

  getPhoneBooksList() {
    return this.httpClient.get<Phonebook[]>(`${this.baseUrl}`)//.subscribe(this.extractData);
  }


  private extractData(res) {
    let body = res.json();
          return body;
      }
}


