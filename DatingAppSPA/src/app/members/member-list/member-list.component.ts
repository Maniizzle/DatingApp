import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users:User[];
  constructor(private userService:UserService,private alertifyService:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{this.users=data.users;})
    //this.loadUsers();
  }

  loadUsers(){
    
    this.userService.getUsers().subscribe((users: User[])=>
    {
      console.log(users);
    this.users=users;
  }
    ,error=>{
      console.log(error);

      this.alertifyService.error(error);
    })
  }
}
