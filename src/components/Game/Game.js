import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

import Attempts from '../Attempts/Attempts';
import Guess from '../Guess/Guess';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const GameStatus = {
  PLAYING: 0,
  WON: 1,
  LOST: 2
}

function Game() {
  const [attempts, setAttempts] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState(GameStatus.PLAYING);

  function setAttempt(guess) {
    const attempt = checkGuess(guess, answer);
    const nextAttempts = [...attempts, attempt];
    setAttempts(nextAttempts);
    if (attempt.every(letter => letter.status == 'correct')) {
      setGameStatus(GameStatus.WON);
    } else if (nextAttempts.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus(GameStatus.LOST);
    }
  }

  function renderBanner() {
    if (gameStatus == GameStatus.WON) {
      return (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong>3 guesses</strong>.
          </p>
        </div>
      );
    }

    if (gameStatus == GameStatus.LOST) {
      return (
        <div className="sad banner">
          <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
        </div>
      );
    }
  }

  function isGameOver() {
    return gameStatus != GameStatus.PLAYING;
  }

  return <>
    {renderBanner()}
    <Attempts attempts={attempts} />
    <Guess setAttempt={setAttempt} isGameOver={isGameOver} />
  </>;
}

export default Game;
