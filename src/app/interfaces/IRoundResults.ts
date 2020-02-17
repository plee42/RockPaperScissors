import { IMove } from '../interfaces/IMove';

export interface IRoundResult {
    roundNumber: number;
    playerChoice: IMove;
    computerChoice: IMove;
    winner: number;
}
