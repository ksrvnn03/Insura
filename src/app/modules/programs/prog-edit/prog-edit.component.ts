import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from 'src/app/services/program.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-prog-edit',
  templateUrl: './prog-edit.component.html',
  styleUrls: ['./prog-edit.component.css']
})
export class ProgEditComponent implements OnInit {
  progId= this.route.snapshot.paramMap.get("id");
  token:any;
  submitted:boolean = false;
  dobchoosed:any;
  image: File | null = null;
  selectedFile='';
  choosedimg:any;

  constructor(    
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private apiUrl:ProgramService
    ) {
      this.token='Bearer '+localStorage.getItem('token');
    }

    programUpdation = this.fb.group(
    {
      name:["",Validators.required],
      join_fee:["",[Validators.required,Validators.pattern("^[0-9]*$")]],
      tax_percent:["",[Validators.pattern("^[0-9]*$")]],
      service_charge:["",[Validators.pattern("^[0-9]*$")]],
      commission_type:[""],
      commission_amount:["",Validators.required],
      image:[""],
      description:[""]
    }
  );

  ngOnInit(): void {
    this.getProgram(this.progId);
  }

  getProgram(progid:any){
    this.apiUrl.getProgram(progid).subscribe((res:any)=>{
      let data=res.data;
      this.programUpdation.patchValue({
        name: data.name,
        join_fee: data.join_fee,
        tax_percent: data.tax_percent,
        service_charge: data.service_charge,
        commission_type: data.commission_type,
        commission_amount: data.commission_amount,
        description: data.description,
      });
      this.choosedimg=data.image_url;
    },
    (err:any)=>{
      console.log(err);
    });
  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0]; 
    console.log('sdf',this.selectedFile)
  }

  onSubmit() {
    this.submitted=true;
    var form=this.programUpdation.value;
    if (this.programUpdation.valid) {
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
       this.http.patch(environment.apiUrl+'admin/programmes/'+this.progId, formData, { headers: new HttpHeaders().set("Authorization", ''+this.token)}).subscribe((res:any)=>{
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
