import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard as AuthService } from "./auth/authguard.guard";
import { MembersComponent } from './pages/members/members.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetpwdComponent } from './pages/resetpwd/resetpwd.component';
import { RefferalRegisterComponent } from './pages/refferal-register/refferal-register.component';
const routes: Routes = [
  { 
    path: 'members',
    canActivate: [AuthService],
    loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule) 
  },
  { 
    path: 'programs', 
    canActivate: [AuthService],
    loadChildren: () => import('./modules/programs/programs.module').then(p => p.ProgramsModule) 
  },
  { 
    path: 'financial', 
    canActivate: [AuthService],
    loadChildren: () => import('./modules/financial/financial.module').then(f => f.FinancialModule) 
  },
  { 
    path: 'documents', 
    canActivate: [AuthService],
    loadChildren: () => import('./modules/document/document.module').then(d => d.DocumentModule) 
  },
  { 
    path: 'networks', 
    canActivate: [AuthService],
    loadChildren: () => import('./modules/networks/networks.module').then(n => n.NetworksModule) 
  },
  { 
    path: 'user',
    canActivate: [AuthService], 
    loadChildren: () => import('./modules/user/user.module').then(u => u.UserModule) 
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/:id',
    component: RefferalRegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotComponent
  },
  {
    path: 'reset-password',
    component: ResetpwdComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthService],
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
