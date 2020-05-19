import React, { Component } from "react";

import "./App.css";
import Letter from "./Letter";
import Counter from "./Counter";

const HIDDEN_CHAR = "_";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const WORDS = `WORD TEST REACT GREAT SUPER`.trim().split(" ");

class App extends Component {
  state = this.generateInitialState();

  generateInitialState() {
    const usedLetters = new Set();
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const display = computeDisplay(word, usedLetters);
    const attempts = 0;

    return { usedLetters, word, display, attempts, won: false };
  }

  handleLetter = (letter) => {
    let { usedLetters, word, display, attempts } = this.state;
    if (!word.includes(letter)) {
      attempts = attempts + 1;
    }
    usedLetters.add(letter);
    display = computeDisplay(word, usedLetters);
    const won = !display.includes(HIDDEN_CHAR);
    this.setState({ usedLetters, display, attempts, won });
  };

  render() {
    const { usedLetters, display, attempts, won } = this.state;
    return (
      <div className={`hangman ${(won && "won") || ""}`}>
        <Counter attempts={attempts} />
        <p className="display">{display}</p>
        <p className="letters">
          {won ? (
            <button className="replay" onClick={() => this.reset()}>
              New Game
            </button>
          ) : (
            ALPHABET.map((letter) => (
              <Letter
                key={letter}
                letter={letter}
                usedLetters={usedLetters}
                onClick={this.handleLetter}
              />
            ))
          )}
        </p>
      </div>
    );
  }

  reset() {
    this.setState(this.generateInitialState());
  }
}

export default App;

function computeDisplay(word, usedLetters) {
  return word.replace(/\w/g, (letter) =>
    usedLetters.has(letter) ? letter : HIDDEN_CHAR
  );
}
