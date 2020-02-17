import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject('');
  private currentUser = this.userSource.asObservable();

  constructor() { }

  getUser(): Observable<string> {
    return this.currentUser;
  }

  setUser(user: string): void {
    this.userSource.next(user);
  }

}
