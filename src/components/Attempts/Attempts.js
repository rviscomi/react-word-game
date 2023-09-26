import React from 'react';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

function Attempts({attempts}) {
  const results = Array(NUM_OF_GUESSES_ALLOWED).fill(0).map((_, i) => {
    if (i >= attempts.length) {
      return Array(5).fill({
        letter: ''
      });
    }

    return attempts[i];
  });
  
  return (
    <div className="guess-results">
      {results.map((guess, i) => (
        <p className="guess" key={i}>
          {guess.map((cell, j) => (
            <span className={`cell ${cell.status}`} key={`${i}x${j}`}>
              {cell.letter}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default Attempts;
