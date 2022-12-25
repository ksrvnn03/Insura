import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  loader: boolean=false;
  submitted: boolean=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    private toastr: ToastrService,
    private user:UserService,
  ) { }

  ngOnInit(): void {
    let userLogged=this.user.getLoggedUser();
    if(userLogged){
        this.router.navigate(['/dashboard']); 
    }  
  }

 forgotForm = this.fb.group(
    {
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ]
    }
  );
  
  get f(){
    return this.forgotForm.controls;
 } 

  onSubmit(){
    this.submitted=true;
    if (this.forgotForm.valid) {
      const data = this.forgotForm.value;
      this.loader=true;

      this.http.post(environment.apiUrl+'admin/forgot-password',{email:data.email}).subscribe(
        (res:any)=>{
          this.loader=false;
          if(res){
            this.toastr.success('', 'Check your email adderss ...',{
              timeOut: 4000,
              positionClass: 'toast-bottom-right' 
           });
          }else{
            this.loader=false;
            this.toastr.error('', 'Invalid Email',{
              timeOut: 2500,
              positionClass: 'toast-bottom-right' 
           });
          }
        },(msg:any)=>{
          this.loader=false;
            this.toastr.error('', 'Invalid Email',{
              timeOut: 2500,
              positionClass: 'toast-bottom-right' 
           });
        }
       );


    }
  }
}
