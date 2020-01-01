import { TestBed } from '@angular/core/testing';

import { PhoneBooksService } from './phone-books.service';

describe('PhoneBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneBooksService = TestBed.get(PhoneBooksService);
    expect(service).toBeTruthy();
  });
});
