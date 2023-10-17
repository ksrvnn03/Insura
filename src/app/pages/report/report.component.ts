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
import { error } from 'jquery';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  submit:boolean=false;
  btnloader:boolean=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
  ) {

  }


  reportFrm = this.fb.group(
    {
      start_date: [""],
      end_date: [""],
      type: ["" ,Validators.required],
    }
  );


  ngOnInit(): void {
    const start = document.getElementById('start_date') as HTMLInputElement;
    const end = document.getElementById('end_date') as HTMLInputElement;
    
    // Add event listeners
    start.addEventListener('change', () => {
        if (start.value) {
            end.min = start.value;
        }
    }, false);
    
    end.addEventListener('change', () => {
        if (end.value) {
            start.max = end.value;
        }
    }, false);
  }

  onSubmit(){
      this.submit=true;
      if(this.reportFrm.valid){
        let value=this.reportFrm.value;
        this.btnloader=true;
        this.http.post(environment.apiUrl+'reports/sendTransactions',value).subscribe((res:any)=>{
          this.btnloader=false;
          this.toastr.success('', res.message, {
            positionClass: 'toast-bottom-right'
          });
        },
        (error:any)=>{
          this.btnloader=false;
          this.toastr.error('', error, {
            positionClass: 'toast-bottom-right'
          });  
        })
      }
  }
}
