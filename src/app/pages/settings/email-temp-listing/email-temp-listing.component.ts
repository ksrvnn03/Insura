import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-email-temp-listing',
  templateUrl: './email-temp-listing.component.html',
  styleUrls: ['./email-temp-listing.component.css']
})
export class EmailTempListingComponent implements OnInit {
  result:any;
  apiUrl:any;
  modalRef?: BsModalRef;
  delId:any;
  bsInlineValue=new Date();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  listUsers(page:any){
    
  }

  confirmModal(template: any, event:any) {
    this.modalRef = this.modalService.show(template);
    var element = event.target.getAttribute("data-id");
  }

  delete(event:any){

  }

  statusChange($event:any){

  }

}
