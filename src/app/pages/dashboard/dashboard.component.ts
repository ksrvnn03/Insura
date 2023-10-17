import { Component, OnInit, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gridData:any = {};
  verification:any;
  vtotal:any;
  payouts:any;
  ptotal:any;
  

  constructor(  private http:HttpClient,
    private authservice:AuthService,
    private user:UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(){
    this.http.get(environment.apiUrl+'admin/dashboard').subscribe((res: any)=>{
     
       Object.assign(this.gridData,  {"total_members": res.data.total_members })
       Object.assign(this.gridData,  {"new_signups": res.data.new_signups })
       Object.assign(this.gridData,  {"total_collection": res.data.total_collection })
       Object.assign(this.gridData,  {"total_earnings": res.data.total_earnings })
       Object.assign(this.gridData,  {"total_payouts": res.data.total_payouts })
        
      let verif_Data = res.data.pending_docs.slice(0, 5);
      this.verification= verif_Data;
      this.vtotal=res.data.pending_docs.length;

      let payout_Data = res.data.pending_payouts.slice(0, 5);
      this.ptotal=res.data.pending_payouts.length;
      this.payouts= payout_Data;
    },
    (err: any)=>{
      
    });
  }
}
