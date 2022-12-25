import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocuListComponent } from './docu-list.component';

describe('DocuListComponent', () => {
  let component: DocuListComponent;
  let fixture: ComponentFixture<DocuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocuListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
