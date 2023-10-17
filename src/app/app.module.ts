import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ResetpwdComponent } from './pages/resetpwd/resetpwd.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MembersModule } from './modules/members/members.module';
import { UserModule } from './modules/user/user.module';
import { DocumentModule } from './modules/document/document.module';
import { NetworksModule } from './modules/networks/networks.module';
import { FinancialModule } from './modules/financial/financial.module';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarnavComponent } from './shared/sidebarnav/sidebarnav.component';
import { ProgramsModule } from './modules/programs/programs.module';
import { LayoutComponent } from './shared/layout/layout.component';
import { MembersComponent } from './pages/members/members.component';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RefferalRegisterComponent } from './pages/refferal-register/refferal-register.component';
import { SiteHttp } from './httpHandle';
import { PromoComponent } from './pages/settings/promo/promo.component';
import { PromolistingComponent } from './pages/settings/promo/promolisting/promolisting.component';
import { SecurityManageComponent }  from './pages/settings/users/security-manage/security-manage.component';
import { UserProfileComponent } from './pages/settings/users/user-profile/user-profile.component';
import { ColorManageComponent } from './pages/settings/colorManage/colormanage.component';
import { EmailTempComponent } from './pages/settings/email-temp/email-temp.component';
import { EmailTempListingComponent } from './pages/settings/email-temp-listing/email-temp-listing.component';
import { AuditComponent } from './pages/settings/audit/audit.component';
import { BannerComponent } from './pages/settings/banner/banner.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingSidebarComponent } from './pages/settings/setting-sidebar/setting-sidebar.component';
import { RoleManageComponent } from './pages/settings/users/role-manage/role-manage.component';
import { UserCrudComponent } from './pages/settings/users/user-crud/user-crud.component';
import { TestComponent } from './test/test.component';
import { ReportComponent } from './pages/report/report.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    ResetpwdComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarnavComponent,
    LayoutComponent,
    MembersComponent,
    RefferalRegisterComponent,
    PromoComponent,
    PromolistingComponent,
    UserProfileComponent,
    SecurityManageComponent,
    SettingsComponent,
    BannerComponent,
    AuditComponent,
    EmailTempListingComponent,
    EmailTempComponent,
    ColorManageComponent,
    SettingSidebarComponent,
    RoleManageComponent,
    UserCrudComponent,
    TestComponent,
    ReportComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    MembersModule,
    UserModule,
    ProgramsModule,
    NetworksModule,
    FinancialModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    }),
    AngularEditorModule,
    BsDatepickerModule.forRoot(),
  ],
  providers:    [ 
    { provide: HTTP_INTERCEPTORS, useClass: SiteHttp, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
