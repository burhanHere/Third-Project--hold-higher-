"use strict";

const rollDiceBtn = document.querySelector(`.btn--roll`);
const holdBtn = document.querySelector(`.btn--hold`);
const newGameBtn = document.querySelector(`.btn--new`);
const score0 = document.querySelector(`#score--0`);
let score0Data = Number(0);
const score1 = document.querySelector(`#score--1`);
let score1Data = Number(0);
const currentScore0 = document.querySelector(`#current--0`);
let currentScore0Data = Number(0);
const currentScore1 = document.querySelector(`#current--1`);
let currentScore1Data = Number(0);
const diceImg = document.querySelector(`.dice`);
const playerSection0 = document.querySelector(`.player--0`);
const playerSection1 = document.querySelector(`.player--1`);
let playerSection0Active = () =>
  playerSection0.classList.contains(`player--active`);

function resetAll() {
  diceImg.src = `./dice-5.png`;
  playerSection0.classList.add(`player--active`);
  playerSection1.classList.remove(`player--active`);
  currentScore0.textContent = 0;
  currentScore0Data = 0;
  currentScore1.textContent = 0;
  currentScore1Data = 0;
  score0.style.fontSize = `4rem`;
  score0.style.color = `#c7365f`;
  score0.textContent = 0;
  score1.style.fontSize = `4rem`;
  score1.style.color = `#c7365f`;
  score1.textContent = 0;
  score0.textContent = score0Data = 0;
  score1.textContent = score1Data = 0;
  rollDiceBtn.disabled = false;
  rollDiceBtn.style.backgroundColor = `rgba(255, 255, 255, 0.6)`;
  holdBtn.disabled = false;
  holdBtn.style.backgroundColor = `rgba(255, 255, 255, 0.6)`;
}

function switchPlayerControl() {
  if (playerSection0Active()) {
    playerSection0.classList.remove(`player--active`);
    currentScore0.textContent = 0;
    currentScore0Data = 0;
    playerSection1.classList.add(`player--active`);
  } else {
    playerSection1.classList.remove(`player--active`);
    currentScore1.textContent = 0;
    currentScore1Data = 0;
    playerSection0.classList.add(`player--active`);
  }
}

function addDisplayDiceScore(diceRoll) {
  if (playerSection0Active()) {
    currentScore0Data += Number(diceRoll);
    currentScore0.textContent = currentScore0Data;
  } else {
    currentScore1Data += Number(diceRoll);
    currentScore1.textContent = currentScore1Data;
  }
}

function processCurrentScore() {
  let diceRoll = Number((Math.random() * 5).toFixed(0)) + 1;
  diceImg.src = `./dice-${diceRoll}.png`;
  if (diceRoll === 1) {
    switchPlayerControl();
  } else {
    addDisplayDiceScore(diceRoll);
  }
}

function checkWin() {
  if (score0Data >= 100) {
    score0.style.fontSize = `2.5rem`;
    score0.style.color = `rgba(255, 255, 255, 0.6)`;
    score0.textContent = `🎉 🎊 Player1 Won 🎉 🎊 Score:${score0Data}`;
    return true;
  } else if (score1Data >= 100) {
    score1.style.fontSize = `2.5rem`;
    score1.style.color = `rgba(255, 255, 255, 0.6)`;
    score1.textContent = `🎉 🎊 Player2 Won 🎉 🎊 Score:${score1Data}`;
    return true;
  }
  return false;
}

function freezButton() {
  rollDiceBtn.disabled = true;
  rollDiceBtn.style.backgroundColor = `#c7365f`;
  holdBtn.disabled = true;
  holdBtn.style.backgroundColor = `#c7365f`;
}

function holdScore() {
  if (playerSection0Active()) {
    score0Data += currentScore0Data;
    score0.textContent = score0Data;
    if (checkWin()) {
      freezButton();
    }
    switchPlayerControl();
  } else {
    score1Data += currentScore1Data;
    score1.textContent = score1Data;
    if (checkWin()) {
      freezButton();
    }
    switchPlayerControl();
  }
}
////////////////
// main logic //
////////////////
newGameBtn.addEventListener(`click`, resetAll);
rollDiceBtn.addEventListener(`click`, processCurrentScore);
holdBtn.addEventListener(`click`, holdScore);
