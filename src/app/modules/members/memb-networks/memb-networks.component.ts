import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { MemberService } from 'src/app/services/member.service';
import { Router,  ActivatedRoute,  ActivatedRouteSnapshot } from "@angular/router";
import { environment } from 'src/environments/environment.prod';

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
 programlist:any;
 pid='';
 loader:boolean=false;

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
    this.getProgram();
    this.getNetwork(this.memberId,this.pid);
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


  getProgram(){
    this.http.get(environment.apiUrl+'programmes/list-all').subscribe((res:any)=>{
      this.programlist=res.data;
    })
  }


  changeNetByProg($event:any){
    let pid=$event.target.value;
    this.getNetwork(this.memberId,pid);
    this.toggleAccordion(0)
  }

  getNetwork(id:any,pid:any){
    this.loader=true;
    this.apiUrl.memberNetwork(id,pid).subscribe(
      (res:any)=>{
        const mapped = Object.keys(res).map(key => ({type: key, value: res[key]}));
        this.result=mapped;
        this.loader=false;
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
        this.loader=false;
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

