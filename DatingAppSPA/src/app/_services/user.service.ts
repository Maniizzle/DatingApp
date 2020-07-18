import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { map ,catchError} from 'rxjs/operators';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl=environment.apiUrl;
constructor(private http:HttpClient) { }

getUsers():Observable<User[]>{
  return this.http.get(this.baseUrl + 'users',{headers: this.jwt()})
    .pipe(
      
      map(response=> <User[]>response),
      catchError(this.handleError)
      
  );
  debugger;
}

getUser(id):Observable<User>{
  return this.http.get(this.baseUrl+'users/'+id,{headers: this.jwt()} ).pipe(
    map(response=>response as User),
    catchError(this.handleError)
    
  );
}

private jwt(){
  let token=localStorage.getItem('token');
  if(token){
    let headers= new HttpHeaders({authorization:'Bearer '+token});
    headers.append('content-type','application/json');
    return headers;
  }
}

private handleError(error:any){
  const applicationError=error.headers.get('Application-Error');
  if(applicationError){
    return throwError(applicationError);
  }
  const serverError= error;
  let modelStateErrors='';
  

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
