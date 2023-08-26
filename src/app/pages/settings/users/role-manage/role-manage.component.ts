import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit {
  result:Array<any>=[];
  token:any;
  submitted:boolean = false;
  form: FormGroup;
  choosedRole:any; 
  perm:Array<any>=[];
  

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient
  ) {
    this.token='Bearer '+localStorage.getItem('token');
    this.form = fb.group({
      name: [],
      address: fb.array([])
    })

    this.form = fb.group({
      name: [],
      address: fb.array([])
    })

   }

  ngOnInit(): void {
 
  }

  permission($event:any) {
   
      /* Bulk operation */
      let name=$event.target.name;
      let name1=name.split("_")
      let type=$event.target.title;
      let choosed=$event.currentTarget.checked;
      let ind=$event.target.getAttribute('data-ind');
      let chked=choosed ? 1: 0;
      let p=name1[1];
    /* console.log(choosed) */
       
      if (type ==  "Read") {
        let w=this.result[ind].pivot.write
        this.updatePermissions(name1[1],chked,w);
        console.log("read",name1[1],chked,w)
       // this.perm[ind][name1[1]]['read']=choosed ? 1 : 0
      }
      if (type =="Write") {
        let r=this.result[ind].pivot.read
       
        this.updatePermissions(name1[1],r,chked);
        console.log("wr",name1[1],r,chked)
       // this.perm[ind][name1[1]]['write']=choosed ? 1 : 0
      }
      /*  close*/
  }



  loadPermissions($event:any){
      this.choosedRole=$event.target.value;
      if(this.choosedRole){
        this.http.get(environment.apiUrl+'/roles/'+this.choosedRole+'/permissions',{ headers: new HttpHeaders().set("Authorization", ''+this.token)}).subscribe((res:any)=>{
          this.result=res.data.permissions
          console.log(this.result[0])
          let ar=[];
          for(let i=0; i<this.result.length; i++){
            let np=this.result[i].pivot.permission_id;
            let obj={};
            Object.assign(obj,{read:this.result[i].pivot.read, write:this.result[i].pivot.write})
            ar.push({[np]:obj});
           
          }
          this.perm=ar
          /* console.log(JSON.stringify(this.perm)) */
        },(err:any)=>{
          this.toastr.error('', err.error.message,{
            timeOut: 2500,
            positionClass: 'toast-bottom-right' 
          });
        })
      }
  }

  read_write($event:any){
    let id=$event.target.getAttribute('data-ind');
    if($event.target.checked){
      this.updatePermissions(id,1,1);
    }else{
     this.updatePermissions(id,0,0);
    }
  }

  loadPermissions2(val:any){
    this.choosedRole=val;
    if(this.choosedRole){
      this.http.get(environment.apiUrl+'/roles/'+this.choosedRole+'/permissions',{ headers: new HttpHeaders().set("Authorization", ''+this.token)}).subscribe((res:any)=>{
        this.result=res.data.permissions
        let ar=[];
        for(let i=0; i<this.result.length; i++){
          let np=this.result[i].pivot.permission_id;
          let obj={};
          Object.assign(obj,{read:this.result[i].pivot.read, write:this.result[i].pivot.write})
          ar.push({[np]:obj});
        }
        this.perm=ar
        /* console.log(JSON.stringify(this.perm)) */
      },(err:any)=>{
        this.toastr.error('', err.error.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
        });
      })
    }

  }


  updatePermissions(p:any,r:any,w:any){
    this.http.patch(environment.apiUrl+'/roles/'+this.choosedRole+'/permissions/'+p, 
    { 
      'read':r, 
      'write':w 
    },
    { headers: new HttpHeaders().set("Authorization", ''+this.token)}).subscribe((res:any)=>{
      this.toastr.success('', res.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
      this.result=[]
      this.loadPermissions2(this.choosedRole);
    /*   window.location.reload() */
    },(err:any)=>{
      this.toastr.error('', err.error.message,{
        timeOut: 2500,
        positionClass: 'toast-bottom-right' 
      });
    })
  }

}
