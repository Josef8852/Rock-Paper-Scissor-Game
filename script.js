'use strict';

let rules = document.querySelector('.rules');

let modal = document.querySelector('.modal');

let overlay = document.querySelector('.overlay');

let icon = document.querySelector('.icon');

let choosen = document.querySelectorAll('.state');

let winner = document.querySelector('.winner');

let landing = document.querySelector('.landing');

let result = document.querySelector('.result');

let winnerText = document.querySelector('.winnerText');

let pc = document.querySelector('.pc');

let animation = document.querySelector('.animation');

let myScore = document.querySelector('.score');

let playAgain = document.querySelector('.again');
/* Modal window */

let showModal = () => {
  modal.classList.add('show-block');
  overlay.classList.add('show-block');
}

let closeModal = () => {
  modal.classList.remove('show-block');
  overlay.classList.remove('show-block');
}

rules.addEventListener('click', showModal);

icon.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);


let picks = [], played = false, score = 0;

let pcPick = () => {
  let randomPick = Math.floor(Math.random() * (4 - 1) + 1);

  let type;

  if (randomPick === 1) {
    type = 'paper';
  }
  else if (randomPick === 2) {
    type = 'scissor';
  }
  else {
    type = 'rock';
  }

  picks.push(type);

  let HTML = `

  <div class="box">
    <p>PC PICKED</p>
  <img src="images/${randomPick}.svg" alt="" class="${type} finalState">
  </div>
  
  `

  setTimeout(() => {

    animation.style.display = 'none';

    pc.insertAdjacentHTML('afterbegin', HTML);



  }, 3000);


  setTimeout(() => {
    result.style.display = 'block';
  }, 4000);

  determineWinner();

}





let getWinner = (type) => {
  let HTMl = `
  <div class="player">
  <p>YOU PICKED</p>
  <img src="images/${type}.svg" alt="" class="${type} finalState">
  </div>
  `

  picks.push(type);

  landing.style.display = 'none';

  winner.style.display = 'flex';

  result.style.display = 'none';


  winner.insertAdjacentHTML('afterbegin', HTMl);


  pcPick();
}


choosen.forEach((element) => {


  element.addEventListener('click', () => {

    getWinner(element.classList[0]);

    if (played) {
      animation.style.display = 'block';
    }
    played = true;

  });

});


let possibilities = [
  /* draws */
  ['paper', 'paper', 'draw'],
  ['scissor', 'scissor', 'draw'],
  ['rock', 'rock', 'draw'],

  /* wins */

  ['paper', 'rock', 'win'],
  ['scissor', 'paper', 'win'],
  ['rock', 'scissor', 'win'],

  /* lose */

  ['rock', 'paper', 'lose'],
  ['paper', 'scissor', 'lose'],
  ['scissor', 'rock', 'lose'],


];

let determineWinner = () => {

  let text;

  for (let i = 0; i < possibilities.length; i++) {
    const [me, pc, state] = possibilities[i];
    if (picks[0] === me && picks[1] === pc) {
      text = state;
      break;
    }
  }

  if (text === 'win') {
    winnerText.textContent = 'YOU WIN';
    score++;
  }
  else if (text === 'lose') {
    winnerText.textContent = 'YOU LOST';
    score--;
  }
  else {
    winnerText.textContent = "IT'S A DRAW";
  }

  setTimeout(() => {
    myScore.textContent = score;
  }, 5000);
}



/* play again */

playAgain.addEventListener('click', () => {
  winner.style.display = 'none';
  landing.style.display = 'flex';

  winner.removeChild(winner.firstElementChild);
  pc.removeChild(pc.firstElementChild);
  picks = [];
});





