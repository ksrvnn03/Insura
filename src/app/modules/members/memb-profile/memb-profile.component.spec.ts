import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembProfileComponent } from './memb-profile.component';

describe('MembProfileComponent', () => {
  let component: MembProfileComponent;
  let fixture: ComponentFixture<MembProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
