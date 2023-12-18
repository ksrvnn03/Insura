import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  result:any;
  modalRef?: BsModalRef;
  delId:any;
  bsInlineValue=new Date();
  btnLoading=false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: SettingsService,
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(){
    this.api.adminList.subscribe((res:any) => {
      this.result = res?.data;
    });
  }

  confirmModal(template: any, event:any) {
    this.modalRef = this.modalService.show(template);
    this.delId = event.target.getAttribute("data-id");
  }

  delete(event:any){
    this.btnLoading = true;
    this.api.deleteAdmin(this.delId).subscribe((res:any) => {
      this.modalRef?.hide();
      this.listUsers();
      this.toastr.success("", res?.message);
      this.btnLoading = false;
    });
  }

  statusChange($event:any){

  }

}
