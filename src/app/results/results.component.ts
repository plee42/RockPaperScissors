import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRoundResult } from '../interfaces/IRoundResult';
import { AppState } from '../store/state/app.state';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { EResultsActions } from '../store/actions/results.actions';
import { RoundWinner } from '../enums/RoundWinner';
import { DEFAULT_PLAYER_NAME } from '../constants/app.constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  results: IRoundResult[];
  private storeSubscription: any;
  playerScore = 0;
  computerScore = 0;
  name = DEFAULT_PLAYER_NAME;
  winner = 0;
  roundWinner = RoundWinner;

  constructor(private store: Store<AppState>, private router: Router,
              private userService: UserService, private title: Title) {
                title.setTitle('Results');
              }

  ngOnInit(): void {
    this.subscribeToStore();
    this.subscribeToName();
    this.calculateScores();
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  subscribeToStore(): void {
    this.storeSubscription = this.store
      .select('results')
      .subscribe( results => {
        this.results = results;
      });
  }

  subscribeToName(): void {
    this.userService.getUser().subscribe( name => {
      this.name = name ? name : DEFAULT_PLAYER_NAME;
    });
  }

  calculateScores(): void {
    if (this.results) {
      const finalRound = this.results[this.results.length - 1];
      this.playerScore = finalRound.playerScore;
      this.computerScore = finalRound.computerScore;

      if (this.playerScore > this.computerScore) {
        this.winner = RoundWinner.USER;
      } else if (this.computerScore > this.playerScore) {
        this.winner = RoundWinner.COMPUTER;
      } else {
        this.winner = RoundWinner.DRAW;
      }
    }
  }

  returnToWelcome(): void {
    this.store.dispatch({ type: EResultsActions.RemoveResults});
    this.userService.setUser('');
    this.router.navigate(['/welcome']);
  }

}
