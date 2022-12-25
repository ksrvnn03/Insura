import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private user:UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log(this.constructor.name);  
    }

  title = 'insura';
  ngOnInit(){
     
    let userLogged=this.user.getLoggedUser();
    if(userLogged){
     this.document.body.classList.add('bgbody');
    } 
  }

}
