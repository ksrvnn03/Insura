import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembAddComponent } from './memb-add.component';

describe('MembAddComponent', () => {
  let component: MembAddComponent;
  let fixture: ComponentFixture<MembAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
