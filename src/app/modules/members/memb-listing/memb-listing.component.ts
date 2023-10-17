import { Component, OnInit,ElementRef  } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { MemberService } from 'src/app/services/member.service';
import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-memb-listing',
  templateUrl: './memb-listing.component.html',
  styleUrls: ['./memb-listing.component.css']
})
export class MembListingComponent implements OnInit {
  bsInlineValue=new Date();
  modalRef?: BsModalRef;
 
  result:any;
  noitem:any;
  noresult:any;
  perpage:any;
  tolpage:any;
  cpage:any;
  ppage:any;
  npage:any;
  delId:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private apiUrl:MemberService,
    private modalService: BsModalService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    bsInlineValue: Date;
    this.getMembers(1);
  }

  getMembers(page:any){
    this.apiUrl.listingMember(page).subscribe((res:any)=>{
        this.result=res.data;
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
    this.getMembers(newPage);
  }

  confirmModal(template: any, event:any) {
    this.modalRef = this.modalService.show(template);
    var element = event.target.getAttribute("data-id");
    this.delId=element;
  }

  delete(event:any){
    var delMembId= event.target.getAttribute("data-id"); 
    this.apiUrl.deleteMember(delMembId).subscribe((res:any)=>{
      this.modalService.hide();
      this.getMembers(1);
   },(err:any)=>{
    this.noresult=err.error.message;
    this.toastr.error('', err.error.message,{
      timeOut: 2500,
      positionClass: 'toast-bottom-right' 
    });
   });
  }
}
