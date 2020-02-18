import { Component, OnInit, Input } from '@angular/core';
import { IRoundResult } from 'src/app/interfaces/IRoundResult';
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
  }

}
