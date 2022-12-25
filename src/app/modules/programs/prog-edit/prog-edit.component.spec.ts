import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgEditComponent } from './prog-edit.component';

describe('ProgEditComponent', () => {
  let component: ProgEditComponent;
  let fixture: ComponentFixture<ProgEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
