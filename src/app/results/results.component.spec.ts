import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UserService } from '../user/user.service';
import { IRoundResult } from '../interfaces/IRoundResult';
import { IMove } from '../interfaces/IMove';
import { RoundWinner } from '../enums/RoundWinner';
import { Router } from '@angular/router';
import { AppState } from '../store/state/app.state';
import { MockComponent } from 'ng-mocks';
import { RoundResultComponent } from '../round-result/round-result.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ResultsComponent', () => {
  const roundNumber = 1;
  const playerScore = 2;
  const computerScore = 3;
  const playerChoice: IMove = { id: 1, name: '', image: '', beats: 2 };
  const computerChoice: IMove = { id: 2, name: '', image: '', beats: 3 };
  const winner = RoundWinner.USER;

  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  const expectedUser = 'User';
  const initialResults: Array<IRoundResult> = [
    { roundNumber, playerChoice, computerChoice, playerScore, computerScore, winner }
  ];
  const initialState: AppState = {
    results: initialResults
  };

  class MockUserService {
    getUser() { return of(expectedUser); }
    setUser(name: string) { }
  }

  class MockRouter {
    navigate(array: Array<string>) { }
  }

  const userService = new MockUserService();
  const router = new MockRouter();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsComponent,
        MockComponent(RoundResultComponent) ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display match result', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const resultElement = element.query(By.css('.results__info'));

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    const result: HTMLElement = resultElement.nativeElement;

    // Assert
    expect(result.innerHTML).toContain('You Lose');
  });

  it('should show match score', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const resultElement = element.query(By.css('.results__score'));

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    const result: HTMLElement = resultElement.nativeElement;

    // Assert
    expect(result.innerHTML).toContain(expectedUser);
    expect(result.innerHTML).toContain(playerScore.toString());
    expect(result.innerHTML).toContain(computerScore.toString());
    expect(result.innerHTML).toContain('Computer');
  });

  it('should return to welcome screen on button click', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const buttonElement = element.query(By.css('.button'));
    const userSpy = spyOn(userService, 'setUser');
    const routerSpy = spyOn(router, 'navigate');

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    buttonElement.nativeElement.click();

    // Assert
    expect(userSpy).toHaveBeenCalledWith('');
    expect(routerSpy).toHaveBeenCalledWith(['/welcome']);
  });
});
