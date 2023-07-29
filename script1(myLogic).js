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

function deavtivatePlayerSections(selection) {
  if (selection == `l` || selection == `L`) {
    playerSection0.classList.remove(`player--active`);
  } else if (selection == `r` || selection == `R`) {
    playerSection0.classList.remove(`player--active`);
  } else {
    playerSection0.classList.remove(`player--active`);
    playerSection1.classList.remove(`player--active`);
  }
}

function checkWin() {
  if (score0Data > score1Data) {
    score0.style.fontSize = `2.5rem`;
    score0.textContent = `🎉 🎊 Player1 Won 🎉 🎊 Score:${score0Data}`;
    deavtivatePlayerSections(`r`);
  } else if (score1Data > score0Data) {
    score1.style.fontSize = `2.5rem`;
    score1.textContent = `🎉 🎊 Player2 Won 🎉 🎊 Score:${score1Data}`;
    deavtivatePlayerSections(`l`);
  } else {
    score0.textContent = `Its a tie`;
    score1.textContent = `Its a tie`;
    deavtivatePlayerSections();
  }
}

function processScore() {
  let tempScoreDiceRolled = Number(Math.random() * 5 + 1).toFixed(0);
  while (tempScoreDiceRolled == 1 && score0Data == 0 && score1Data == 0) {
    tempScoreDiceRolled = Number(Math.random() * 5 + 1).toFixed(0);
  }
  if (tempScoreDiceRolled == 1) {
    /*for testing*/ console.log(tempScoreDiceRolled);
    rollDiceBtn.disabled = true;
    rollDiceBtn.style.backgroundColor = `#c7365f`;
    holdBtn.disabled = true;
    holdBtn.style.backgroundColor = `#c7365f`;
    diceImg.src = `./dice-${tempScoreDiceRolled}.png`;
    checkWin();
  } else {
    /*for testing*/ console.log(tempScoreDiceRolled);
    diceImg.src = `./dice-${tempScoreDiceRolled}.png`;
    if (playerSection0.classList.contains(`player--active`)) {
      currentScore0Data += Number(tempScoreDiceRolled);
      currentScore0.textContent = currentScore0Data;
    } else {
      currentScore1Data += Number(tempScoreDiceRolled);
      currentScore1.textContent = currentScore1Data;
    }
  }
}

function holdAndPass() {
  if (playerSection0.classList.contains(`player--active`)) {
    score0Data += currentScore0Data;
    score0.textContent = score0Data;
    currentScore0.textContent = 0;
    currentScore0Data = Number(0);
    playerSection0.classList.remove(`player--active`);
    playerSection1.classList.add(`player--active`);
  } else {
    score1Data += currentScore1Data;
    score1.textContent = score1Data;
    currentScore1.textContent = 0;
    currentScore1Data = Number(0);
    playerSection1.classList.remove(`player--active`);
    playerSection0.classList.add(`player--active`);
  }
}

function resetAll() {
  score0Data = 0;
  score0.textContent = 0;
  score1Data = 0;
  score1.textContent = 0;
  currentScore0Data = 0;
  currentScore0.textContent = 0;
  currentScore1Data = 0;
  currentScore1.textContent = 0;
  if (score0.classList.contains(`reduceFintSize`)) {
    score0.classList.remove(`reduceFintSize`);
  }
  if (score1.classList.contains(`reduceFintSize`)) {
    score1.classList.remove(`reduceFintSize`);
  }
  rollDiceBtn.disabled = false;
  rollDiceBtn.style.backgroundColor = `rgba(255, 255, 255, 0.6)`;
  holdBtn.disabled = false;
  holdBtn.style.backgroundColor = `rgba(255, 255, 255, 0.6)`;
  playerSection0.classList.add(`player--active`);
  //for testing
  let temp = Number(Math.random() * 5 + 1).toFixed(0);
  console.log(temp);
  diceImg.src = `./dice-${temp}.png`;
}
/////////////////////
// main logic here //
/////////////////////

rollDiceBtn.addEventListener(`click`, processScore);
holdBtn.addEventListener(`click`, holdAndPass);
newGameBtn.addEventListener(`click`, resetAll);
