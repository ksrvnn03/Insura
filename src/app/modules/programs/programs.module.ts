import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgAddComponent } from './prog-add/prog-add.component';
import { ProgListComponent } from './prog-list/prog-list.component';
import { ProgDetailComponent } from './prog-detail/prog-detail.component';
import { ProgEditComponent } from './prog-edit/prog-edit.component';
import { CreateformComponent } from './enrollment/createform/createform.component';
import { ListformComponent } from './enrollment/listform/listform.component';
import { FormlistComponent } from './enrollment/formlist/formlist.component';
import { EditformComponent } from './enrollment/editform/editform.component';
import { ViewentriesComponent } from './viewentries/viewentries.component';


@NgModule({
  declarations: [
    ProgAddComponent,
    ProgListComponent,
    ProgDetailComponent,
    ProgEditComponent,
    CreateformComponent,
    ListformComponent,
    FormlistComponent,
    EditformComponent,
    ViewentriesComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    }),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    ModalModule.forRoot()
  ]
})
export class ProgramsModule { }
