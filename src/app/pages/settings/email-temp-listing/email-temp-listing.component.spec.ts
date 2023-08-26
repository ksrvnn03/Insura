import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTempListingComponent } from './email-temp-listing.component';

describe('EmailTempListingComponent', () => {
  let component: EmailTempListingComponent;
  let fixture: ComponentFixture<EmailTempListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailTempListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailTempListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
