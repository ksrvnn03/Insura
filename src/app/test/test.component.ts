import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  form: any;
  formData: any; // Load JSON data
  submit:boolean=false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form=FormGroup;

    this.form = this.fb.group({});

    this.formData=[
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
      }
    ];

    this.formData.forEach((field:any) => {
      const validators = field.required ? [Validators.required] : [];
      this.form.addControl(
        field.name,
        this.fb.control('', validators)
      );
    });
  }

    
  get f(){
    return this.form.controls;
 } 

 addField(){
  this.formData.push(
    {
      "type": "text",
      "name": "name1",
      "label": "Name2",
      "placeholder": "Enter your name",
      "required": true
    });
    this.formData.forEach((field:any) => {
      const validators = field.required ? [Validators.required] : [];
      this.form.addControl(
        field.name,
        this.fb.control('', validators)
      );
    });
    console.log(this.formData)
 }

 removeField() {
  let index= 2;
  if (this.formData.length > 1) {
    this.formData.splice(index, 1);
    // Rebuild the form controls
    this.form = this.fb.group({});

    this.formData.forEach((field:any) => {
      const validators = field.required ? [Validators.required] : [];
      this.form.addControl(
        field.name,
        this.fb.control('', validators)
      );
    });

  }
}

  onSubmit() {
    this.submit=true;

    if (this.form.valid) {
      console.log(this.form.value);
      // Handle form submission here
    }
  }

  
}