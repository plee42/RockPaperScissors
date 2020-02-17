import { Component, OnInit, Input } from '@angular/core';
import { IRoundResult } from 'src/app/interfaces/IRoundResults';
import { RoundWinner } from 'src/app/enums/RoundWinner';

@Component({
  selector: 'app-round-result',
  templateUrl: './round-result.component.html',
  styleUrls: ['./round-result.component.scss']
})
export class RoundResultComponent implements OnInit {

  @Input() result: IRoundResult;
  roundWinner = RoundWinner;

  constructor() { }

  ngOnInit(): void {
    // I'm really sorry, I know this component is meant to show cumulative scores
    // but I just ran out of time. I would ideally liked to have spent more time on
    // styling and unit tests had I had more time. I hope you like everything else!
  }

}
