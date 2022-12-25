import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembNetworksComponent } from './memb-networks.component';

describe('MembNetworksComponent', () => {
  let component: MembNetworksComponent;
  let fixture: ComponentFixture<MembNetworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembNetworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
