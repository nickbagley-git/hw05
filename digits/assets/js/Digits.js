import React, { useState, useEffect } from 'react';


import {ch_join, ch_push } from './socket';

// 4digits app to run in browser
function Digits() {
  const [state, setState] = useState({
    guesses: [],
    hints: [],
    guess: "",
  });
  let {isWin, guesses, hints, guess} = state;

useEffect(() => {
  console.log("state is", state)
  ch_join(setState);
}, []);

// resets the game with a new number and empty guesses
function resetGame() {
  ch_join(setState);
}

// updates the current guess based on the key pressed
function updateGuess(ev) {
  let text = ev.target.value;

  if (text.length >= 4) {
    text = text.substring(0, 4);
  }
  let guess = text;
  let state1 = Object.assign({}, state, {guess});
  setState(state1);
}

// submits a guess if the guess is valid, otherwise shows an alert
function makeGuess() {
  ch_push(guess);
}

// handles keypresses so that hitting enter makes a guess and backspace deletes
function keyPress(ev) {
  // based off of the react-intro notes
  if (ev.key === "Enter") {
    makeGuess();
  }
}

// check to see if the player has won the game
if (isWin) {
  return (
    <div className="App">
      <h1>4Digits</h1>
      <h2>You Win!</h2>

      <table>
        <tr>
          <td>1.</td>
          <td>{guesses[0]}</td>
          <td>{hints[0]}</td>
        </tr>
        <tr>
          <td>2.</td>
          <td>{guesses[1]}</td>
          <td>{hints[1]}</td>
        </tr>
        <tr>
          <td>3.</td>
          <td>{guesses[2]}</td>
          <td>{hints[2]}</td>
        </tr>
        <tr>
          <td>4.</td>
          <td>{guesses[3]}</td>
          <td>{hints[3]}</td>
        </tr>
        <tr>
          <td>5.</td>
          <td>{guesses[4]}</td>
          <td>{hints[4]}</td>
        </tr>
        <tr>
          <td>6.</td>
          <td>{guesses[5]}</td>
          <td>{hints[5]}</td>
        </tr>
        <tr>
          <td>7.</td>
          <td>{guesses[6]}</td>
          <td>{hints[6]}</td>
        </tr>
        <tr>
          <td>8.</td>
          <td>{guesses[7]}</td>
          <td>{hints[7]}</td>
        </tr>
      </table>

      <p>
        <button onClick={resetGame}>
          New Game
        </button>
      </p>
    </div>
  );
}

// check to see if the player has run out of guesses
if (guesses.length === 8) {
  return (
    <div className="App">
      <h1>Game Over</h1>

      <table>
        <tr>
          <td>1.</td>
          <td>{guesses[0]}</td>
          <td>{hints[0]}</td>
        </tr>
        <tr>
          <td>2.</td>
          <td>{guesses[1]}</td>
          <td>{hints[1]}</td>
        </tr>
        <tr>
          <td>3.</td>
          <td>{guesses[2]}</td>
          <td>{hints[2]}</td>
        </tr>
        <tr>
          <td>4.</td>
          <td>{guesses[3]}</td>
          <td>{hints[3]}</td>
        </tr>
        <tr>
          <td>5.</td>
          <td>{guesses[4]}</td>
          <td>{hints[4]}</td>
        </tr>
        <tr>
          <td>6.</td>
          <td>{guesses[5]}</td>
          <td>{hints[5]}</td>
        </tr>
        <tr>
          <td>7.</td>
          <td>{guesses[6]}</td>
          <td>{hints[6]}</td>
        </tr>
        <tr>
          <td>8.</td>
          <td>{guesses[7]}</td>
          <td>{hints[7]}</td>
        </tr>
      </table>

      <p>
        <button onClick={resetGame}>
          New Game
        </button>
      </p>
    </div>
  );
}

// renders when the game is ongoing without an end condition
return (
  <div className="App">
    <h1>4Digits</h1>
    <p>
      <input type="number"
             value={guess}
             onChange={updateGuess}
             onKeyPress={keyPress} />

      <button onClick={makeGuess}>
        Make guess
      </button>
    </p>
    <table>
      <tr>
        <td>1.</td>
        <td>{guesses[0]}</td>
        <td>{hints[0]}</td>
      </tr>
      <tr>
        <td>2.</td>
        <td>{guesses[1]}</td>
        <td>{hints[1]}</td>
      </tr>
      <tr>
        <td>3.</td>
        <td>{guesses[2]}</td>
        <td>{hints[2]}</td>
      </tr>
      <tr>
        <td>4.</td>
        <td>{guesses[3]}</td>
        <td>{hints[3]}</td>
      </tr>
      <tr>
        <td>5.</td>
        <td>{guesses[4]}</td>
        <td>{hints[4]}</td>
      </tr>
      <tr>
        <td>6.</td>
        <td>{guesses[5]}</td>
        <td>{hints[5]}</td>
      </tr>
      <tr>
        <td>7.</td>
        <td>{guesses[6]}</td>
        <td>{hints[6]}</td>
      </tr>
      <tr>
        <td>8.</td>
        <td>{guesses[7]}</td>
        <td>{hints[7]}</td>
      </tr>
    </table>

    <p>
      <button onClick={resetGame}>
        New Game
      </button>
    </p>
  </div>
);
}

export default Digits;
