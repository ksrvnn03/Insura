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
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {
  result: any;
  response='';
  loader: boolean=false;
 
  constructor(
      private fb: FormBuilder,
      private router: Router,
      private http:HttpClient,
      private authservice:AuthService,
      private user:UserService,
      private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    let userLogged=this.user.getLoggedUser();
    if(userLogged){
        this.router.navigate(['/dashboard']); 
    }  
  }
}
