import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembSidebarComponent } from './memb-sidebar.component';

describe('MembSidebarComponent', () => {
  let component: MembSidebarComponent;
  let fixture: ComponentFixture<MembSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
