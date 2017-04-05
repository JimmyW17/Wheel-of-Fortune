var words = [
  ["C", "O", "M", "P"],
  ["A", "R", "R", "A", "Y"]
];



var randomword = words[Math.floor(Math.random() * words.length)];

var newword = new Array(randomword.length);

var money = 0;
var tries = 7;


for (var i = 0; i < newword.length; i++) {
  newword[i] = "_ ";
}

function printword() {
  for (var j = 0; j < newword.length; j++) {

    var wor = document.getElementById('word');
    var tuna = document.createTextNode(newword[j]);

    wor.appendChild(tuna);
    console.log(tuna);
  }



}


function checkletter() {

  var value = document.getElementById("guess").value;

  console.log(value);
  value = value.toUpperCase();
  status = false;
  for (var i = 0; i < newword.length; i++) {

    if (value === randomword[i]) {
      newword[i] = value + " ";
      status = true;
      money += 10;


    }

    document.getElementById("guess").value = "";
  }
  var ratefeld = document.getElementById("word");
  ratefeld.innerHTML = "";
  printword();

  if (!status) {

    var wrongletters = [];
    var wrong = document.getElementById('wrong');

    var hangman = document.getElementById("hangman");
    var text = document.createTextNode(" " + value);

    tries--;

    for (var j = 0; j < wrongletters.length; j++) {
      alert('test');
      if (wrongletters[j] == text) {
        alert('already there');
      }
      wrong.appendChild(text);
      wrongletters.push(text);
    }




  }
}
document.addEventListener("DOMContentLoaded", function() {
  printword();
});
