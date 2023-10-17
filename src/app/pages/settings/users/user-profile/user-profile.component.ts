import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  token: any;
  submitted: boolean = false;
  preview = 'assets/img/profile.svg';
  profileFrm:any;
  apiUrl=environment.apiUrl;
  selectedFile='';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
  ) {

  }

  profileCreation = this.fb.group(
    {
      name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      ic_no:[""],
      phone  :[
        "",
        [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern("^[0-9]{12}$")
       ]
      ],
      photo:[""],
    }
  );

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.getProfile();
  }

  imagePreview(event: any) {
    this.preview = URL.createObjectURL(event.target.files[0])
  }

  getProfile() {
    this.http.get(environment.apiUrl + 'admin/profile' ).subscribe(
        (res: any) => {
          this.profileCreation.patchValue({
            name: res.data.name,
            email: res.data.email,
            ic_no: res.data.ic_no,
            phone: res.data.phone,
          });
          
          if(res.data.photo){
            $('.prevImg').attr('src',res.data.photo)
          }
          
        },

        (error:any)=>{
            /* this.toastr.error('', error.error.message,{
              positionClass: 'toast-bottom-right' 
          }); */
        }
      )
  }

  
  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0]; 
    console.log('sdf',this.selectedFile)
  }


  onSubmit() {
    this.submitted=true;
    var form=this.profileCreation.value;
    if (this.profileCreation.valid) {
      const formData = new FormData();
 
      if(form.name){
        formData.set("name", form.name);  
      }

      if(form.email){
        formData.set("email", form.email);  
      }

      if(form.ic_no){
        formData.set("ic_no", form.ic_no);  
      }
      
      if(form.phone){
        formData.set("phone", form.phone);  
      }

      if(this.selectedFile){
        formData.append("photo", this.selectedFile);  
      }

      if(this.selectedFile){
        formData.set("role", '1');  
      }

      this.http.post(environment.apiUrl + 'admin/profile', formData ).subscribe((res:any)=>{

        if(res.status='success'){
          this.toastr.success('', 'Profile Updated..',{
            positionClass: 'toast-bottom-right',
          })
          .onHidden 
          .subscribe(() => 
            {
              this.router.navigate(['/profile']);
            }
          );
        }
      },
      (err:any)=>{
        this.toastr.error('', err.data.message,{
          timeOut: 2500,
          positionClass: 'toast-bottom-right' 
       });
      });
    }
  }

}
