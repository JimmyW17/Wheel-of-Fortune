var board = document.getElementById('board');
var guessForm = document.getElementById('guessForm');
var word_bank_display = document.getElementById('wordBank');
var wheel = document.getElementById('wheel');
var spinButton = document.getElementById('spinButton');
var word_arr = ['Hello World', 'I stole my css', 'How to make an actual wheel', 'I google all my answers'];
var word_bank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var winnings = document.getElementById('winnings');
var reloadButton = document.getElementById('reloadButton');
var letterInputField = document.getElementById('letterInput');
var wheel_container = document.getElementById('wheel_container');
var word_bank_div = document.getElementById('word_bank_div');
var solveForm = document.getElementById('solveForm');

var currentWord = word_arr[Math.floor(Math.random()*word_arr.length)].toUpperCase();

var hidden = [];

function toHidden() {
  var wordLen = currentWord.length;
  for(x = 0; x < wordLen; x++) {
    hidden[x] = '_';
  }
  console.log(hidden);
  return hidden.join('');
}

var hiddenWordBank = [];

function hideWordBank() {
  var wordLen = word_bank.length;
  for(x = 0; x < wordLen; x++) {
    hiddenWordBank[x] = '_';
  }
  console.log(hiddenWordBank.join(''));
  return hiddenWordBank.join('');
}

window.onload = function() {
  board.innerHTML = toHidden();
  guessLetter(' ');
  word_bank_display.innerHTML = hideWordBank();
};

var totalEarned = 0;
function guessLetter(letterInput) {
  var earnedThisWord = 0;
  for(x=0; x<currentWord.length; x++) {
    if(currentWord[x] === letterInput) {
      hidden[x] = letterInput;
      earnedThisWord += spin;
    }
  }

  for(y=0; y<word_bank.length; y++) {
    if(word_bank[y] == letterInput) {
      if(hiddenWordBank[y] == word_bank[y]){
        earnedThisWord = 0;
        guessLetter(letterInput);
        break;
      } else {
        hiddenWordBank[y] = letterInput;
      }
    }
  }

  totalEarned += earnedThisWord;
  winnings.innerHTML = totalEarned;

  board.innerHTML = hidden.join('');
  word_bank_display.innerHTML = hiddenWordBank.join('');
  var hasRemaining = false;
  console.log(hidden);
  for(z=0; z<hidden.length; z++) {
    if(hidden[z] == '_') {
      hasRemaining = true;
    }
  }
  if(hasRemaining === false) {
    var my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src','confetti.js');
    document.body.appendChild(my_awesome_script);
    word_bank_div.style.visibility = 'hidden';
    wheel_container.style.visibility = 'hidden';
    spinButton.style.display = 'none';
    reloadButton.style.display = 'block';
  }
}

guessForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var letterInput = document.getElementById('letterInput').value.toUpperCase();
  guessLetter(letterInput);
  this.reset();
  guessForm.style.visibility = 'hidden';
  spinButton.style.visibility = 'visible';
});

var spin = 0;
spinButton.addEventListener('click', function() {
  var spinStop = document.getElementsByClassName('spinStop');
  var randomSpin = spinStop[Math.floor(Math.random()*spinStop.length)];
  for(x=0; x<spinStop.length; x++) {
    spinStop[x].style.backgroundColor = 'transparent';
  }
  if(randomSpin.innerHTML.substring(1,2) == 'B') {
    spin = 0;
    winnings.innerHTML = 0;
    totalEarned = 0;
  } else {
    spin = parseInt(randomSpin.innerHTML.substring(1));
    guessForm.style.visibility = 'visible';
    letterInputField.focus();
    spinButton.style.visibility = 'hidden';
  }
  randomSpin.style.backgroundColor = 'yellow';
  console.log(randomSpin.innerHTML.substring(1,2));
});

solveForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var solveInput = document.getElementById('solveInput').value.toUpperCase();
  if(solveInput == currentWord) {
    board.innerHTML = solveInput;
    if(totalEarned < 1000) {
      winnings.innerHTML = 1000;
      var my_awesome_script = document.createElement('script');
      my_awesome_script.setAttribute('src','confetti.js');
      document.body.appendChild(my_awesome_script);
      word_bank_div.style.visibility = 'hidden';
      wheel_container.style.visibility = 'hidden';
      spinButton.style.display = 'none';
      reloadButton.style.display = 'block';
    }
  }
});

reloadButton.addEventListener('click', function() {
  location.reload();
});
