import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { FinanceService } from 'src/app/services/finance.service';
import { Router,  ActivatedRoute,  ActivatedRouteSnapshot } from "@angular/router";
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-memb-finance',
  templateUrl: './memb-finance.component.html',
  styleUrls: ['./memb-finance.component.css']
})
export class MembFinanceComponent implements OnInit {
  transview: boolean = false;
  result:any;
  noresult:any;
  transData:any;
  balance:any;
  memberId = this.route.snapshot.paramMap.get("id");
  activeTab:any;
  profile:any;
  viewData:any;
  choosedtype=0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private toastr: ToastrService,
    private apiUrl:FinanceService,
    private membUrl:MemberService
  ) { }

  ngOnInit(): void {
    this.getTransList(this.memberId,0);
    this.transCount();
    this.wallBalance();
    this.getMemberData(this.memberId);
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

  trans_close(){
    this.transview=false;
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

  typeTranscation(type:any){
    this.choosedtype=type;
    this.getTransList(this.memberId, type);
  }

  statusChange($event:any){
    let tranid=$event.target.getAttribute('data-id');
    let cstatus=$event.target.getAttribute('data-status');

    this.apiUrl.statusFinanceUpdate(tranid,cstatus).subscribe((res:any)=>{
      this.toastr.success('', res.message,{
        positionClass: 'toast-bottom-right',
      });
      this.getTransList(this.memberId,0);
    },
    (err:any)=>{
      this.toastr.error('', err.error.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
    });
  }

  wallBalance(){
    this.apiUrl.walletBalance(this.memberId).subscribe(
      (res:any)=>{
        this.balance=res.data.balance;
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
  
  approve_payment(id:any){
    /* 4- is approve status no. */
    this.apiUrl.statusFinanceUpdate(id,4).subscribe((res:any)=>{
      this.getTransList(this.memberId,this.choosedtype);
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

  getMemberData(id:any){
    this.membUrl.getMember(id).subscribe(
      (res:any)=>{
        this.profile=res.data; 
      },
      (err:any)=>{
        this.toastr.error('', err.error.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      }
    )
  }

  getTransList(memberid:any,type:any){
    this.activeTab=type;
    this.apiUrl.listingTransaction(memberid, type).subscribe(
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

}
