import { IMove } from './IMove';

export interface IRoundResult {
    roundNumber: number;
    playerChoice: IMove;
    computerChoice: IMove;
    winner: number;
    playerScore: number;
    computerScore: number;
}
