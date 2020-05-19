import React, { Component } from "react";

import "./App.css";
import Letter from "./Letter";
import Counter from "./Counter";

const LIMIT = 6;
const HIDDEN_CHAR = "_";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const WORDS = `REACT COMPONENT JEST CHAI ENZYME SNAPSHOT`.trim().split(" ");

class App extends Component {
  state = this.generateInitialState();

  generateInitialState() {
    const usedLetters = new Set();
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const display = computeDisplay(word, usedLetters);
    const attempts = 0;

    return { usedLetters, word, display, attempts, hanged: false, won: false };
  }

  handleLetter = (letter) => {
    let { usedLetters, word, display, attempts } = this.state;
    if (!word.includes(letter)) {
      attempts = attempts + 1;
    }
    usedLetters.add(letter);
    display = computeDisplay(word, usedLetters);
    const won = !display.includes(HIDDEN_CHAR);
    const hanged = attempts >= LIMIT;
    this.setState({ usedLetters, display, attempts, hanged, won });
  };

  handleKeyPress = (event) => {
    this.handleLetter(event.key.toUpperCase());
  };

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  render() {
    const { usedLetters, display, attempts, hanged, won } = this.state;
    return (
      <div
        className={`hangman ${(hanged && "hanged") || ""} ${
          (won && "won") || ""
        }`}
      >
        <Counter attempts={attempts} />
        <p className="display">{display}</p>
        <p className="letters">
          {hanged ? (
            <button className="retry" onClick={() => this.reset()}>
              Retry
            </button>
          ) : (
            [
              won ? (
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
              ),
            ]
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
