import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { FinanceService } from 'src/app/services/finance.service';
import { Router,  ActivatedRoute,  ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: 'app-financial-list',
  templateUrl: './financial-list.component.html',
  styleUrls: ['./financial-list.component.css']
})
export class FinancialListComponent implements OnInit {
  transview: boolean = false;
  ischecked: boolean = false;
  action_btn: boolean= false;
  

  result:any;
  noresult:any;
  transData:any;
  activeTab:any;
  viewData:any;
  choosedtype=0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private toastr: ToastrService,
    private apiUrl:FinanceService
  ) { }

  ngOnInit(): void {
    this.getTransList('0');
    this.transCount();
  } 

  getTransList(type:any){
    this.activeTab=type;
    this.apiUrl.listingTransaction('', type).subscribe(
      (res:any)=>{
        this.result=res.data; 
      },
      (err:any)=>{
        this.noresult=err.error.message;
        this.toastr.error('', err.error.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      }
    );
  }

  typeTranscation(type:any){
    this.choosedtype=type;
    this.getTransList(this.choosedtype);
  }


  trans_close(){
    this.transview=false;
  }

  trans_open(id:any){
    this.viewData=this.result[id];
    this.transview=true;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  statusChange($event:any){
    let tranid=$event.target.getAttribute('data-id');
    let cstatus=$event.target.getAttribute('data-status');

    this.apiUrl.statusFinanceUpdate(tranid,cstatus).subscribe((res:any)=>{
      this.toastr.success('', res.message,{
        positionClass: 'toast-bottom-right',
      });
      this.getTransList(this.statusChange);
    },
    (err:any)=>{
      this.toastr.error('', err.error.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
    });
  }

   
  approve_payment(id:any){
    /* 4- is approve status no. */
    this.apiUrl.statusFinanceUpdate(id,4).subscribe((res:any)=>{
      this.getTransList(this.choosedtype);
      this.trans_close();
      this.toastr.success('', res.message,{
        positionClass: 'toast-bottom-right',
      });
    },
    (err:any)=>{
      this.toastr.error('', err.error.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
    });
  }
 
  transCount(){
    this.apiUrl.transCount().subscribe(
      (res:any)=>{
        this.transData=res.data;
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }

  toggleCheckboxAll(event:any) {
    var inputs = document.getElementsByName('checkitem');
   if(event.target.checked==true){
    for (var i = 0; i < inputs.length; i++) {   
      let chk=(<HTMLInputElement>(
        document.getElementsByName("checkitem")[i]
      )).checked=true;
    } 
    this.action_btn=true;
   }else{
    for (var i = 0; i < inputs.length; i++) {   
      let chk=(<HTMLInputElement>(
        document.getElementsByName("checkitem")[i]
      )).checked=false;
    } 
    this.action_btn=false;
   }
  }

  itemchecked(event:any){
    var inputs = document.getElementsByName('checkitem');
    var noitem=0;
    for (var i = 0; i < inputs.length; i++) {   
      let chk=(<HTMLInputElement>(
        document.getElementsByName("checkitem")[i]
      )).checked;
      if(chk==true){
        noitem+=1;
      }
    } 
    if(noitem>0){
      this.action_btn=true;
    }else{
      this.action_btn=false;
    }
  }
}

