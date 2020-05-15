import React from 'react'

const Letter = ({ letter, usedLetters, onClick }) => (
  <button
    disabled={usedLetters.has(letter)}
    onClick={() => onClick(letter)}
  >
    {letter}
  </button>
);

export default Letter
