import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgAddComponent } from './prog-add.component';

describe('ProgAddComponent', () => {
  let component: ProgAddComponent;
  let fixture: ComponentFixture<ProgAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
