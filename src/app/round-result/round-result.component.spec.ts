import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RoundResultComponent } from './round-result.component';
import { IRoundResult } from '../interfaces/IRoundResult';
import { IMove } from '../interfaces/IMove';
import { RoundWinner } from '../enums/RoundWinner';

describe('RoundResultComponent', () => {
  const roundNumber = 1;
  const playerScore = 2;
  const computerScore = 3;
  const playerChoice: IMove = { id: 1, name: '', image: '', beats: 2 };
  const computerChoice: IMove = { id: 2, name: '', image: '', beats: 3 };
  const winner = RoundWinner.USER;

  let component: RoundResultComponent;
  let fixture: ComponentFixture<RoundResultComponent>;
  const roundResult: IRoundResult = { roundNumber, playerChoice, computerChoice, playerScore, computerScore, winner };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show round number', () => {
    // Arrange
    component.result = roundResult;
    const element: DebugElement = fixture.debugElement;

    // Act
    fixture.detectChanges();
    const roundNumberElement = element.query(By.css('.round__number'));
    const roundNumberHtml: HTMLElement = roundNumberElement.nativeElement;

    // Assert
    expect(roundNumberHtml.innerHTML).toContain(roundNumber.toString());
  });

  it('should show player score', () => {
    // Arrange
    component.result = roundResult;
    const element: DebugElement = fixture.debugElement;

    // Act
    fixture.detectChanges();
    const playerScoreElement = element.query(By.css('.round__cumulative-player-score'));
    const playerScoreHtml: HTMLElement = playerScoreElement.nativeElement;

    // Assert
    expect(playerScoreHtml.innerHTML).toContain(playerScore.toString());
  });

  it('should show computer score', () => {
    // Arrange
    component.result = roundResult;
    const element: DebugElement = fixture.debugElement;

    // Act
    fixture.detectChanges();
    const computerScoreElement = element.query(By.css('.round__cumulative-computer-score'));
    const computerScoreHtml: HTMLElement = computerScoreElement.nativeElement;

    // Assert
    expect(computerScoreHtml.innerHTML).toContain(computerScore.toString());
  });

  it('should show player result', () => {
    // Arrange
    component.result = roundResult;
    const element: DebugElement = fixture.debugElement;

    // Act
    fixture.detectChanges();
    const playerResultElement = element.query(By.css('.round__result-letter-player'));
    const playerResultHtml: HTMLElement = playerResultElement.nativeElement;

    // Assert
    expect(playerResultHtml.innerHTML).toContain('W');
  });

  it('should show computer result', () => {
    // Arrange
    component.result = roundResult;
    const element: DebugElement = fixture.debugElement;

    // Act
    fixture.detectChanges();
    const computerResultElement = element.query(By.css('.round__result-letter-computer'));
    const computerResultHtml: HTMLElement = computerResultElement.nativeElement;

    // Assert
    expect(computerResultHtml.innerHTML).toContain('L');
  });


});
