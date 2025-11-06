import { TestBed } from '@angular/core/testing';

import { Seller } from './creation';

describe('Seller', () => {
  let service: Seller;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Seller);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
