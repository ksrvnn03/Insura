import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiplierPipe } from 'src/app/pipes/filter';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceListingComponent } from './insurance-listing/insurance-listing.component';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InsuranceListingComponent
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    DataTablesModule,
    CommonModule,
    InsuranceRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    }),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports:[
    DataTablesModule
  ]
})
export class InsuranceModule { }
