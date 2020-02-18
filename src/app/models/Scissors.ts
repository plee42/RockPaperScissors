import { IMove } from '../interfaces/IMove';
import { MoveName } from '../enums/MoveName';

export class Scissors implements IMove {
    readonly id = MoveName.SCISSORS;
    readonly name = 'Scissors';
    readonly image = '/assets/scissors.png';
    readonly beats = MoveName.PAPER;
}
