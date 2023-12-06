import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-viewentries',
  templateUrl: './viewentries.component.html',
  styleUrls: ['./viewentries.component.css']
})
export class ViewentriesComponent implements OnInit {
  exportsub: boolean = false; 

  entries: any;
  headers: any;
  frmid= this.route.snapshot.paramMap.get("fid");
  token:any;
  submit:boolean=false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }


  ngOnInit(): void {
    this.headers = { headers: new HttpHeaders().set("Authorization", 'Bearer ' + localStorage.getItem('token')) }
    this.getEntries()
  }

  
  getObjectKeys(obj: any) {
    return Object.keys(obj);
  }

  getEntries(){
    this.http.get(environment.apiUrl+'enroll/form/'+this.frmid+'/enrollments-dt',{ headers: new HttpHeaders().set("Authorization", ''+this.token)}).subscribe((res:any)=>{
      this.entries=res.data.original.data;
      console.log(this.entries)
    },
    (err:any)=>{
      console.log(err);
    });
  }

  downloadEntry(event: any){
    /* var insId = event.target.getAttribute("data-id"); */
    this.exportsub=true;
    this.http.get(environment.apiUrl + 'enroll/form/'+this.frmid+'/export/enrollment-dt', { responseType: 'blob' }).subscribe((response: Blob) => {
      const fileURL = URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = 'Form Entries';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.exportsub=false;
      this.toastr.success('', 'Form Entries Downloaded', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    }, (error: any) => {
      this.exportsub=false;
      this.toastr.error('', 'Try Again!', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
  }

}
