import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map,catchError} from 'rxjs/operators'
import { throwError, Observable } from 'rxjs';
import {tokenNotExpired,JwtHelper } from 'angular2-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseurl='https://localhost:44352/api/auth/';
userToken:any;
decodedToken:any;
jwtHelper: JwtHelper= new JwtHelper();

constructor(private httpClient:HttpClient) { }




login(model:any){
 return this.httpClient.post(this.baseurl+'login',model,{headers: new HttpHeaders({'content-type':'application/json'})}).pipe(map(response=>{
   const user=response;
   console.log(user);
   if(user && user['tokenString']){
    localStorage.setItem('token',user['tokenString']);
    this.decodedToken=this.jwtHelper.decodeToken(user['tokenString']);
    console.log(this.decodedToken);
    this.userToken=user['tokenString'];
   }
  
 }),catchError(this.handleError));

}


// getUser(){
//   return this.httpClient.get('https://localhost:5001/api/values',{headers: new HttpHeaders({'content-type':'application/json'})});
// }


register(model:any){
  return this.httpClient.post(this.baseurl +'register',model,{headers: new HttpHeaders({'content-type':'application/json'})}).
  pipe(catchError(this.handleError));

}

loggedIn(){
  return tokenNotExpired('token');
}

private handleError(error:any){
  const applicationError=error.headers.get('Application-Error');
  if(applicationError){
    return throwError(applicationError);
  }
  const serverError= error;
  let modelStateErrors='';
  debugger;

  if(serverError){
   let error =serverError['error'];
   let err=error['errors'];
    for(const key in err){
      if(err[key]){
        modelStateErrors+=err[key] + '\n';

      }

    }
  }
  return throwError(modelStateErrors||'Server error');
}



}
