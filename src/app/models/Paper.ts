import { IMove } from '../interfaces/IMove';
import { MoveName } from '../enums/MoveName';

export class Paper implements IMove {
    readonly id = MoveName.PAPER;
    readonly name = 'Paper';
    readonly image = '/assets/paper.png';
    readonly beats = MoveName.ROCK;
}
