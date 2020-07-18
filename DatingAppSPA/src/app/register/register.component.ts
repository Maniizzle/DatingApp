import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model:any = {};
// @Input() valuesFromHome:any;
@Output() cancelRegister= new EventEmitter();


  constructor(private authService:AuthService,private alertifyService:AlertifyService ) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(data=>{
      this.alertifyService.success('successful registration');
      console.log('successful registration');
    }, error=>{
      this.alertifyService.error(error);
      console.log(error);
    
    })
   // console.log("registered");
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("registration cancelled")
  }
}
