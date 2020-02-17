import { ResultsActions, EResultsActions } from '../actions/results.actions';
import { IRoundResult } from 'src/app/interfaces/IRoundResults';

export function resultsReducer(
    state: Array<IRoundResult> = [],
    action: ResultsActions
): Array<IRoundResult> {
    switch (action.type) {
        case EResultsActions.UpdateResults: {
            return [
                ...state,
                Object.assign({}, {
                    roundNumber: action.payload.roundNumber,
                    playerChoice: action.payload.playerChoice,
                    computerChoice: action.payload.computerChoice,
                    winner: action.payload.winner
                })
            ];
        }
        case EResultsActions.RemoveResults: {
            return [];
        }
        default:
            return state;
    }
}
