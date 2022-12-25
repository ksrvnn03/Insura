import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { MembDocumentsComponent } from './memb-documents/memb-documents.component';
import { MembFinanceComponent } from './memb-finance/memb-finance.component';
import { MembNetworksComponent } from './memb-networks/memb-networks.component';
import { MembProfileComponent } from './memb-profile/memb-profile.component';
import { AuthguardGuard } from 'src/app/auth/authguard.guard';
import { MembAddComponent } from './memb-add/memb-add.component';
import { MembEditComponent } from './memb-edit/memb-edit.component';
import { MembListingComponent } from './memb-listing/memb-listing.component';


const routes: Routes = [
  { 
    path: "", 
    component: LayoutComponent,
    children: [
      { path: "", component: MembListingComponent, pathMatch: 'full'},
      { path: "members/add", component: MembAddComponent, pathMatch: 'full'},
      { path: "members/networks/:id", component: MembNetworksComponent },
      { path: "members/finance/:id", component: MembFinanceComponent},
      { path: "members/documents/:id", component: MembDocumentsComponent  },
      { path: "members/:id", component: MembProfileComponent, pathMatch: 'full'},
      { path: "members/edit/:id", component: MembEditComponent, pathMatch: 'full'},
   
    ],
    canActivate: [AuthguardGuard]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
