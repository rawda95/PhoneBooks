import { Phonebook } from './../phonebook';
import { Component, OnInit } from '@angular/core';
import { PhoneBooksService } from '../phone-books.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { tick } from '@angular/core/testing';
import { FilterModel } from '../filter-model';


@Component({
  selector: 'app-phone-books',
  templateUrl: './phone-books.component.html',
  styleUrls: ['./phone-books.component.css']
})
export class PhoneBooksComponent implements OnInit {
  totalcount ;
  currentPage ;
  phonebooks;
  selected;
  newphonebook = new Phonebook();
  filterModel = new FilterModel();
  searchText ;
  filterList;

  constructor(private phoneBooksService: PhoneBooksService) { }

  ngOnInit() {
    this.currentPage = 1 ;
   this.reloadData();
   this.GetPhoneListCount();
  }


  reloadData() {

    this. filterModel.limit = 5 ;
    this. filterModel.skip = ((this.currentPage-1) * 5) ;
    this. filterModel.offset = 1 ;
    if (this.searchText !== '') {
    this.filterModel.name = this.searchText;
  } else {
    this.filterModel.name = undefined;
  }


    this.phoneBooksService.getPhoneBooksList(this.filterModel).subscribe((data) => {
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
    this.phoneBooksService.deletePhoneBook(id).subscribe((data) => {

          this.phonebooks = this.phonebooks.filter(phonebook => phonebook.id !== id);
          this.Search() ;
          Swal.fire(
            'Deleted!',
            'Your phone book has been deleted.',
            'success'
          );

        },
        (error) => {
          Swal.fire(
            'error!',
            error.error.error.message,
            'error');
        }
        );


      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });

  }

  EditPhoneBook(row) {
    this.selected = row ;
  }

  SubmitEditPhoneBook(phonebook) {
    const validationResult = this.SubmitValidation(phonebook);
    if (validationResult.Isvalid) {
    Swal.fire({
      title: 'Are you sure you want to update this phone book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, dismiss change'
    }).then((result) => {
      if (result.value) {
          this.selected = -1 ;

          this.phoneBooksService.updatePhoneBook(phonebook.id, phonebook).subscribe((data) => {

              Swal.fire(
                'Updated!',
                'Your phone book has been Updated.',
                'success');
              this.Search() ;

          },
          (error) => {
            Swal.fire(
              'error!',
              error.error.error.message,
              'error');
          }
          );


      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  } else {

    this.reloadData();
    Swal.fire(
      'error!',
      JSON.stringify(validationResult.message),
    'error');
  }
  }

  AddNewPhoneBook() {
    const validationResult = this.SubmitValidation(this.newphonebook);
    if (validationResult.Isvalid) {
    Swal.fire({
      title: 'Are you sure you whant to submit this phone book ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, dismiss change'
    }).then((result) => {
      if (result.value) {
          this.phoneBooksService.createPhoneBooks(this.newphonebook).subscribe((data) => {

            this.phonebooks.push(data);
            this.reloadData();

            Swal.fire(
              'Added!',
              'Your phone book has been added.',
              'success');
            this.newphonebook.name = ' ';
            this.newphonebook.phoneNumber = ' ';


          }, (error) => {
            Swal.fire(
              'error!',
              error.error.error.message,
              'error');
          }
          );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.newphonebook.name = ' ';
        this.newphonebook.phoneNumber = ' ';

      }
    });
  } else {
    this.reloadData();

    Swal.fire(
      'error!',
      JSON.stringify(validationResult.message),
      'error');
  }
  }


  Search() {
    // if (this.searchText || this.searchText === '') {
    // this.filterList  = this.phonebooks.filter(phonebook => phonebook.name.toLowerCase().includes (this.searchText.toLowerCase()));
    // } else {
    //   this.filterList = this.phonebooks;

    // }
    this.currentPage = 1 ;
    this.reloadData();
    this.GetPhoneListCount();

  }



  checkNameLength(name) {
    if (name.length >= 3) {
      return true;
    } else {
      return false;
    }
  }
  checkPhoneNumber(phoneNumber, id) {
    const PoneBookId = id === undefined ? -1 : id;
    const phoneNumberList  = this.phonebooks.filter(phonebook => (phonebook.phoneNumber === phoneNumber && phonebook.id !== PoneBookId));
    if (phoneNumberList.length > 0) {
     return false ;
   } else {
     return true;
   }
  }

  SubmitValidation(phoneNumber) {
    const errorMessage = [];
    let IsValid = true;
    const IsNameValid = this.checkNameLength(phoneNumber.name);
    if (!IsNameValid) {
  IsValid = false;
  errorMessage.push( 'Error in Name , Should be more than 3 char');
}
    const IsPhoneNumberValid = this.checkPhoneNumber(phoneNumber.phoneNumber, phoneNumber.id);
    if (!IsPhoneNumberValid) {
      IsValid = false;
      errorMessage.push( 'Error in PhoneNumber , This phone number is used before');
    }
    if (IsValid) {
      return {Isvalid: true} ;
    } else {
      return {Isvalid: false, message: errorMessage};
    }

  }

  onPageClick(i){
    this.currentPage = i ;
   // console.log(i);
    this.reloadData();
  
  }

  GetPhoneListCount() {

    this.phoneBooksService.getPhoneListCount(this.searchText).subscribe((data) => {

      let pages = Math.floor(data.count / 5);
      var rem = data.count % 5;
      if(rem!==0)
      {
        pages++;
      }

      this.totalcount = Array(pages);
    });

  }

}
