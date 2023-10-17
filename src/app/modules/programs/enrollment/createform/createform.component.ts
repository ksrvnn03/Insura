import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from 'src/app/services/program.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { error } from 'jquery';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit {
  createFrm: boolean = false;
  programList: any;
  programId = this.route.snapshot.paramMap.get("pid");
  form: any;
  formData: any;
  submit: boolean = false;
  choosedType: any;
  addedFields: any = [];
  formshow:boolean = false;


  constructor(
    private route: ActivatedRoute,
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
        validators.push(this.getValidator(field.type, field.name));
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

  getValidator(type: string, name: string): ValidatorFn {
    if (type === 'radio' || type === 'checkbox') {
      return this.radioGroupValidator(name);
    }
    else if (type === 'email') {
      return this.combineValidators([Validators.required, Validators.email]);
    }
    else {
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

  isNameAlreadyExists(array:any, nameToCheck:any) {
    for (const obj of array) {
      if (obj.name === nameToCheck) {
        return true; // The name already exists in the array
      }
    }
    return false;
  }

   compareObjects(a:any, b:any) {
    if (a.name === b.name) {
      if (a.label === b.label) {
        return a.type.localeCompare(b.type);
      }
      return a.label.localeCompare(b.label);
    }
    return a.name.localeCompare(b.name);
  }

  
  addField($event: any) {
    let type = $event.target.value;
    this.choosedType = $event.target.value;
    this.formshow=true;
    
    if(type==''){
      this.formshow=false;
    }
    this.formData = [];
    if (type != '') {
      this.formData.push(
        {
          "type": "text",
          "name": "name",
          "label": "Field Name",
          "placeholder": "Enter Field Name",
          "required": true
        },
        {
          "type": "text",
          "name": "label",
          "label": "Field Label",
          "placeholder": "Enter Field Label",
          "required": true
        },
        {
          "type": "text",
          "name": "placeholder",
          "label": "Placeholder Text",
          "placeholder": "Ex: Enter your name",
          "required": ''
        },
        {
          "type": "radio",
          "name": "required",
          "label": "Required",
          "options": ["true", "false"],
          "required": true
        }
      );
    }
    if (type != '' && type == 3 || type == 4 || type == 5) {
      this.formData.push(
        {
          "type": "text",
          "name": "options",
          "label": "Options",
          "placeholder": "Add each option with , (comma)  separater",
          "required": true
        }
      );
    }

    this.formData.forEach((field: any) => {
      const validators = [];
      if (field.required) {
        if (field.type == 'email') {
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

  generateSlug(name:any) {
    if(name){
      let slug = name.toLowerCase().replace(/\s+/g, '_');
      const cleanSlug = slug.replace(/[^\w\s]+/g, '');
      slug = cleanSlug.replace(/^_+|_+$/g, '');
      return slug;
    }
  }

  removeField($event:any) {
    let fieldarray = this.addedFields;
    let indexToRemove = $event.target.getAttribute("data-id");
    if (indexToRemove >= 0 && indexToRemove < fieldarray.length) {
      fieldarray.splice(indexToRemove, 1); 

      this.toastr.success('', 'One field removed.',{
        positionClass: 'toast-bottom-right',
      });

    } else {
      console.log("Index is out of bounds.");
    }
  }

  onSubmit() {
    this.submit = true;
    
    $('#dropdown_type').prop('selectedIndex',0);

    if (this.form.valid) {

      let typeIndex = this.choosedType - 1;
      let fieldtype = ['text', 'textarea', 'checkbox', 'radio', 'select', 'email', 'phone', 'date', 'time'];
      let newobj : any = {};
      for (const key in this.form.value) {
        if (this.form.value.hasOwnProperty(key)) {
          const value = this.form.value[key];
          const type = fieldtype[typeIndex];

          if(key=='options'){
            const valuesArray = value.split(',');
            let resultArray:any = [];
              valuesArray.forEach((val:any) => {
                resultArray.push({
                  "value": val,
                  "text": val.toLowerCase() 
                });
            });
            
            newobj = Object.assign(newobj, { [key]: resultArray, 'type': type });
          }else{ 
            newobj = Object.assign(newobj, { [key]: value, 'type': type });
          }
        }
      }

      let nameField=this.generateSlug(newobj.name);
      const myObject = {
        name: nameField,
        label:newobj.label,
        type: newobj.type,
        options: newobj.options,
        required: newobj.required
      };

      if(this.isNameAlreadyExists(this.addedFields,nameField)){
        this.toastr.error('', 'Field name already exits.', {
          positionClass: 'toast-bottom-right',
        });
      }else{
        this.addedFields.push(myObject);
        this.formData = [];
        this.formshow = false;

        this.toastr.success('', 'New field added.', {
          positionClass: 'toast-bottom-right',
        });
        this.form.reset();
      }
     
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

  onSave(){
    let name=$('#formname').val();
    let id=$('#programme_id').val();
   
    this.addedFields.forEach((field:any) => {
      console.log(field.required,'field.required')
      if (field.required === "true") {
        field.required = true;
      } else {
        field.required = false;
      }
    });
    let fields=this.addedFields;
    const inputObject = {
      "name": name,
      "programme_id": id,
      "fields": JSON.stringify(fields)
    };
    
   
    /* const jsonString = JSON.stringify(inputObject, null, 2); */
   /*  const jsonString = JSON.stringify(inputObject) */
    if(name!='' && id!='' && fields.length>0){
      this.http.post(environment.apiUrl+'forms', inputObject ).subscribe((res:any)=>{

        if(res.status=='error'){
          this.toastr.error('', res.message,{
            positionClass: 'toast-bottom-right',
          });
        }else{
          this.toastr.success('', res.message,{
            positionClass: 'toast-bottom-right',
          });
        }

      },(error:any)=>{
        this.toastr.error('', error,{
          positionClass: 'toast-bottom-right',
        });
      })
      
    }else{
      this.toastr.error('', 'Form Name, Program Name & Field List are Required',{
        positionClass: 'toast-bottom-right',
      });
    }

  }

} 
