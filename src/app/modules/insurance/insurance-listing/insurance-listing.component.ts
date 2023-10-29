import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { error } from 'jquery';

@Component({
  selector: 'app-insurance-listing',
  templateUrl: './insurance-listing.component.html',
  styleUrls: ['./insurance-listing.component.css']
})
export class InsuranceListingComponent implements OnInit {
  title = 'insura';
  dtOptions: DataTables.Settings = {};
  posts: any;
  headers: any;
  dtTrigger: Subject<any> = new Subject();
  showTable: boolean = false;
  insurance_import: boolean = false;
  cover_import: boolean = false;
  quotesubmitted: boolean = false;

  quoteDoc_import: boolean = false;
  quoteDoc_submit: boolean = false;

  selectedFile = '';
  modalRef?: BsModalRef;
  delId: any;
  apiUrl = environment.apiUrl;
  coverID = '';
  coversubmit: boolean = false;
  frmloader: boolean = false;
  btnloader: boolean = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  ngOnInit(): void {
    this.headers = { headers: new HttpHeaders().set("Authorization", 'Bearer ' + localStorage.getItem('token')) }
    this.dtOptions = {};
    this.getInsurance()
  }

  quotefrm = this.fb.group(
    {
      quotefile: ["", Validators.required],
      fresh: ["", Validators.required]
    }
  );

  coverfrm = this.fb.group(
    {
      file: ["", Validators.required]
    }
  );


  quoteDoc = this.fb.group(
    {
      file: ["", Validators.required],
      id: ['']
    }
  );

  get f() {
    return this.quotefrm.controls;
  }

  getInsurance() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        console.log('recal 2')
        this.http
          .post(this.apiUrl + 'insurance/dtList', dataTablesParameters, {})
          .subscribe((resp: any) => {
            this.posts = resp.data['original'].data;
            this.showTable = true;
            callback({
              recordsTotal: resp.data['original'].recordsTotal,
              recordsFiltered: resp.data['original'].recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: "memberID" },
        { data: "memberName" },
        { data: "programmeName" },
        { data: "company_name" },
        { data: "premium" },
        { data: "created_at" }
      ],
    };
  }

  confirmModal(template: any, event: any) {
    this.modalRef = this.modalService.show(template);
    var element = event.target.getAttribute("data-id");
    this.delId = element;
  }

