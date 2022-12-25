import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  
  
}
