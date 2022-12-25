import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiplierPipe2 } from 'src/app/pipes/filter2';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';


import { DocumentRoutingModule } from './document-routing.module';
import { DocuListComponent } from './docu-list/docu-list.component';
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    MultiplierPipe2,
    DocuListComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    BsDropdownModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    }),
    NgxPaginationModule,
    ModalModule.forRoot()
  ]
})
export class DocumentModule { }
