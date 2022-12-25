import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { MemberService } from 'src/app/services/member.service';
import { Router,  ActivatedRoute,  ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: 'app-memb-sidebar',
  templateUrl: './memb-sidebar.component.html',
  styleUrls: ['./memb-sidebar.component.css']
})
export class MembSidebarComponent implements OnInit {
  memberId = this.route.snapshot.paramMap.get("id");
  noresult:any;
  result:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private toastr: ToastrService,
    private apiUrl:MemberService
  ) { }

  ngOnInit(): void {
    this.getMemberData(this.memberId);
  }

  getMemberData(id:any){
    this.apiUrl.getMember(id).subscribe(
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
    )
  }
}
