import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DocumentService } from 'src/app/services/document.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-memb-documents',
  templateUrl: './memb-documents.component.html',
  styleUrls: ['./memb-documents.component.css']
})
export class MembDocumentsComponent implements OnInit {
  result:any;
  noresult:any;
  memberId = this.route.snapshot.paramMap.get("id");
  modalRef?: BsModalRef;
  delId:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private apiUrl:DocumentService,
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.getMembDocu(this.memberId);
  }

  getMembDocu(id:any){
    this.apiUrl.memberDocu(id).subscribe((res:any)=>{
        this.result=res.data;
    },(err:any)=>{
      console.log();
    })
  }

  confirmModal(template: any, event:any) {
    this.modalRef = this.modalService.show(template);
    var element = event.target.getAttribute("data-id");
    this.delId=element;
  }

  statusChange($event:any){
    let docid=$event.target.getAttribute('data-id');
    let cstatus=$event.target.getAttribute('data-status');
    if(cstatus==2){
      this.toastr.warning('', 'This document already verified.',{
        positionClass: 'toast-bottom-right',
      });
    }else{
      this.apiUrl.statusDocu(docid).subscribe((res:any)=>{
        this.toastr.success('', 'Verified Successfully...',{
          positionClass: 'toast-bottom-right',
        });
        this.getMembDocu(this.memberId);
      },
      (err:any)=>{
        this.toastr.error('', err.error.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      });
    }
  }

  delete(event:any){
    var delMembId= event.target.getAttribute("data-id"); 
    this.apiUrl.deleteDocu(delMembId).subscribe((res:any)=>{
      this.modalService.hide();
      this.getMembDocu(this.memberId);
   },(err:any)=>{
    this.modalService.hide();
    this.noresult=err.error.message;
    this.toastr.error('', err.error.message,{
      timeOut: 2500,
      positionClass: 'toast-bottom-right' 
    });
   });
  }

  download(event:any){
    var docuId= event.target.getAttribute("data-id"); 
    this.apiUrl.downloadDocu(docuId).subscribe((response:any)=>{

    },(err:any)=>{
    this.noresult=err.error.message;
    /* this.toastr.error('', err.error.message,{
      timeOut: 2500,
      positionClass: 'toast-bottom-right' 
    }); */
   }); 
}
}
