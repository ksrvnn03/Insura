import { Component, OnInit } from '@angular/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showPassword:boolean = false;
  reshowPassword:boolean = false;
  result: any;
  response='';
  loader: boolean=false;
  submitted:boolean=false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private http:HttpClient,
      private authservice:AuthService,
      private user:UserService,
      private toastr: ToastrService) { 
  }

  regForm = this.fb.group(
    {
      uname:["",[Validators.required]],
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
        [Validators.required,Validators.minLength(6)]
      ],
      cpassword: [
        "",
        [Validators.required,Validators.minLength(6)]
      ],
      phone  :[
        "",
        [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$")
       ]
      ],
      haveid:[""],
      referrer_id :[""]
    }
  );


  /* checkPasswords(regForm: FormGroup) {
    var form = this.regForm.value;
    const pass = form.password;
    const confirmPass = form.cpassword;
    return pass == confirmPass ? null : { notSame: true };
  } */

  ngOnInit(): void {
    let userLogged=this.user.getLoggedUser();
    if(userLogged){
        this.router.navigate(['/dashboard']); 
    }  
  }
  
  toggleEye() {
    this.showPassword = !this.showPassword;
  }
  toggleEye2() {
    this.reshowPassword = !this.reshowPassword;
  }

  get f(){
    return this.regForm.controls;
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
    var form=this.regForm.value;
    let pwd=form.password;
    let cpwd=form.cpassword;
    let yesref=form.haveid;
    let refid=form.referrer_id;
    if(pwd!='' && cpwd!=''){
      if(pwd!=cpwd){
        this.regForm.controls['cpassword'].setErrors({'customError': true});
      }
      else{
        this.regForm.controls['cpassword'].setErrors(null);
      }
    }
    console.log("yesref"+yesref);
    if(yesref){
      if(refid==''){
        this.regForm.controls['referrer_id'].setErrors({'required': true});
      }else{
        this.regForm.controls['referrer_id'].setErrors(null);
      }
    } else{
      this.regForm.controls['referrer_id'].setErrors(null);
    }
    if (this.regForm.valid) {
      
      this.http.post(environment.apiUrl+'member/register',{
        referrer_id:form.referrer_id,
        email:form.email,
        password :form.password,
        password_confirmation :form.cpassword,
        name : form.uname,
        phone:form.phone
      }).subscribe(
        (res:any)=>{
          if(res.status=="success"){
          /*   this.regForm.reset(); */
         
          this.toastr.success('', 'Register Successfully...',{
            positionClass: 'toast-bottom-right',
          })
          .onHidden 
          .subscribe(() => 
            {
              this.router.navigate(['/']);
            }
          );

            
          }
        },
        (err:any)=>{
          this.toastr.error('', err.error.message,{
            timeOut: 2500,
            positionClass: 'toast-bottom-right' 
         });
        }
      )
      
    }
  }

}
