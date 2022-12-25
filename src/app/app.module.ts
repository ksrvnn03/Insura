import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
