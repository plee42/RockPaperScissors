import { IMove } from '../interfaces/IMove';
import { MoveName } from '../enums/MoveName';

export class Rock implements IMove {
    readonly id = MoveName.ROCK;
    readonly name = 'Rock';
    readonly image = '/assets/rock.png';
    readonly beats = MoveName.SCISSORS;
}
