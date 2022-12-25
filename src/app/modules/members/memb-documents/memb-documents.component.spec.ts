import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembDocumentsComponent } from './memb-documents.component';

describe('MembDocumentsComponent', () => {
  let component: MembDocumentsComponent;
  let fixture: ComponentFixture<MembDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
