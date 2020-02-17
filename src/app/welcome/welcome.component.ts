import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

interface AppState {
  user: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  form: FormGroup;

  constructor(private title: Title, private fb: FormBuilder, private router: Router,
              private store: Store<AppState>, private userService: UserService) {
    title.setTitle('Welcome');
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      playerName: ''
    });
  }

  setName(): void {
    const user = this.form.get('playerName').value;
    this.userService.setUser(user);
  }

  proceedToGame(): void {
    this.setName();
    this.router.navigate(['/game']);
  }



}
