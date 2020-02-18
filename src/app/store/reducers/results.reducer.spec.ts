import { resultsReducer } from './results.reducer';
import { UpdateResults, RemoveResults } from '../actions/results.actions';
import { IMove } from 'src/app/interfaces/IMove';
import { RoundWinner } from 'src/app/enums/RoundWinner';
import { IRoundResult } from 'src/app/interfaces/IRoundResult';

describe('resultsReducer', () => {

    const roundNumber = 1;
    const playerScore = 2;
    const computerScore = 3;
    const playerChoice: IMove = { id: 1, name: '', image: '', beats: 2 };
    const computerChoice: IMove = { id: 2, name: '', image: '', beats: 3 };
    const winner = RoundWinner.USER;
    const firstResult: IRoundResult = { roundNumber, playerChoice, computerChoice, playerScore, computerScore, winner };

    const secondRoundNumber = 2;
    const secondPlayerScore = 4;
    const secondComputerScore = 5;
    const secondPlayerChoice: IMove = { id: 3, name: '', image: '', beats: 2 };
    const secondComputerChoice: IMove = { id: 1, name: '', image: '', beats: 3 };
    const secondWinner = RoundWinner.COMPUTER;
    const secondResult: IRoundResult = {
        roundNumber: secondRoundNumber,
        playerChoice : secondPlayerChoice,
        computerChoice: secondComputerChoice,
        playerScore: secondPlayerScore,
        computerScore: secondComputerScore,
        winner: secondWinner
    };

    it ('should return initial state', () => {
        // Act
        const result = resultsReducer([], new UpdateResults(firstResult));
        // Assert
        expect(result.length).toEqual(1);
        expect(result[0].computerChoice).toEqual(computerChoice);
        expect(result[0].playerChoice).toEqual(playerChoice);
        expect(result[0].computerScore).toEqual(computerScore);
        expect(result[0].playerScore).toEqual(playerScore);
        expect(result[0].roundNumber).toEqual(roundNumber);
        expect(result[0].winner).toEqual(winner);
    });

    it ('should return state and new results', () => {
        // Arrange
        const state = resultsReducer([], new UpdateResults(firstResult));

        // Act
        const result = resultsReducer(state, new UpdateResults(secondResult));
        // Assert
        expect(result.length).toEqual(2);
        expect(result[0].computerChoice).toEqual(computerChoice);
        expect(result[0].playerChoice).toEqual(playerChoice);
        expect(result[0].computerScore).toEqual(computerScore);
        expect(result[0].playerScore).toEqual(playerScore);
        expect(result[0].roundNumber).toEqual(roundNumber);
        expect(result[0].winner).toEqual(winner);
        expect(result[1].computerChoice).toEqual(secondComputerChoice);
        expect(result[1].playerChoice).toEqual(secondPlayerChoice);
        expect(result[1].computerScore).toEqual(secondComputerScore);
        expect(result[1].playerScore).toEqual(secondPlayerScore);
        expect(result[1].roundNumber).toEqual(secondRoundNumber);
        expect(result[1].winner).toEqual(secondWinner);
    });

    it ('should remove results', () => {
        // Arrange
        const state = resultsReducer([], new UpdateResults(firstResult));

        // Act
        const result = resultsReducer(state, new RemoveResults());
        // Assert
        expect(result.length).toEqual(0);
    });


});
