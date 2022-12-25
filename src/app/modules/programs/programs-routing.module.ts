import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/app/auth/authguard.guard';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ProgAddComponent } from './prog-add/prog-add.component';
import { ProgDetailComponent } from './prog-detail/prog-detail.component';
import { ProgEditComponent } from './prog-edit/prog-edit.component';
import { ProgListComponent } from './prog-list/prog-list.component';

const routes: Routes = [
  { 
    path: "", 
    component: LayoutComponent,
    children: [
      { path: "", component: ProgListComponent, pathMatch: 'full'},
      { path: "program/add", component: ProgAddComponent, pathMatch: 'full'},
      { path: "program/:id", component: ProgDetailComponent, pathMatch: 'full'},
      { path: "program/edit/:id", component: ProgEditComponent, pathMatch: 'full'},
   
    ],
    canActivate: [AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
