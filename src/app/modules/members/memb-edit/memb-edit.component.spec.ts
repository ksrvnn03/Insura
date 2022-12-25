import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembEditComponent } from './memb-edit.component';

describe('MembEditComponent', () => {
  let component: MembEditComponent;
  let fixture: ComponentFixture<MembEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
