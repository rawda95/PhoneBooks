import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
  indexes: {
    uniquePhoneNumber: {
      keys: {
        phoneNumber: 1,
      },
      options: {
        unique: true,
      },
    },
  },
},
})
export class Phonebooks extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    min:3,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true
  }
  })
  phoneNumber: string;

  constructor(data?: Partial<Phonebooks>) {
    super(data);
  }
}

export interface PhonebooksRelations {
  // describe navigational properties here
}

export type PhonebooksWithRelations = Phonebooks & PhonebooksRelations;
