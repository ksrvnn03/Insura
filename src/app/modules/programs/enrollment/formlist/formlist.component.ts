import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from 'src/app/services/program.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.css']
})
export class FormlistComponent implements OnInit {
  list: any;
  modalRef?: BsModalRef;
  delId: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) {

  }

  ngOnInit(): void {
    this.getFrmList();
  }


  getFrmList() {
    this.http.get(environment.apiUrl + 'forms').subscribe((res: any) => {
      this.list = res.data;
    },
      (error: any) => {
        this.toastr.error('', error.error.message, {
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

  delete(event: any) {
    var delId = event.target.getAttribute("data-id");
    this.http.delete(environment.apiUrl + 'forms/' + delId).subscribe((res: any) => {
      this.modalService.hide();
      this.getFrmList();
      this.toastr.success('', res.message, {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    }, (err: any) => {
      this.toastr.error('', err.error.message, {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
  }

}
