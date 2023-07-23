import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { MemberService } from 'src/app/services/member.service';
import { Router,  ActivatedRoute,  ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: 'app-memb-networks',
  templateUrl: './memb-networks.component.html',
  styleUrls: ['./memb-networks.component.css']
})
export class MembNetworksComponent implements OnInit {
  
 memberId = this.route.snapshot.paramMap.get("id");
 result:any=[];
 noTier:any;
 profile:any;
 isCollapsed = false;
 IsVisible0 = true;
 IsVisible1 = false;
 IsVisible2 = false;
 IsVisible3 = false;
 isAccordionOpen: boolean[] = [];
 oneAtATime = true;
 allOpen=false;
 totalMemb:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private toastr: ToastrService,
    private apiUrl:MemberService
  ) { 
   
  }

  ngOnInit(): void {
    this.IsVisible1 = true;
    this.getNetwork(this.memberId);
    this.getMemberData(this.memberId);
    
  }

  toggleAccordion(index: number) {
    this.allOpen=false;
      // Close all accordion items first
      const currentState = this.isAccordionOpen[index];

      this.isAccordionOpen = this.isAccordionOpen.map(() => false);
      // Open the clicked accordion item
      this.isAccordionOpen[index] =  !currentState;
  }

  openAllAccordions() {
    this.allOpen=true;
    this.isAccordionOpen = this.isAccordionOpen.map(() => true);
  }

  getNetwork(id:any){
    this.apiUrl.memberNetwork(id).subscribe(
      (res:any)=>{
        const mapped = Object.keys(res).map(key => ({type: key, value: res[key]}));
        this.result=mapped;
        this.totalMemb=0;
        Object.keys(res).forEach((key) => {
          this.totalMemb += res[key].length;
        });

        
        for (let i = 0; i < this.result.length; i++) {
          
          this.isAccordionOpen.push(false);
        }
        this.toggleAccordion(0)
       // this.noTier=Object.keys(this.result).length;
      },
      (error:any)=>{

      }
    )
  }

  getMemberData(id:any){
    this.apiUrl.getMember(id).subscribe(
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

}

