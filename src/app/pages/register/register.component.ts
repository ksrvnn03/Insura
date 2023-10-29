import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

interface CustomValidationErrors {
  required?: { error: true; message: string };
  invalidPrefix?: { error: true; message: string };
  invalidFormat?: { error: true; message: string };
  minLength?: { error: true; message: string };
  maxLength?: { error: true; message: string };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showPassword: boolean = false;
  reshowPassword: boolean = false;
  result: any;
  response = '';
  loader: boolean = false;
  submitted: boolean = false;

  phoneNumberPrefixValidator(control: AbstractControl): CustomValidationErrors | null {
    let phoneNumber = control.value;

    if (phoneNumber == '') {
      return { required: { error: true, message: 'Contact number required' } };
    }

    // Check if phone number starts with '+60'
    if (phoneNumber && !phoneNumber.startsWith('+60')) {
      return { invalidPrefix: { error: true, message: 'Contact number must start with +60' } };
    }

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authservice: AuthService,
    private user: UserService,
    private toastr: ToastrService) {
  }

  regForm = this.fb.group(
    {
      uname: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ]
      ],
      password: [
        "",
        [Validators.required, Validators.minLength(6)]
      ],
      cpassword: [
        "",
        [Validators.required, Validators.minLength(6)]
      ],
      phone: [
        "",
        [this.phoneNumberPrefixValidator]
      ],
      haveid: [""],
      referrer_id: [""]
    }
  );

  /* checkPasswords(regForm: FormGroup) {
    var form = this.regForm.value;
    const pass = form.password;
    const confirmPass = form.cpassword;
    return pass == confirmPass ? null : { notSame: true };
  } */

  ngOnInit(): void {
    let userLogged = this.user.getLoggedUser();
    if (userLogged) {
      this.router.navigate(['/dashboard']);
    }
  }

  toggleEye() {
    this.showPassword = !this.showPassword;
  }
  toggleEye2() {
    this.reshowPassword = !this.reshowPassword;
  }

  get f() {
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
    this.submitted = true;
    var form = this.regForm.value;
    let pwd = form.password;
    let cpwd = form.cpassword;
    let yesref = form.haveid;
    let refid = form.referrer_id;
    if (pwd != '' && cpwd != '') {
      if (pwd != cpwd) {
        this.regForm.controls['cpassword'].setErrors({ 'customError': true });
      }
      else {
        this.regForm.controls['cpassword'].setErrors(null);
      }
    }
    console.log("yesref" + yesref);
    if (yesref) {
      if (refid == '') {
        this.regForm.controls['referrer_id'].setErrors({ 'required': true });
      } else {
        this.regForm.controls['referrer_id'].setErrors(null);
      }
    } else {
      this.regForm.controls['referrer_id'].setErrors(null);
    }

    if (this.regForm.valid) {
      this.http.post(environment.apiUrl + 'member/register', {
        referrer_id: form.referrer_id,
        email: form.email,
        password: form.password,
        password_confirmation: form.cpassword,
        name: form.uname,
        phone: form.phone
      }).subscribe(
        (res: any) => {
          if (res.status == "success") {
            this.toastr.success('', 'Register Successfully...', {
              positionClass: 'toast-bottom-right',
            })
              .onHidden
              .subscribe(() => {
                this.router.navigate(['/']);
              }
              );
          }
        },
        (err: any) => {
          console.log(err)
          this.toastr.error('', err, {
            timeOut: 2500,
            positionClass: 'toast-bottom-right'
          });
        }
      )

    }
  }

}
