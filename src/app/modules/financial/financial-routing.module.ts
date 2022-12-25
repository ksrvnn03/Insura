import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialListComponent } from './financial-list/financial-list.component';
import { AuthguardGuard } from 'src/app/auth/authguard.guard';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { EarningComponent } from './earning/earning.component';
import { PayoutsComponent } from './payouts/payouts.component';
import { CollectionsComponent } from './collections/collections.component';


const routes: Routes = [
  { 
    path: "", 
    component: LayoutComponent,
    children: [
      { path: "", component: FinancialListComponent, pathMatch: 'full'},
      { path: "earning", component: EarningComponent, pathMatch: 'full'},
      { path: "payouts", component: PayoutsComponent, pathMatch: 'full'},
      { path: "collections", component: CollectionsComponent, pathMatch: 'full'},
    ],
    canActivate: [AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
