'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const New = document.querySelector('.btn--new');
const Roll = document.querySelector('.btn--roll');
const Hold = document.querySelector('.btn--hold');
const currentP1 = document.getElementById('current--0');
const currentP2 = document.getElementById('current--1');
const activeP1 = document.querySelector('.player--0');
const activeP2 = document.querySelector('.player--1');
let currentS;
let activePlayer;
let playing;
let scores;

const init = function () {
  currentS = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentP1.textContent = 0;
  currentP2.textContent = 0;
  activeP1.classList.remove('player--winner');
  activeP2.classList.remove('player--winner');
  activeP2.classList.remove('player--active');
};
init();
//rolling dice

const switchP = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentS = 0;
  activeP1.classList.toggle('player--active');
  activeP2.classList.toggle('player--active');
};

Roll.addEventListener('click', function () {
  if (playing) {
    const rNumb = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${rNumb}.png`;
    if (rNumb !== 1) {
      currentS = currentS + rNumb;
      // currentP1.textContent = currentS;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentS;
    } else {
      switchP();
    }
  }
});

Hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentS;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchP();
    }
  }
});

New.addEventListener('click', function () {
  init();
});
