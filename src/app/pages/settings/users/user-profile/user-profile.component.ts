import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  token:any;
  submitted:boolean = false;
  preview='assets/img/profile.svg';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
  ) {
    this.token='Bearer '+localStorage.getItem('token');
   }

   profileCreation = this.fb.group(
    {
      name:["",Validators.required],
    }
  );

  ngOnInit(): void {
    
  }

  imagePreview(event:any){
    this.preview=URL.createObjectURL(event.target.files[0])
  }

  onSubmit(){
    
  }

}
