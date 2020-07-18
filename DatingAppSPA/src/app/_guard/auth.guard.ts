import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import {AuthService} from '../_services/auth.service'
import {AlertifyService} from '../_services/alertify.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements 


CanActivate {


  constructor(private authService:AuthService,private router:Router, private alertify:AlertifyService ) {


  }
  




  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.loggedIn())
   { return true;}

   this.router.navigate(['/home']);
   this.alertify.error("you need to be logged in to access this area");

   return false;
  }
  
}
