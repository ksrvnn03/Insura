import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { MemberService } from 'src/app/services/member.service';
import { DatePipe } from '@angular/common';


interface CustomValidationErrors {
  required?: { error: true; message: string };
  invalidPrefix?: { error: true; message: string };
  invalidFormat?: { error: true; message: string };
  minLength?: { error: true; message: string };
  maxLength?: { error: true; message: string };
}

@Component({
  selector: 'app-memb-add',
  templateUrl: './memb-add.component.html',
  styleUrls: ['./memb-add.component.css']
})
export class MembAddComponent implements OnInit {
  showPassword:boolean = false;
  rshowPassword:boolean = false;
  submitted:boolean = false;
  dobchoosed:any;
  btnloader:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private apiUrl:MemberService) {
      
    }

  membCreation = this.fb.group(
    {
      name:["",Validators.required],
      ic_no:[""],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      phone  :[
        "",
        [this.phoneNumberPrefixValidator]
      ],
      dobchoosed:[""],
      dob:["",[Validators.required]],
      gender:["",[Validators.required]],
      address:["",[Validators.required]],
      city:["",[Validators.required]],
      state:["",[Validators.required]],
      country:["",[Validators.required]],
      zip :["",[Validators.required]],
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      password_confirmation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
    },
    { 
      validators: this.password
    }
  );

 
  
  ngOnInit(): void {
  } 

  phoneNumberPrefixValidator(control: AbstractControl): CustomValidationErrors | null {
    let phoneNumber = control.value;

    if (phoneNumber == '') {
      return { required: { error: true, message: 'Contact number required' } };
    }

    // // Check if phone number starts with '+60'
    // if (phoneNumber && !phoneNumber.startsWith('+60')) {
    //   return { invalidPrefix: { error: true, message: 'Contact number must start with +60' } };
    // }

    // Check if phone number contains only digits after '+'
    const digitsOnly = phoneNumber.replace(/^\+/, ''); // Remove '+'
    if (!/^\d+$/.test(digitsOnly)) {
      return { invalidFormat: { error: true, message: 'Invalid contact number format' } };
    }

    // Check minimum length
    if (phoneNumber && phoneNumber.length < 9) {
      return { minLength: { error: true, message: 'Contact number must be at least 9 digits long' } };
    }

    // Check maximum length
    if (phoneNumber && phoneNumber.length > 13) {
      return { maxLength: { error: true, message: 'Contact number cannot exceed 13 digits' } };
    }

    return null;
  }


  toggleEye() {
    this.showPassword = !this.showPassword;
  }
  toggleEye2() {
    this.rshowPassword = !this.rshowPassword;
  }

  get f(){
    return this.membCreation.controls;
  } 

  password(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const cpassword = formGroup.get('password_confirmation')?.value;
    if(password!=cpassword){
      console.log(password+'not match'+cpassword);
    }else{
      console.log(password?.value+' match'+cpassword?.value);
    }
    console.log(password == cpassword ? null : { passwordNotMatch: true });
    return password === cpassword ? null : { passwordNotMatch: true };
  }

  onDateChange(event:any){
    let evalue=event;
    this.dobchoosed =this.datepipe.transform(evalue, 'yyyy-MM-dd');
    this.membCreation.get("dob")?.patchValue(this.dobchoosed);
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  onSubmit() {
    this.submitted=true;
    var form=this.membCreation.value;
    if (this.membCreation.valid) {
      this.btnloader=true;
      this.apiUrl.createMember(form).subscribe((res:any)=>{
        this.btnloader=false;
        if(res.status='success'){
          this.toastr.success('', 'Member Added Successfully...',{
            positionClass: 'toast-bottom-right',
          })
          .onHidden 
          .subscribe(() => 
            {
              this.router.navigate(['/members']);
            }
          );
        }
      },
      (err:any)=>{
        this.btnloader=false;
        this.toastr.error('', err,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
       });
      });
    }
    

  }
  
  

}
