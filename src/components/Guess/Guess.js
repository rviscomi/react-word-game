import React from 'react';

function Guess({setAttempt, isGameOver}) {
  const [guess, setGuess] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setGuess('');
    setAttempt(guess);
  }

  return (
  <form className="guess-input-wrapper" onSubmit={handleSubmit}>
    <label htmlFor="guess-input">Enter guess:</label>
    <input id="guess-input" type="text"
      value={guess}
      onChange={event => {
        setGuess(event.target.value.toUpperCase());
      }}
      pattern="\w{5}"
      maxLength="5"
      disabled={isGameOver()} />
  </form>
  );
}

export default Guess;
