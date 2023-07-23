import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProgramService } from 'src/app/services/program.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-prog-add',
  templateUrl: './prog-add.component.html',
  styleUrls: ['./prog-add.component.css']
})
export class ProgAddComponent implements OnInit {
 
  token:any;
  submitted:boolean = false;
  dobchoosed:any;
  image: File | null = null;
  selectedFile='';
 

  constructor(    
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private apiUrl:ProgramService
    ) {
      this.token='Bearer '+localStorage.getItem('token');
    }

    programCreation = this.fb.group(
    {
      name:["",Validators.required],
      join_fee:["",[Validators.required,Validators.pattern("^[0-9]*$")]],
      tax_percent:["",[Validators.pattern("^[0-9]*$")]],
      service_charge:["",[Validators.pattern("^[0-9]*$")]],
      commission_type:[""],
      commission_amount:["",Validators.required],
      commission_amount_2:["",Validators.required],
      commission_amount_3:["",Validators.required],
      image:[""],
      description:[""]
    }
  );

  ngOnInit(): void {
  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0]; 
    console.log('sdf',this.selectedFile)
  }

  onSubmit() {
    this.submitted=true;
    var form=this.programCreation.value;
    if (this.programCreation.valid) {
      const formData = new FormData();
 
      
      if(form.name){
        formData.set('name',  form.name );
      }
      if(form.join_fee){
        formData.set('join_fee',  form.join_fee );
      }
      if(form.tax_percent){
        formData.append('tax_percent', form.tax_percent);
      }
      if(form.service_charge){
        formData.append('service_charge', form.service_charge);
      }
      if(form.commission_type){
        formData.append('commission_type', form.commission_type);
      }
      if(form.commission_amount){
        formData.append('commission_amount', form.commission_amount);
      }
      if(form.description){
        formData.append('description', form.description);
      }
      if(this.selectedFile){
        formData.append("image", this.selectedFile);  
      }
      if(form.commission_amount_2){
        formData.append("commission_amount_2", form.commission_amount_2);  
      }
      if(form.commission_amount_3){
        formData.append("commission_amount_3", form.commission_amount_3);  
      }


      this.apiUrl.createProgram(formData).subscribe((res:any)=>{
        if(res.status='success'){
          this.toastr.success('', 'Program Added Successfully...',{
            positionClass: 'toast-bottom-right',
          })
          .onHidden 
          .subscribe(() => 
            {
              this.router.navigate(['/programs']);
            }
          );
        }
      },(err:any)=>{
        this.toastr.error('', err.error.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
      });
      });
    }
  }

}
