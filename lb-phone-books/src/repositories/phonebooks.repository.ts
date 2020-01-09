import {DefaultCrudRepository} from '@loopback/repository';
import {Phonebooks, PhonebooksRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PhonebooksRepository extends DefaultCrudRepository<
  Phonebooks,
  typeof Phonebooks.prototype.id,
  PhonebooksRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Phonebooks, dataSource);
  }

 async CheckForUnique(PhoneNumber:string)
  {
   

    var phonebooks = await this.find({where: {phoneNumber:PhoneNumber}}); 
    if(phonebooks.length !=0)
    {
      return false ;
    }else{
      return true ; 
    }
   

  }
}
