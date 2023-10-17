import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProgramService } from 'src/app/services/program.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit {
  createFrm: boolean = false;
  programList: any;

  form: any;
  formData: any;
  submit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private apiUrl: ProgramService
  ) {

  }

  ngOnInit(): void {
    this.getProgramList();
    this.form = FormGroup;

    this.form = this.fb.group({});

    this.formData = [
    ];

    this.formData.forEach((field: any) => {
      const validators = [];
      if (field.required) {
        validators.push(this.getValidator(field.type,field.name));
      }
      this.form.addControl(
        field.name,
        this.fb.control('', validators)
      );
    });
  }

  create() {
    this.createFrm = !this.createFrm;
  }

  combineValidators(validators: ValidatorFn[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      for (const validator of validators) {
        const result = validator(control);
        if (result) {
          return result;
        }
      }
      return null;
    };
  }

  radioGroupValidator(fieldName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const selectedOption = control.value;
      if (selectedOption === null || selectedOption === undefined || selectedOption === '') {
        return { 'required': true };
      }
      return null;
    };
  }

  getValidator(type: string,name:string): ValidatorFn {
    if (type === 'radio' || type === 'checkbox') {
      return this.radioGroupValidator(name);
    }
    else if (type === 'email') {
      return this.combineValidators([Validators.required, Validators.email]);
    }
    else{
      return Validators.required;
    }
  }


  getProgramList() {
    this.apiUrl.listAllPrograme().subscribe((res: any) => {
      this.programList = res.data;
      console.log(this.programList)
    },
      (error: any) => {
        this.toastr.error('', error.error.message, {
          timeOut: 2500,
          positionClass: 'toast-bottom-right'
        });
      })
  }
  

  get f() {
    return this.form.controls;
  }




  addField($event: any) {
    let type = $event.target.value;
    this.formData = [];
    if (type == 1) {
      this.formData.push(
        {
          "type": "text",
          "name": "name",
          "label": "Name",
          "placeholder": "Enter your name",
          "required": true
        },
        {
          "type": "email",
          "name": "email",
          "label": "Email",
          "placeholder": "Enter your email",
          "required": true
        },
        {
          "type": "select",
          "name": "gender",
          "label": "Gender",
          "options": ["Male", "Female", "Other"],
          "required": true
        },
        {
          "type": "textarea",
          "name": "comments",
          "label": "Comments",
          "placeholder": "Enter your comments",
          "required": true
        },
        {
          "type": "radio",
          "name": "subscription",
          "label": "Subscribe to newsletter",
          "options": ["Yes", "No"],
          "required": true
        },
        {
          "type": "checkbox",
          "name": "agreement",
          "label": "I agree to the terms and conditions",
          "required": true
        }
      );
    }

    this.formData.forEach((field: any) => {
      const validators = [];
      if (field.required) {
        if(field.type=='email'){
          console.log(this.getValidator(field.type, field.name));
        }
     
        validators.push(this.getValidator(field.type, field.name));
      }
      this.form.addControl(
        field.name,
        this.fb.control('', validators)
      );
    });
    console.log(this.formData)
  }

  removeField() {
    let index = 2;
    if (this.formData.length > 1) {
      this.formData.splice(index, 1);
      // Rebuild the form controls
      this.form = this.fb.group({});

      this.formData.forEach((field:any) => {
        const validators = [];
        if (field.required) {
          validators.push(this.getValidator(field.type, field.name));
        }
        this.form.addControl(
          field.name,
          this.fb.control('', validators)
        );
      });

    }
  }

  onSubmit() {
    this.submit = true;

    if (this.form.valid) {
      console.log(this.form.value);
      // Handle form submission here
    } else {
      // Mark all form fields as touched to display validation messages
      for (const control in this.form.controls) {
        if (this.form.controls.hasOwnProperty(control)) {
          this.form.get(control).markAsTouched();
        }
      }
    }

  }


} 
