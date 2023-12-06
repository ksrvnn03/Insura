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
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']
})
export class EditformComponent implements OnInit {
  frmid = this.route.snapshot.paramMap.get("fid");
  fieldlist: any;
  formfield: any;
  formname = '';
  programme_id: any;


  form: any;
  formData: any;
  submit: boolean = false;
  choosedType: any;
  addedFields: any = [];
  formshow: boolean = false;

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
    this.getFields();

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
 
  sideview() {
    this.formshow = !this.formshow;
  }

  /* -------  */
  get f() {
    return this.form.controls;
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

  addField($event: any) {
    let type = $event.target.value;
    this.choosedType = $event.target.value;
    this.formshow = true;

    if (type == '') {
      this.formshow = false;
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

  isNameAlreadyExists(array:any, nameToCheck:any) {
    for (const obj of array) {
      if (obj.name === nameToCheck) {
        return true; // The name already exists in the array
      }
    }
    return false;
  }

  /* ------ */


  public getObjectValues(obj: any) {
    let commaSeparatedString = '';

    for (let i = 0; i < obj.length; i++) {
      commaSeparatedString += obj[i].text;
      if (i < obj.length - 1) {
        commaSeparatedString += ', ';
      }
    }
    return commaSeparatedString;
  }

  getFields() {
    this.http.get(environment.apiUrl + 'forms/' + this.frmid).subscribe((res: any) => {
      this.fieldlist = res.data.fields;
      this.formfield = res.data.fields;
      this.formname = res.data.name;
      this.programme_id = res.data.programme_id;
    },
      (error: any) => {
        this.toastr.error('', error.error.message, {
          timeOut: 2500,
          positionClass: 'toast-bottom-right'
        });
      });
  }

  removeField(id: any) {
    const indexToDelete = id;
   

    this.http.delete(environment.apiUrl+'forms/'+this.frmid+'/fields/'+indexToDelete).subscribe((res:any)=>{
      this.getFields()
      this.toastr.success('', 'One field removed', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    },
    (error:any)=>{
      this.toastr.error('', 'Try Later!', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    });
   /*  if (indexToDelete >= 0 && indexToDelete < this.formfield.length) {
      this.formfield.splice(indexToDelete, 1);
      this.toastr.success('', 'One field removed', {
        timeOut: 2500,
        positionClass: 'toast-bottom-right'
      });
    } */
  }

  generateSlug(name:any) {
    if(name){
      let slug = name.toLowerCase().replace(/\s+/g, '_');
      const cleanSlug = slug.replace(/[^\w\s]+/g, '');
      slug = cleanSlug.replace(/^_+|_+$/g, '');
      return slug;
    }
  }


  onSubmit() {
    this.submit = true;

    if (this.form.valid) {

      let typeIndex = this.choosedType - 1;
      let fieldtype = ['text', 'textarea', 'checkbox', 'radio', 'select', 'email', 'phone', 'date', 'time'];
      let newobj: any = {};
      for (const key in this.form.value) {
        if (this.form.value.hasOwnProperty(key)) {
          const value = this.form.value[key];
          const type = fieldtype[typeIndex];
          
          if (key == 'options' && value) {
            const valuesArray = value.split(',');
            let resultArray: any = [];
            valuesArray.forEach((val: any) => {
              resultArray.push({
                "value": val,
                "text": val.toLowerCase()
              });
            });

            newobj = Object.assign(newobj, { [key]: resultArray, 'type': type });
          } else {
            newobj = Object.assign(newobj, { [key]: value, 'type': type });
          }
        }
      }

      let nameField=this.generateSlug(newobj.name);
      let reqva='';
      let nwreq=0;
       reqva=newobj.required;
      if(reqva==='true'){
        nwreq=1;
      }else{
        nwreq=0;
      }
      let myObject = {};
       myObject = {
        name: nameField,
        label: newobj.label,
        type: newobj.type,
        options: newobj.options,
        required: nwreq
      };
      
      if(this.isNameAlreadyExists(this.fieldlist,nameField)){
        this.toastr.error('', 'Field name already exits.', {
          positionClass: 'toast-bottom-right',
        });
      }else{
        this.http.post(environment.apiUrl+'forms/'+this.frmid+'/fields', myObject ).subscribe((res:any)=>{
          this.toastr.success('', 'New field added.', {
            positionClass: 'toast-bottom-right',
          });
          this.getFields()
        });
       
       /*  this.fieldlist.push(myObject);
        this.formData = [];
        this.formshow = false;
        console.log(this.fieldlist)
        this.toastr.success('', 'New field added.', {
          positionClass: 'toast-bottom-right',
        }); */
        this.getFields()
        this.formData = [];
        this.formshow = false;
        this.form.reset();
      }
      
    } else {
      // Mark all form fields as touched to display validation messages
      for (const control in this.form.controls) {
        if (this.form.controls.hasOwnProperty(control)) {
          this.form.get(control).markAsTouched();
        }
      }
    }
  }


  onSave() {
    let formname = $('#formname').val();
    let pid = this.programme_id;
    let fields = this.fieldlist;

    if (formname != '' && pid && fields.length > 0) {
     
      this.fieldlist.forEach((field:any) => {
        if (field.required === "true") {
          field.required = true;
        } else {
          field.required = false;
        }
      });

      let fields=this.fieldlist;

      const inputObject = {
        "name": formname,
        "programme_id": pid,
        "fields": JSON.stringify(fields)
      };
      
    
      this.http.put(environment.apiUrl+'forms/'+this.frmid+'/update', inputObject ).subscribe((res:any)=>{
        this.toastr.success('', res.message,{
          positionClass: 'toast-bottom-right',
        });
      });

    } else {
      this.toastr.error('', 'Form Name, Program Name & Field List are Required', {
        positionClass: 'toast-bottom-right',
      });
    }

  }

}
