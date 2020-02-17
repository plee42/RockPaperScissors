import { Action } from '@ngrx/store';
import { IRoundResult } from 'src/app/interfaces/IRoundResults';

export enum EResultsActions {
    UpdateResults = '[Results] Get Results',
    RemoveResults = '[Results] Remove Results'
}

export class UpdateResults implements Action {
    readonly type = EResultsActions.UpdateResults;
    constructor(public payload: IRoundResult) {}
}

export class RemoveResults implements Action {
    readonly type = EResultsActions.RemoveResults;
}

export type ResultsActions = UpdateResults | RemoveResults;
