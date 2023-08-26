import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-email-temp',
  templateUrl: './email-temp.component.html',
  styleUrls: ['./email-temp.component.css']
})
export class EmailTempComponent implements OnInit {
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '8rem',
    placeholder: 'Email Message...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    toolbarHiddenButtons: [
      ['fontName','insertImage','insertVideo','removeFormat','insertHorizontalRule','customClasses', 'subscript', 'superscript', 'fontSize', 'undo', 'redo','justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',     'indent', 'outdent']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {

  }

}
