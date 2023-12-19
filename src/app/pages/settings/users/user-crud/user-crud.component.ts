import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {
  token: any;
  submitted: boolean = false;
  preview = 'assets/img/profile.svg';
  btnLoading = false;
  isEdit: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: SettingsService,
    public datepipe: DatePipe,
    private toastr: ToastrService,
  ) {
    this.token = 'Bearer ' + localStorage.getItem('token');
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
      password: ["", [Validators.required, Validators.minLength(6)]],
      password_confirmation: ["", [Validators.required, Validators.minLength(6)]],
      role: [1, [Validators.required]],
      ic_no: [""],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(13),
          Validators.pattern("^[0-9]{9,13}$")
        ]
      ],
      photo: [""],
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const cpassword = formGroup.get('password_confirmation')?.value;

    if (password !== "" && cpassword !== "") {
      if (password !== cpassword) {
        formGroup.get("password_confirmation")?.setErrors({ passwordMismatch: true });
      } else {
        formGroup.get("password_confirmation")?.setErrors(null);
      }
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.url.filter(seg => seg.path === "edit").length;
    if (this.isEdit) {
      this.fetchUser();
      this.profileCreation.get("password")?.removeValidators([Validators.required, Validators.minLength(6)]);
      this.profileCreation.get("password_confirmation")?.removeValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  fetchUser() {
    this.api.retrieveUser(this.route.snapshot.params['id']).subscribe((res: any) => {
      this.profileCreation.patchValue(res.data);
      this.profileCreation.get("photo")?.setValue("");
      this.preview = res?.data?.photo;
    });
  }

  get f() {
    return this.profileCreation;
  }

  get fc() {
    return this.profileCreation?.controls;
  }

  imagePreview(event: any) {
    this.preview = URL.createObjectURL(event.target.files[0]);
  }

  onFileChanged(event: any) {
    this.profileCreation.patchValue({
      photo: event.target.files[0]
    });
    console.log(event.target.files);
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileCreation.valid) {
      const formData = new FormData();
      // Append form data
      const formValues = this.profileCreation.value;
      Object.keys(formValues).forEach(key => {
        formData.append(key, formValues[key]);
      });
      this.btnLoading = true;
      if (this.isEdit) {
        formData.append("_method", "PUT");
        this.api.updateUser(formData, this.route.snapshot.params['id']).subscribe((res: any) => {
          this.toastr.success("", "User updated");
          this.submitted = false;
          this.btnLoading = false;
        }, (err) => {
          this.btnLoading = false;
          this.toastr.error(err);
        });
      } else {
        this.api.createAdmin(formData).subscribe((res: any) => {
          this.profileCreation.reset();
          this.toastr.success("", "New User created");
          this.submitted = false;
          this.btnLoading = false;
        }, (err) => {
          this.btnLoading = false;
          this.toastr.error(err);
        });
      }
    }
  }

}
