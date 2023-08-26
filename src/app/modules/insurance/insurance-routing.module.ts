import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/app/auth/authguard.guard';

import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { InsuranceListingComponent } from './insurance-listing/insurance-listing.component';

const routes: Routes = [
  { 
    path: "", 
    component: LayoutComponent,
    children: [
      { path: "", component: InsuranceListingComponent, pathMatch: 'full'},
    ],
    canActivate: [AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
