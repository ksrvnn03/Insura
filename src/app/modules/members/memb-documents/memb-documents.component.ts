import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DocumentService } from 'src/app/services/document.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

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
  filePath=environment.apiUrl;
  statusChoosed=0;

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
    this.getMembDocu(this.memberId, 0);
  }

  getMembDocu(id:any,status:any){
    this.apiUrl.memberDocu(id,status).subscribe((res:any)=>{
        this.result=res.data;
    },(err:any)=>{
      this.toastr.error('', err.error.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
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

    this.apiUrl.statusDocu(docid,cstatus).subscribe((res:any)=>{
      this.toastr.success('', res.message,{
        positionClass: 'toast-bottom-right',
      });
      this.getMembDocu(this.memberId,this.statusChoosed);
    },
    (err:any)=>{
      this.toastr.error('', err.error.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
    });

   /*  if(cstatus==2){
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
    } */
  }
  
  status(id:any){
    this.statusChoosed=id;
    this.getMembDocu(this.memberId,id);
  }

  delete(event:any){
    var delMembId= event.target.getAttribute("data-id"); 
    this.apiUrl.deleteDocu(delMembId).subscribe((res:any)=>{
      this.modalService.hide();
      this.getMembDocu(this.memberId,this.statusChoosed);
   },(err:any)=>{
    this.modalService.hide();
    this.noresult=err.error.message;
    this.toastr.error('', err.error.message,{
      timeOut: 2500,
      positionClass: 'toast-bottom-right' 
    });
   });
  }

  makeHttpRequest(docuId:any): Observable<any> {
    // Show the Toastr notification when the request is initiated
    this.toastr.info('Document Downloading....', 'Please wait', { timeOut: 0 });
    return this.apiUrl.downloadDocu(docuId);
  }


  download(event:any){
    const docuId= event.target.getAttribute("data-id");
    const  docuName =event.target.getAttribute("data-name");
    this.makeHttpRequest(docuId).subscribe((response:Blob)=>{
      const fileURL = URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = docuName; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
