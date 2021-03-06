import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user:User;
  constructor(private userService:UserService,private alertifyService:AlertifyService, private route:ActivatedRoute) { }

  ngOnInit() {
    //the user in data.user is from the resolver in the route
    this.route.data.subscribe(data=>{
      this.user=data.user;
    })
   // this.loadUser();
  }


loadUser(){
this.userService.getUser(+this.route.snapshot.params.id)
.subscribe((user:User)=>{
  this.user=user;
},
error=>{
  this.alertifyService.error(error);
});
}
}
