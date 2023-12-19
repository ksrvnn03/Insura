import { Component, OnInit, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  result: any;
  response='';
  submitted: boolean=false;
  loader: boolean=false;
  showPassword:boolean = false;


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

  toggleEye() {
    this.showPassword = !this.showPassword;
  }

  loginForm = this.fb.group(
    {
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(1)])
      ]
    }
  );
  
  get f(){
    return this.loginForm.controls;
 } 

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    this.submitted=true;
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.loader=true;
     this.http.post(environment.apiUrl+'admin/login',{email:data.email,password:data.password}).subscribe(
      (res:any)=>{
        this.loader=false;
        if(res.status=='success'){
          this.response='';
          localStorage.setItem('token',res.data.token);
          this.toastr.success('', 'Login...',{
            positionClass: 'toast-bottom-right' 
         });
          setTimeout(()=>{
            this.router.navigate(['/dashboard']); 
          },200);

        }else{
          this.toastr.error('', 'Invalid Username / Password',{
            timeOut: 2500,
            positionClass: 'toast-bottom-right' 
         });
          this.response=res.message;
        }
      }
     );
      
    }

    
  }

}
