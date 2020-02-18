import { ResultsActions, EResultsActions } from '../actions/results.actions';
import { IRoundResult } from 'src/app/interfaces/IRoundResult';

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
                    winner: action.payload.winner,
                    playerScore: action.payload.playerScore,
                    computerScore: action.payload.computerScore
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
