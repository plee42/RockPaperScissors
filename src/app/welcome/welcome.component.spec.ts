import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WelcomeComponent } from './welcome.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  const expectedUser = 'User';

  class MockUserService {
    setUser(user: string) { return of(expectedUser); }
  }

  class MockRouter {
    navigate(array: Array<string>) { }
  }

  const userService = new MockUserService();
  const router = new MockRouter();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WelcomeComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should save input as user name', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const buttonElement = element.query(By.css('.btn'));
    const button: HTMLElement = buttonElement.nativeElement;
    const spy = spyOn(userService, 'setUser');

    // Act
    component.ngOnInit();
    component.form.get('playerName').setValue(expectedUser);
    button.click();

    // Assert
    expect(spy).toHaveBeenCalledWith(expectedUser);
  });

  it('should navigate away from page when button is pressed', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const buttonElement = element.query(By.css('.btn'));
    const button: HTMLElement = buttonElement.nativeElement;
    const spy = spyOn(router, 'navigate');

    // Act
    component.ngOnInit();
    button.click();

    // Assert
    expect(spy).toHaveBeenCalled();
  });

});
