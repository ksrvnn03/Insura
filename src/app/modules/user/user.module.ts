import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UserRoutingModule } from './user-routing.module';
import { RolesComponent } from './roles/roles.component';
import { UserCrudComponent } from './user-crud/user-crud.component';

@NgModule({
  declarations: [
  
    RolesComponent,
       UserCrudComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
