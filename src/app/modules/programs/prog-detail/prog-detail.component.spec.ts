import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgDetailComponent } from './prog-detail.component';

describe('ProgDetailComponent', () => {
  let component: ProgDetailComponent;
  let fixture: ComponentFixture<ProgDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
