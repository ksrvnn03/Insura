import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ProgramService } from 'src/app/services/program.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MemberService } from 'src/app/services/member.service';


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
  memberList:any;
  selected_members: any[] = [];
  ref_id='';

  filterdOptions = [];
  showFilter: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient,
    private toastr: ToastrService,
    private apiUrl:ProgramService,
    private modalService: BsModalService,
    private memberApi: MemberService,
  ) { }

  ngOnInit(): void {
    this.getProgram(this.programId);
  }

  filterUsers($event:any) {
    this.showFilter=true;
    let namesearch=$event.target.value.toLowerCase()

    this.filterdOptions = this.memberList.filter((item:any) => item.name.toLowerCase().includes(namesearch));
  }

  removeChoosed(id:any){
    console.log('id',id)
    const foundIndex = this.selected_members.findIndex(item => item.id ===  id);
    if (foundIndex !== -1) {
      this.selected_members.splice(foundIndex,1)
    }
    console.log(this.selected_members)
  }

  alreadyChoosed(id:any){
    for (const item of this.selected_members) {
      if (item.id === id) {
       return true
      }
    }
    return false;
  }
  
  refadd($event:any){
    this.ref_id=$event.target.value;
  }

  memberClick(db:any) {
    let id=db;
    const idAlreadyExists = this.selected_members.some(item => item.id === id['id']);
    if (!idAlreadyExists) {
      this.selected_members.push(id);
    }else{
      const foundIndex = this.selected_members.findIndex(item => item.id ===  id['id']);
      if (foundIndex !== -1) {
        this.selected_members.splice(foundIndex,1)
      }
    }
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

  listMember(){
    this.memberApi.memberList().subscribe((res:any)=>{
      this.memberList=res.data;
    },
    (error:any)=>{
        console.log(error)
    })
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
    this.listMember()
    this.modalRef = this.modalService.show(template);
    var element = event.target.getAttribute("data-id");
    this.delId=element;
  }

  addtoprogram(){
    let ids=this.selected_members;
    let refid=this.ref_id;
    
    if(ids.length>0 && refid!=''){
      const idsArray = ids.map(item => item.id);
      const idsCommaSeparated = idsArray.join(',');
      
      this.apiUrl.addMembertoProgram(this.programId,idsCommaSeparated, refid).subscribe((res:any)=>{
        this.toastr.success('', 'Members added successfully',{
          timeOut: 1500,
          positionClass: 'toast-bottom-right' 
        });
        this.showFilter=false;
        this.selected_members=[];
        this.ref_id='';
        this.getProgram(this.programId);
        this.modalService.hide();
      },(err:any)=>{
        this.noresult=err.error.message;
        this.modalService.hide();
        this.toastr.error('', err.error.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      });
    }else{
      if(ids.length==0 && refid==''){
        this.toastr.error('', 'Choose any member and Enter refferal id',{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      }
      else if(ids.length>0 && refid==''){
        this.toastr.error('', 'Enter refferal id',{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      }
      else if(ids.length==0 && refid!=''){
        this.toastr.error('', 'Choose any member',{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      }
    }
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
