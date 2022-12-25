import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiplierPipe } from 'src/app/pipes/filter';

import { MembersRoutingModule } from './members-routing.module';
import { MembNetworksComponent } from './memb-networks/memb-networks.component';
import { MembFinanceComponent } from './memb-finance/memb-finance.component';
import { MembDocumentsComponent } from './memb-documents/memb-documents.component';
import { MembProfileComponent } from './memb-profile/memb-profile.component';
import { MembAddComponent } from './memb-add/memb-add.component';
import { MembEditComponent } from './memb-edit/memb-edit.component';
import { MembSidebarComponent } from './memb-sidebar/memb-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MembListingComponent } from './memb-listing/memb-listing.component';
import { NgxPaginationModule } from "ngx-pagination";
 
@NgModule({
  declarations: [
    MembNetworksComponent,
    MembFinanceComponent,
    MembDocumentsComponent,
    MembProfileComponent,
    MembAddComponent,
    MembEditComponent,
    MembSidebarComponent,
    MembListingComponent,
    MultiplierPipe,
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule,
    CollapseModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    }),
    NgxPaginationModule,
    ModalModule.forRoot()
  ],
  providers: [
    DatePipe,
  ]
})
export class MembersModule { }
