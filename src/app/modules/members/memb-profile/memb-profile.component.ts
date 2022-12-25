import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { MemberService } from 'src/app/services/member.service';
import { Router,  ActivatedRoute,  ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: 'app-memb-profile',
  templateUrl: './memb-profile.component.html',
  styleUrls: ['./memb-profile.component.css']
})
export class MembProfileComponent implements OnInit {
  memberId = this.route.snapshot.paramMap.get("id");
  noresult:any;
  result:any;
  address:any=[];
  enrolled_prog:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private toastr: ToastrService,
    private apiUrl:MemberService
  ) { 
    
  }

  ngOnInit(): void {
    this.getMemberData(this.memberId);
  }

  getMemberData(id:any){
    this.apiUrl.getMember(id).subscribe(
      (res:any)=>{
        this.result=res.data;
        this.enrolled_prog=res.data.enrolled_programmes;
        if(this.result.contact_details.address){
          this.address.push(this.result.contact_details.address);
        }
        if(this.result.contact_details.city){
          this.address.push(this.result.contact_details.city);
        }
        if(this.result.contact_details.state){
          this.address.push(this.result.contact_details.state);
        }
        if(this.result.contact_details.country){
          this.address.push(this.result.contact_details.zip);
        }
        if(this.result.contact_details.zip){
          this.address.push(this.result.contact_details.zip);
        }
        /* console.log(this.address); */
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
