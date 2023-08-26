import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';


import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceListingComponent } from './insurance-listing/insurance-listing.component';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';


@NgModule({
  declarations: [
    InsuranceListingComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    /* NgxDatatableModule, */
    InsuranceRoutingModule
  ],
  exports:[
    DataTablesModule
  ]
})
export class InsuranceModule { }
