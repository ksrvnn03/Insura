import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembListingComponent } from './memb-listing.component';

describe('MembListingComponent', () => {
  let component: MembListingComponent;
  let fixture: ComponentFixture<MembListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
