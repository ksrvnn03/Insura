import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { error } from 'jquery';

@Component({
  selector: 'app-frm-entry-docu',
  templateUrl: './frm-entry-docu.component.html',
  styleUrls: ['./frm-entry-docu.component.css']
})
export class FrmEntryDocuComponent implements OnInit {
  frmid = this.route.snapshot.paramMap.get("fid");
  membid: any = this.route.snapshot.paramMap.get("mid");
  token: any;
  submit: boolean = false;
  headers: any;
  listDocu: any=[];

  modalRef?: BsModalRef;
  delId: any;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.headers = { headers: new HttpHeaders().set("Authorization", 'Bearer ' + localStorage.getItem('token')) }
    this.getEntryDocus()
  }

  getEntryDocus() {
    let memberid = this.membid;
    this.http.get(environment.apiUrl + 'enroll/form/' + this.frmid + '/documents/' + memberid).subscribe((res: any) => {
      this.listDocu = res.data;
    },
      (err: any) => {
        this.listDocu=[];
        this.toastr.error('', err.error.message, {
          timeOut: 2500,
          positionClass: 'toast-bottom-right'
        });
      })
  }

  confirmModal(template: any, event: any) {
    this.modalRef = this.modalService.show(template);
    var element = event.target.getAttribute("data-id");
    this.delId = element;
  }

  delete($event: any) {
    var delMembId = $event.target.getAttribute("data-id");
    this.http.delete(environment.apiUrl + 'enroll/form/documents/' + delMembId).subscribe((res: any) => {
      this.modalService.hide();
      this.getEntryDocus();
    }, (err: any) => {
      this.modalService.hide();
      this.toastr.error('', err.error.message, {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
  }

  download($event: any) {
    const docuId = $event.target.getAttribute("data-id");
    /*  const  docuName =$event.target.getAttribute("data-name"); */
    const docuName = 'form_document_' + docuId;
    this.http.get(environment.apiUrl + 'enroll/download/' + docuId, { responseType: 'blob', headers: new HttpHeaders().set("Authorization", '' + this.token) }).subscribe((response: Blob) => {
      const fileURL = URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = docuName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  statusChange($event: any) {
    let docid = $event.target.getAttribute('data-id');
    let cstatus = $event.target.getAttribute('data-status');

    this.http.patch(environment.apiUrl + 'enroll/update-status/' + docid, { status: cstatus }).subscribe((res: any) => {
      this.getEntryDocus();
      this.toastr.success('', res.message, {
        positionClass: 'toast-bottom-right',
      });
    },
      (err: any) => {
        this.toastr.error('', err.error.message, {
          timeOut: 2500,
          positionClass: 'toast-bottom-right'
        });
      });
  }

  isImageFile(fileName: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = fileName.substr(fileName.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(ext);
  }

  generateImageLink(id: any, name: any) {
    const docuId = id;
    const docuName = name;

    this.http.get(environment.apiUrl + 'enroll/form/documents/view/' + docuId, { responseType: 'blob', headers: new HttpHeaders().set("Authorization", '' + this.token) }).subscribe((response: Blob) => {
      const fileURL = URL.createObjectURL(response);
      const a = document.createElement('a');
      const imageURL = URL.createObjectURL(response);
      window.open(imageURL, '_blank');
    });
  }

}
