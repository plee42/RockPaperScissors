import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { IMove } from '../interfaces/IMove';
import { Rock } from '../models/Rock';
import { Paper } from '../models/Paper';
import { Scissors } from '../models/Scissors';
import { MoveName } from '../enums/MoveName';
import { IRoundResult } from '../interfaces/IRoundResults';
import { EResultsActions } from '../store/actions/results.actions';
import { RoundWinner } from '../enums/RoundWinner';
import { AppState } from '../store/state/app.state';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  playerMove: IMove;
  computerMove: IMove;
  moveList = new Array<IMove>();
  roundNumber = 1;
  roundResult: IRoundResult;
  roundPlayerWinner: number;
  roundMoveWinner: number;
  private storeSubscription: any;
  name = 'Player One';
  results: IRoundResult[];

  constructor(private title: Title, private router: Router, private store: Store<AppState>,
              private userService: UserService) {
    this.title.setTitle('Game');
  }

  ngOnInit(): void {
    this.setUpUserChoices();
    this.subscribeToStore();
    this.subscribeToName();
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  playerScore(playerType: number): number {
    let score = 0;
    this.results.forEach( result => {
      if (result.winner === playerType) {
        score += 1;
      }
    });

    return score;
  }

  setUpUserChoices(): void {
    this.moveList.push(new Rock(), new Paper(), new Scissors());
  }

  subscribeToStore(): void {
    this.storeSubscription = this.store
    .select('results')
    .subscribe(results => {
      this.results = results;
    });
  }

  subscribeToName(): void {
    this.userService.getUser().subscribe( name => {
      this.name = name ? name : 'Player One';
    });
  }

  takeTurn(move: IMove): void {
    this.playerMove = move;
    this.playerMove.selected = true;
    this.calculateComputerMove();
    this.determineRoundWinner();
    this.createRoundResult();
    this.updateResults();
    if (this.roundNumber === 10) {
      this.router.navigate(['/results']);
    }
    this.roundNumber += 1;
  }

  isWinner(move: IMove, playerId: number): boolean {
    if (!move) {
      return false;
    }
    return this.roundMoveWinner === move.id &&
    this.roundPlayerWinner === playerId;
  }

  isUserLoserMove(move: IMove): boolean {
    if (!move || !this.playerMove) {
      return false;
    }
    if (this.roundPlayerWinner === RoundWinner.DRAW || this.roundPlayerWinner === RoundWinner.USER) {
      return false;
    }
    if (this.playerMove.id === move.id) {
      return true;
    }
    return false;
  }

  isComputerLoserMove(move: IMove): boolean {
    if (!move || !this.computerMove) {
      return false;
    }
    if (this.roundPlayerWinner === RoundWinner.DRAW || this.roundPlayerWinner === RoundWinner.COMPUTER) {
      return false;
    }
    if (this.computerMove.id === move.id) {
      return true;
    }

    return false;
  }

  isDraw(move: IMove): boolean {
    if (!move) {
      return false;
    }
    return this.roundPlayerWinner === RoundWinner.DRAW && this.roundMoveWinner === move.id;
  }

  private determineRoundWinner(): void {
    if (this.playerMove.beats === this.computerMove.id) {
      this.roundPlayerWinner = RoundWinner.USER;
      this.roundMoveWinner = this.playerMove.id;
    } else if (this.computerMove.beats === this.playerMove.id) {
      this.roundPlayerWinner = RoundWinner.COMPUTER;
      this.roundMoveWinner = this.computerMove.id;
    } else {
      this.roundPlayerWinner = RoundWinner.DRAW;
      this.roundMoveWinner = this.playerMove.id;
    }
  }

  private createRoundResult() {
    this.roundResult = {
      roundNumber: this.roundNumber,
      playerChoice: this.playerMove,
      computerChoice: this.computerMove,
      winner: this.roundPlayerWinner
    };
  }

  updateResults(): void {
    this.store.dispatch({ type: EResultsActions.UpdateResults, payload: this.roundResult });
  }

  calculateComputerMove(): void {
    const randomNumber = Math.floor((Math.random() * 3) + 1);
    switch (randomNumber) {
      case MoveName.ROCK:
        this.computerMove = new Rock();
        break;
      case MoveName.PAPER:
        this.computerMove = new Paper();
        break;
      case MoveName.SCISSORS:
        this.computerMove = new Scissors();
        break;
    }
  }

}
