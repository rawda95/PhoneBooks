import { Phonebook } from './../phonebook';
import { Component, OnInit } from '@angular/core';
import { PhoneBooksService } from '../phone-books.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-phone-books',
  templateUrl: './phone-books.component.html',
  styleUrls: ['./phone-books.component.css']
})
export class PhoneBooksComponent implements OnInit {

  phonebooks;
  selected;
  newphonebook = new Phonebook();
  searchText;
  filterList;

  constructor(private phoneBooksService: PhoneBooksService) { }

  ngOnInit() {
   this.reloadData();
  }


  reloadData()
  {
    this.phoneBooksService.getPhoneBooksList().subscribe((data) => {
      this.phonebooks = data;
      this.filterList = data;


    });
  }
  deletePhoneBook(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this phone book!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
    this.phoneBooksService.deletePhoneBook(id).subscribe((data)=>{
          console.log(data);
          this.phonebooks = this.phonebooks.filter(phonebook => phonebook.id !== id);
          this.Search() ;
          Swal.fire(
            'Deleted!',
            'Your phone book has been deleted.',
            'success'
          )
        });
     
 
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      
      }
    })
  
    // this.employeeService.deleteEmployee(id)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       this.reloadData();
    //     },
    //     error => console.log(error));
  }

  EditPhoneBook(row)
  {
    this.selected = row ;
  }
 
  SubmitEditPhoneBook(phonebook)
  {
    Swal.fire({
      title: 'Are you sure you whant to update this phone book ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, dismiss change'
    }).then((result) => {
      if (result.value) {
          this.selected = -1 ;
          console.log(phonebook);
          this.phoneBooksService.updatePhoneBook(phonebook.id, phonebook).subscribe((data) => {
            console.log(data);
          });
          Swal.fire(
            'Updated!',
            'Your phone book has been Updated.',
            'success');
          this.Search() ;

      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  AddNewPhoneBook() 
  {

    Swal.fire({
      title: 'Are you sure you whant to submit this phone book ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, dismiss change'
    }).then((result) => {
      if (result.value) {
          this.phoneBooksService.createPhoneBooks(this.newphonebook).subscribe((data) => {
            console.log(data);
            this.phonebooks.push(data);
            this.Search() ;

          });
          Swal.fire(
            'Added!',
            'Your phone book has been added.',
            'success');
            this.newphonebook.name= " ";
            this.newphonebook.phoneNumber= " ";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.newphonebook.name= " ";
        this.newphonebook.phoneNumber= " ";

      }
    });
  }

  Search()
  {
    if(this.searchText || this.searchText===""){
    this.filterList  = this.phonebooks.filter(phonebook => phonebook.name.toLowerCase().includes (this.searchText.toLowerCase()));
    console.log(this.searchText);
    console.log(this.filterList);
    }
    else{
      this.filterList =this.phonebooks; 
    
    }
  }
}
