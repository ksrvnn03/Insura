import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferalRegisterComponent } from './refferal-register.component';

describe('RefferalRegisterComponent', () => {
  let component: RefferalRegisterComponent;
  let fixture: ComponentFixture<RefferalRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferalRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefferalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
