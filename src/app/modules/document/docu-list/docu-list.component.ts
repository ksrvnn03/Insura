import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DocumentService } from 'src/app/services/document.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-docu-list',
  templateUrl: './docu-list.component.html',
  styleUrls: ['./docu-list.component.css']
})
export class DocuListComponent implements OnInit {

  result:any;
  noitem:any;
  noresult:any;
  perpage:any;
  tolpage:any;
  cpage:any;
  ppage:any;
  npage:any;
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
    this.listDocu(1);
  }

  listDocu(page:any){
    this.apiUrl.listDocu(1).subscribe((res:any)=>{
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

  uploadModal(upload_modal: any) {
    this.modalRef = this.modalService.show(upload_modal);
  }
  
  statusChange($event:any){
    let docid=$event.target.getAttribute('data-id');
    let cstatus=$event.target.getAttribute('data-status');

    this.apiUrl.statusDocu(docid,cstatus).subscribe((res:any)=>{
      this.toastr.success('', 'Verified Successfully...',{
        positionClass: 'toast-bottom-right',
      });
      this.listDocu(1);
    },
    (err:any)=>{
      this.toastr.error('', err.error.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
    });
  }

  delete(event:any){
    var delMembId= event.target.getAttribute("data-id"); 
    this.apiUrl.deleteDocu(delMembId).subscribe((res:any)=>{
      this.modalService.hide();
      this.listDocu(1);
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

  pageChange(newPage: number) {
    this.listDocu(1);
  }

}
