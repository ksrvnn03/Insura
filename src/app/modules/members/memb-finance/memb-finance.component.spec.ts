import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembFinanceComponent } from './memb-finance.component';

describe('MembFinanceComponent', () => {
  let component: MembFinanceComponent;
  let fixture: ComponentFixture<MembFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembFinanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
