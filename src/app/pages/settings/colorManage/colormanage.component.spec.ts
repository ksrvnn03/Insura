import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColormanageComponent } from './colormanage.component';

describe('ColormanageComponent', () => {
  let component: ColormanageComponent;
  let fixture: ComponentFixture<ColormanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColormanageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColormanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
