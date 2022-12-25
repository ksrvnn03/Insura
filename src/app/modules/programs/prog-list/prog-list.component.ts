import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/services/program.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-prog-list',
  templateUrl: './prog-list.component.html',
  styleUrls: ['./prog-list.component.css']
})
export class ProgListComponent implements OnInit {
  bsInlineValue=new Date();
  result:any;
  noitem:any;
  noresult:any;
  perpage:any;
  tolpage:any;
  cpage:any;
  ppage:any;
  npage:any;
  
  constructor(
    private apiUrl:ProgramService,
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.listPrograms(1);
  }
  
  listPrograms(page:any){
    this.apiUrl.listingProgram(page).subscribe(
      (res:any)=>{
        this.result=res.data.data;
        this.noitem=res.data.total;
        this.cpage=res.data.current_page;
        this.npage=res.data.next_page_url;
        this.ppage=res.data.prev_page_url;
        this.perpage=res.data.per_page;
        this.tolpage=res.data.total/this.perpage;
      },
      (err:any)=>{
        this.noresult=err.error.message;
        this.toastr.error('', err.error.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      }
    )
  }
  
  pageChange(newPage: number) {
    this.listPrograms(newPage);
  }

}
