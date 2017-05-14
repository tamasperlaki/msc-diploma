import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'tankika-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().then(console.log);
  }

}
