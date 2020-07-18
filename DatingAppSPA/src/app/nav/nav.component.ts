import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(public authservice:AuthService,private alertifyService:AlertifyService,private router:Router) { }

  ngOnInit() {
    console.log(this.model);
  }
login(form:NgForm){
  this.authservice.login(this.model).subscribe(data=>{
    this.alertifyService.success("logged in successfully");
    form.resetForm();
    console.log("loggin in successfully");

  },error=>{
    this.alertifyService.error("Failed to Login");
    
    form.controls['password'].setValue(null);
    debugger;

    console.log(error);
  },
  ()=>{
    this.router.navigate(['/members']);  
  });
  console.log(this.model);
}

async logout(){
  this.authservice.userToken= null;
  localStorage.removeItem('token');
  debugger;
  await this.alertifyService.message('logged out');
debugger;
  this.router.navigate(['/home']);  


  //console.log("logged out");

}

loggedIn(){
  return this.authservice.loggedIn();
  //const token=localStorage.getItem('token');
  //return !!token;
}

}
