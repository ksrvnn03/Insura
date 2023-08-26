import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityManageComponent } from './security-manage.component';

describe('SecurityManageComponent', () => {
  let component: SecurityManageComponent;
  let fixture: ComponentFixture<SecurityManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
