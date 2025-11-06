import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRegistration } from './seller-registration';

describe('SellerRegistration', () => {
  let component: SellerRegistration;
  let fixture: ComponentFixture<SellerRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
