import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTempComponent } from './email-temp.component';

describe('EmailTempComponent', () => {
  let component: EmailTempComponent;
  let fixture: ComponentFixture<EmailTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
