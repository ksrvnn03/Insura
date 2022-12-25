import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { MemberService } from 'src/app/services/member.service';
import { Router,  ActivatedRoute,  ActivatedRouteSnapshot } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-memb-edit',
  templateUrl: './memb-edit.component.html',
  styleUrls: ['./memb-edit.component.css']
})
export class MembEditComponent implements OnInit {
  memberId = this.route.snapshot.paramMap.get("id");
  noresult:any;
  result:any;
  dobchoosed:any;
  submitted:boolean = false;
  showPassword:boolean = false;
  rshowPassword:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private apiUrl:MemberService
  ) { }

  ngOnInit(): void {
    this.getMemberData(this.memberId);
  }

  membUpdate= this.fb.group(
    {
      name:["",Validators.required],
      ic_no:[""],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      phone  :[
        "",
        [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$")
       ]
      ],
      dobchoosed:[""],
      dob:["",[Validators.required]],
      gender:["",[Validators.required]],
      address:["",[Validators.required]],
      city:["",[Validators.required]],
      state:["",[Validators.required]],
      country:["",[Validators.required]],
      zip :["",[Validators.required]]
    }
  );

  onDateChange(event:any){
    let evalue=event;
    this.dobchoosed =this.datepipe.transform(evalue, 'yyyy-MM-dd');
    this.membUpdate.get("dob")?.patchValue(this.dobchoosed);
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  toggleEye() {
    this.showPassword = !this.showPassword;
  }
  toggleEye2() {
    this.rshowPassword = !this.rshowPassword;
  }

  getMemberData(id:any){
      this.apiUrl.getMember(id).subscribe(
        (res:any)=>{
          this.result=res.data;
          let newdob=  this.datepipe.transform(this.result.personal_details.dob, 'yyyy-MM-dd');
          
       
          this.membUpdate.patchValue({
            name: this.result.personal_details.full_name,
            ic_no: this.result.personal_details.ic_no,
            gender: this.result.personal_details.gender,
            dobchoosed: newdob,
            dob:newdob,
            phone: this.result.contact_details.phone,
            email: this.result.contact_details.email,
            address: this.result.contact_details.address,
            city: this.result.contact_details.city,
            state: this.result.contact_details.state,    
            country: this.result.contact_details.country, 
            zip: this.result.contact_details.zip,   
          });
          

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
 

  onSubmit() {
    this.submitted=true;
    var form=this.membUpdate.value;
    console.log(form);
    if (this.membUpdate.valid) {
      this.apiUrl.updateMember(form,this.memberId).subscribe((res:any)=>{
        res.status;
        if(res.status='success'){
          this.toastr.success('', 'Profile Updated...',{
            positionClass: 'toast-bottom-right',
          })
          .onHidden 
          .subscribe(() => 
            {
             // window.location.reload();
              //this.router.navigate(['/members']);
            }
          );
        }
      },
      (err:any)=>{
        this.toastr.error('', err.error.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
       });
      });
    }
  }

}