  delete(event: any) {
    var insId = event.target.getAttribute("data-id");
    this.http.delete(this.apiUrl + 'insurance/' + insId).subscribe((res: any) => {

      if (res) {
        this.showTable = false;
        this.modalService.hide();
        this.toastr.success('', res.message, {
          timeOut: 2500,
          positionClass: 'toast-bottom-right'
        });
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }

    }, (err: any) => {
      this.toastr.error('', err.error.message, {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
  }

  downloadQuote(event: any) {
    var insId = event.target.getAttribute("data-id");
    var title = event.target.getAttribute("data-title");

    this.http.post(environment.apiUrl + 'insurance/' + insId + '/download/enroll-documents', {}, { responseType: 'blob' }).subscribe((response: Blob) => {

      const fileURL = URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = title + ' Insurance Quote';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.toastr.success('', 'Insurance Document Downloaded', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    }, (error: any) => {
      this.toastr.error('', 'Try Again!', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
  }

  sideview() {
    this.insurance_import = !this.insurance_import;
  }

  sideview2() {
    this.cover_import = !this.cover_import;
  }

  sideview3() {
    this.quoteDoc_import = !this.quoteDoc_import;
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  quoteDocSubmit(){
    this.quoteDoc_submit = true;
    var form = this.quoteDoc.value;
    if (this.quoteDoc.valid) {
      this.btnloader = true;
      this.frmloader = false;
      const formData = new FormData();

      if (this.selectedFile) {
        formData.append("file", this.selectedFile);
      }

      this.http.post(environment.apiUrl + 'insurance/'+form.id+'/upload/quote-doc' , formData).subscribe((res: any) => {
        this.quotesubmitted = false;
        this.insurance_import = false;
        this.dtOptions = {};
        this.showTable = false;
        this.getInsurance();

        this.btnloader = false;
        setTimeout(() => {
          window.location.reload()
        }, 1000)

        this.frmloader = false;
        this.toastr.success('', res.message, {
          positionClass: 'toast-bottom-right',
        })
      },
        (error: any) => {
          this.btnloader = false;
          this.frmloader = false;
          this.quotesubmitted = false;
          this.toastr.error('', error.response.message, {
            positionClass: 'toast-bottom-right',
          })
        })
    }
  }

  quoteSubmit() {
    this.quotesubmitted = true;
    var form = this.quotefrm.value;
    if (this.quotefrm.valid) {
      this.btnloader = true;
      this.frmloader = false;
      const formData = new FormData();

      if (this.selectedFile) {
        formData.append("file", this.selectedFile);
      }

      this.http.post(environment.apiUrl + 'insurance/import?fresh=' + form.fresh, formData).subscribe((res: any) => {
        this.quotesubmitted = false;
        this.insurance_import = false;
        this.dtOptions = {};
        this.showTable = false;
        this.getInsurance();

        this.btnloader = false;
        setTimeout(() => {
          window.location.reload()
        }, 1000)

        this.frmloader = false;
        this.toastr.success('', res.message, {
          positionClass: 'toast-bottom-right',
        })
      },
        (error: any) => {
          this.btnloader = false;
          this.frmloader = false;
          this.quotesubmitted = false;
          this.toastr.error('', error.response.message, {
            positionClass: 'toast-bottom-right',
          })
        })
    }
  }

  downloadCover($event: any) {
    var insId = $event.target.getAttribute("data-id");
    var title = $event.target.getAttribute("data-title");

    this.http.post(environment.apiUrl + 'insurance/' + insId + '/download/cover-letter', {}, { responseType: 'blob' }).subscribe((response: Blob) => {
      const fileURL = URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = title + ' Cover';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.toastr.success('', 'Cover Downloaded', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    }, (error: any) => {
      this.toastr.error('', 'Try Again!', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
  }

  uploadCover($event: any) {
    this.coverID = $event.target.getAttribute("data-id");
    this.sideview2();
  }
  viewCover($event: any) {
    var insId = $event.target.getAttribute("data-id");
    var title = $event.target.getAttribute("data-title");

    this.http.post(environment.apiUrl + 'insurance/' + insId + '/view/cover-letter', {}, { responseType: 'blob' }).subscribe((response: Blob) => {
  
      var fileURL = window.URL.createObjectURL(response);                        

      //this not display my pdf document in a new tab.
      window.open(fileURL, '_blank');

      //this display my document pdf, but in current tab
    //  window.location.href = fileURL; 

    }, (error: any) => {
      this.toastr.error('', 'Try Again!', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
  }

  viewQuote($event: any) {
    var insId = $event.target.getAttribute("data-id");
    var title = $event.target.getAttribute("data-title");

    this.http.post(environment.apiUrl + 'insurance/' + insId + '/download/enroll-documents', {}, { responseType: 'blob' }).subscribe((response: Blob) => {

      const fileURL = URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = title + ' Insurance Quote';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.toastr.success('', 'View Quote', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    }, (error: any) => {
      this.toastr.error('', 'Try Again!', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
  }

  uploadQuote($event: any) {
    let insId = $event.target.getAttribute("data-id");
    this.quoteDoc.patchValue({id:insId})
    this.sideview3();
  }

  coverSubmit() {
    this.coversubmit = true;

    var form = this.coverfrm.value;
    if (this.coverfrm.valid) {
      this.frmloader = true;
      const formData = new FormData();

      if (this.selectedFile) {
        formData.append("file", this.selectedFile);
      }
      if (this.coverID) {
        this.http.post(environment.apiUrl + 'insurance/' + this.coverID + '/upload/cover-letter', formData).subscribe((res: any) => {
          this.frmloader = false;
          this.coversubmit = false;
          this.cover_import = false;
          this.getInsurance()
          this.toastr.success('', res.message, {
            positionClass: 'toast-bottom-right',
          })
        },
          (error: any) => {
            this.frmloader = false;
            this.coversubmit = false;

            this.toastr.error('', error, {
              positionClass: 'toast-bottom-right',
            })
          });
      }

    }
  }

}
