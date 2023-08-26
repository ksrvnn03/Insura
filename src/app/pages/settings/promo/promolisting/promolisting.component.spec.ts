import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromolistingComponent } from './promolisting.component';

describe('PromolistingComponent', () => {
  let component: PromolistingComponent;
  let fixture: ComponentFixture<PromolistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromolistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromolistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
