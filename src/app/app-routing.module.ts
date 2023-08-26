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
import { SettingsComponent } from './pages/settings/settings.component';
import { UserProfileComponent } from './pages/settings/users/user-profile/user-profile.component';
import { SecurityManageComponent } from './pages/settings/users/security-manage/security-manage.component';
import { AuditComponent } from './pages/settings/audit/audit.component';
import { ColorManageComponent } from './pages/settings/colorManage/colormanage.component';
import { BannerComponent } from './pages/settings/banner/banner.component';
import { EmailTempListingComponent } from './pages/settings/email-temp-listing/email-temp-listing.component';
import { EmailTempComponent } from './pages/settings/email-temp/email-temp.component';
import { RoleManageComponent } from './pages/settings/users/role-manage/role-manage.component';
import { UserCrudComponent } from './pages/settings/users/user-crud/user-crud.component';
import { PromolistingComponent } from './pages/settings/promo/promolisting/promolisting.component';
import { PromoComponent } from './pages/settings/promo/promo.component';
import { TestComponent } from './test/test.component';

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
    path: 'insurance', 
    canActivate: [AuthService],
    loadChildren: () => import('./modules/insurance/insurance.module').then(n => n.InsuranceModule) 
  },
  { 
    path: 'user',
    canActivate: [AuthService], 
    loadChildren: () => import('./modules/user/user.module').then(u => u.UserModule) 
  },
  { 
    path: 'settings',
    canActivate: [AuthService], 
    component: SettingsComponent,
    pathMatch: 'full'
  },
  { 
    path: 'profile',
    canActivate: [AuthService], 
    component: UserProfileComponent,
    pathMatch: 'full'
  },
  { 
    path: 'security',
    canActivate: [AuthService], 
    component: SecurityManageComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/user/role',
    canActivate: [AuthService], 
    component: RoleManageComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/user/add',
    canActivate: [AuthService], 
    component: UserCrudComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/user/edit/:id',
    canActivate: [AuthService], 
    component: UserCrudComponent,
    pathMatch: 'full'
  },

  { 
    path: 'settings/promo',
    canActivate: [AuthService], 
    component: PromolistingComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/promo/add',
    canActivate: [AuthService], 
    component: PromoComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/promo/edit/:id',
    canActivate: [AuthService], 
    component: PromoComponent,
    pathMatch: 'full'
  },

  { 
    path: 'audit',
    canActivate: [AuthService], 
    component: AuditComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/color',
    canActivate: [AuthService], 
    component: ColorManageComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/banner',
    canActivate: [AuthService], 
    component: BannerComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/email',
    canActivate: [AuthService], 
    component: EmailTempListingComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/email/add',
    canActivate: [AuthService], 
    component: EmailTempComponent,
    pathMatch: 'full'
  },
  { 
    path: 'settings/email/edit/:id',
    canActivate: [AuthService], 
    component: EmailTempComponent,
    pathMatch: 'full'
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
  },
  {
    path: 'test',
    canActivate: [AuthService],
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
