import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ProgramService } from 'src/app/services/program.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-prog-detail',
  templateUrl: './prog-detail.component.html',
  styleUrls: ['./prog-detail.component.css']
})

export class ProgDetailComponent implements OnInit {
  programId = this.route.snapshot.paramMap.get("id");
  noresult:any;
  result:any;
  progMember:any;
  modalRef?: BsModalRef;
  delId:any;
  ischecked: boolean = false;
  action_btn: boolean= false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient,
    private toastr: ToastrService,
    private apiUrl:ProgramService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getProgram(this.programId);
  }

  toggleSingle($event:any){
    var inputs = document.getElementsByName('checkitem');
    let nocheck=0;
    let remitem=[];
    for (var i = 0; i < inputs.length; i++) {   
    let chk=((<HTMLInputElement>(
      document.getElementsByName("checkitem")[i]
    )).checked==true);
      if(chk==true){
        let vl=(<HTMLInputElement>(
          document.getElementsByName("checkitem")[i]
        )).value;
        var delMembId= vl; 
        nocheck++;
        remitem.push(vl);
      }
    } 
    if(nocheck==0){
      this.action_btn=false;
    }else{
      this.action_btn=true;
    }
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

  removeMember($event:any){
    var inputs = document.getElementsByName('checkitem');
    let nocheck=0;
    var remitem:any=[];
    for (var i = 0; i < inputs.length; i++) {   
    let chk=((<HTMLInputElement>(
      document.getElementsByName("checkitem")[i]
    )).checked==true);
      if(chk==true){
        let vl=(<HTMLInputElement>(
          document.getElementsByName("checkitem")[i]
        )).value;
        var delMembId= vl; 
        nocheck++;
        remitem.push(vl);  
      }
     
      var stringValueYouWant = remitem.join(',');
      console.log(stringValueYouWant);
      /* console.log(remitem.length); */
    } 
    if(nocheck==0){
      this.action_btn=false;
      this.toastr.warning('', 'Choose any member',{
        timeOut: 1500,
        positionClass: 'toast-bottom-right' 
      });
    }else{
      this.action_btn=true;
    }

    if(remitem.length>0){
      this.apiUrl.programBulkDeleteMember(this.programId, stringValueYouWant).subscribe((res:any)=>{
        this.toastr.success('', 'Members detach successfully',{
            timeOut: 1500,
            positionClass: 'toast-bottom-right' 
          });
          this.getProgram(this.programId); 
      },(err:any)=>{
        const index = remitem.indexOf(delMembId);
        if (index > -1) { 
          remitem.splice(index, 1); 
        }

        this.toastr.error('', err.error.message,{
          timeOut: 1500,
          positionClass: 'toast-bottom-right' 
        });
      });
      
    }
  }

  confirmModal(template: any, event:any) {
    this.modalRef = this.modalService.show(template);
    var element = event.target.getAttribute("data-id");
    this.delId=element;
    console.log(this.delId);
  }
  
  addMember(template: any, event:any){
    this.modalRef = this.modalService.show(template);
    var element = event.target.getAttribute("data-id");
    this.delId=element;
  }

  addtoprogram($event:any){

  }

  delete(event:any){
    var delMembId= event.target.getAttribute("data-id"); 
      this.apiUrl.programDetachMember(this.programId, delMembId).subscribe((res:any)=>{
        this.modalService.hide();
        this.toastr.success('', 'Members detach successfully',{
          timeOut: 1500,
          positionClass: 'toast-bottom-right' 
        });
        this.getProgram(this.programId);
    },(err:any)=>{
      this.noresult=err.error.message;
      this.modalService.hide();
      this.toastr.error('', err.error.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
    });
  }

  getProgram(id:any){
    this.apiUrl.getProgram(id).subscribe(
      (res:any)=>{
        this.result=res.data;
      },
      (msg:any)=>{
        console.log(msg);
      }
    );

    this.apiUrl.programMember(id).subscribe(
      (res:any)=>{
        this.progMember=res.data;
      },
      (msg:any)=>{
        console.log(msg);
      }
    );
  }
}
