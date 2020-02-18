import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GameComponent } from './game.component';
import { IRoundResult } from '../interfaces/IRoundResult';
import { AppState } from '../store/state/app.state';
import { UserService } from '../user/user.service';
import { Scissors } from '../models/Scissors';

describe('GameComponent', () => {
  const expectedUser = 'User';
  const initialResults: Array<IRoundResult> = [
    { roundNumber: null, playerChoice: null, computerChoice: null, playerScore: null, computerScore: null, winner: null }
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

  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show match score', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const scoreElement = element.query(By.css('.game__score'));

    // Act
    fixture.detectChanges();
    const score: HTMLElement = scoreElement.nativeElement;

    // Assert
    expect(score.innerHTML).toContain(expectedUser);
    expect(score.innerHTML).toContain('0 - 0');
    expect(score.innerHTML).toContain('Computer');
  });

  it('should show round number', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const roundElement = element.query(By.css('.game__intro'));

    // Act
    fixture.detectChanges();
    const round: HTMLElement = roundElement.nativeElement;

    // Assert
    expect(round.innerHTML).toContain(component.roundNumber.toString());
  });

  it('should set up user choices', () => {
    // Assert
    expect(component.moveList.length).toEqual(3);
  });

  it('round player winner is determined when turn is taken', () => {
    // Arrange
    const move = new Scissors();
    component.roundPlayerWinner = null;

    // Act
    component.takeTurn(move);

    // Assert
    expect(component.roundPlayerWinner).toBeTruthy();
  });

  it('round move winner is determined when turn is taken', () => {
    // Arrange
    const move = new Scissors();
    component.roundMoveWinner = null;

    // Act
    component.takeTurn(move);

    // Assert
    expect(component.roundMoveWinner).toBeTruthy();
  });

  it('round number is incremented when turn is taken', () => {
    // Arrange
    const move = new Scissors();
    component.roundNumber = 2;

    // Act
    component.takeTurn(move);

    // Assert
    expect(component.roundNumber).toEqual(3);
  });

  it('user routed to results when round 10 is complete', () => {
    // Arrange
    const move = new Scissors();
    component.roundNumber = 10;
    const spy = spyOn(router, 'navigate');

    // Act
    component.takeTurn(move);

    // Assert
    expect(spy).toHaveBeenCalledWith(['/results']);
  });

});
