import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';

import { FinancialRoutingModule } from './financial-routing.module';
import { FinancialListComponent } from './financial-list/financial-list.component';
import { EarningComponent } from './earning/earning.component';
import { PayoutsComponent } from './payouts/payouts.component';
import { CollectionsComponent } from './collections/collections.component';


@NgModule({
  declarations: [
    FinancialListComponent,
    EarningComponent,
    PayoutsComponent,
    CollectionsComponent
  ],
  imports: [
    CommonModule,
    FinancialRoutingModule,
    BsDropdownModule
  ]
})
export class FinancialModule { }
