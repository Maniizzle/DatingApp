import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode:boolean=false;
values:any = [];
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }
  registerToggle(){
    this.registerMode = true;
  }
  getValues(){
   return this.httpClient.get('https://localhost:5001/api/values',{headers: new HttpHeaders({'content-type':'application/json'})}).subscribe(data => {
   this.values = data; 
      console.log(this.values);
    });
  }

  cancelRegisterMode(registerMode:boolean){
    this.registerMode=registerMode;
    debugger;

  }
}
