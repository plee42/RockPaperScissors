import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = '';

  constructor(private title: Title, private userService: UserService) { }

  ngOnInit(): void {
    this.subscribeToUser();
  }

  getTitle(): string {
    return this.title.getTitle();
  }

  subscribeToUser(): void {
    this.userService.getUser().subscribe(user => this.user = user);
  }

}
