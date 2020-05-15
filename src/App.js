import React, { Component } from 'react'

import './App.css'
import Letter from './Letter'

const HIDDEN_CHAR = "_";
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const WORDS = `WORD TEST REACT GREAT SUPER`.trim().split(" ");

class App extends Component {
  state = this.generateInitialState()

  generateInitialState() {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)]
    const usedLetters = new Set()
    const display = computeDisplay(word, usedLetters)

    return { word, display, usedLetters, won: false }
  }

  handleLetter = letter => {
    let { word, display, usedLetters } = this.state
    usedLetters.add(letter)
    display = computeDisplay(word, usedLetters)
    const won = !display.includes(HIDDEN_CHAR)
    this.setState({ display, usedLetters, won })
  }

  render() {
    const { display, usedLetters, won } = this.state
    return (
      <div className={`hangman ${(won && "won") || ""}`}>
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
    this.setState(this.generateInitialState())
  }
}

export default App

function computeDisplay(word, usedLetters) {
  return word.replace(/\w/g, (letter) =>
    usedLetters.has(letter) ? letter : HIDDEN_CHAR
  );
}
