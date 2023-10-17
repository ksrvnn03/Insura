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
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-security-manage',
  templateUrl: './security-manage.component.html',
  styleUrls: ['./security-manage.component.css']
})


export class SecurityManageComponent implements OnInit {
  submit: boolean = false;
  btnloader:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
  ) {

  }


  passFrm = this.fb.group(
    {
      current_password: ["", Validators.required],
      new_password: ["", [Validators.required, Validators.minLength(8)]],
      new_confirm_password: ["", [Validators.required, Validators.minLength(8)]],
    }
  );

  ngOnInit(): void {
  }

  onSubmit() {
    this.submit = true;
    if (this.passFrm.valid) {
      this.btnloader=true;
      let form=this.passFrm.value;
      this.http.post(environment.apiUrl + 'admin/change-password', form ).subscribe(
        (res: any) => {
          this.btnloader=false;
          if(res.status=='error'){
            this.toastr.error('', res.message, {
              positionClass: 'toast-bottom-right'
            });
          }else{
            this.btnloader=false;
            this.toastr.success('', res.message, {
              positionClass: 'toast-bottom-right'
            });
            this.passFrm.reset()
          }
        },
        (error: any) => {
           this.toastr.error('', error, {
            positionClass: 'toast-bottom-right'
          });  
        }
      )
    }
  }

}
