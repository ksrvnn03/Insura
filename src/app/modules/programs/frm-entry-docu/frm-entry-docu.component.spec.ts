import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmEntryDocuComponent } from './frm-entry-docu.component';

describe('FrmEntryDocuComponent', () => {
  let component: FrmEntryDocuComponent;
  let fixture: ComponentFixture<FrmEntryDocuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrmEntryDocuComponent]
    });
    fixture = TestBed.createComponent(FrmEntryDocuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
