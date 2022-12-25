import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarnavComponent } from './sidebarnav.component';

describe('SidebarnavComponent', () => {
  let component: SidebarnavComponent;
  let fixture: ComponentFixture<SidebarnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarnavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
