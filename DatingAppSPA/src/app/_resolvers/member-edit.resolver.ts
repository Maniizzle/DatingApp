import {User} from '../_models/User';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { ProviderAst } from '@angular/compiler';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberEditResolver implements Resolve < User > {

/**
 *
 */
constructor(private userService: UserService, private router: Router, private alertify: AlertifyService,private authService:AuthService) {

}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User |Observable<User> | Promise<User> {

    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('problem retrieving data');
        this.router.navigate(['/members']);
        return Observable.of(null);
      })
    );
    throw new Error('Method not implemented.');
  }

}
