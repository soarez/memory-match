(function(){

var view = window.View = {};

var newGameButton;
var startGameButton;
var timer;
var minutes;
var seconds;
var milliseconds;
var game;
var link;

view.initialize =
function initialize() {

  var header = document.createElement('h1');
  header.innerHTML = 'Jogo da Memória ("Memory match")';
  document.body.appendChild(header);

  newGameButton = document.createElement('button');
  newGameButton.className = 'newGameButton';
  newGameButton.innerHTML = 'Novo Jogo';
  newGameButton.addEventListener('click', newGameClicked);
  document.body.appendChild(newGameButton);

  game = document.createElement('div');
  hide(game);
  document.body.appendChild(game);
};

view.hide = hide;
function hide(element) {
  element.style.display = 'none';
}

view.show = show;
function show(element) {
  element.style.display = 'initial';
}

view.fadeout = fadeout;
function fadeout(element) {
  var s = element.style;
  s.opacity = 1;
  (function fade(){
    s.opacity-=.1;

    if (s.opacity < 0)
      s.display= 'none';
    else
      setTimeout(fade, 40);
  })();
}

function newGameClicked() {
  hide(newGameButton);
  view.newGame();
}

function startGameClicked() {
  hide(startGameButton);
  show(timer);
  view.startGame();
}

view.allowStartGame =
function allowStartGame(badges, rows, columns) {
  startGameButton = document.createElement('button');
  startGameButton.className = 'startGameButton';
  startGameButton.innerHTML = 'Iniciar Jogo';
  startGameButton.addEventListener('click', startGameClicked);
  game.appendChild(startGameButton);

  timer = document.createElement('div');
  timer.className = 'timer';
  minutes = document.createElement('span');
  minutes.className = 'minutes';
  timer.appendChild(minutes);
  timer.appendChild(document.createTextNode(':'));
  seconds = document.createElement('span');
  seconds.className = 'seconds';
  timer.appendChild(seconds);
  timer.appendChild(document.createTextNode(':'));
  milliseconds = document.createElement('span');
  milliseconds.className = 'milliseconds';
  timer.appendChild(milliseconds);
  hide(timer);
  game.appendChild(timer);

  link = document.createElement('a');
  link.innerHTML = 'link para partilhar o tempo do jogo no twitter';
  link.className = 'link';
  hide(link);
  game.appendChild(link);

  var table = document.createElement('table');
  var tr, td;
  var c, r;
  for (r = 0; r < rows; ++r) {
    tr = document.createElement('tr');
    for (c = 0; c < columns; ++c) {
      td = document.createElement('td');
      td.appendChild(badges[r+c*rows]);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  game.appendChild(table);

  show(game);
};

function pad(count, what) {
  var s = '000' + what;
  return s.substring(s.length - count);
}

view.setTime =
function setTime(time) {
  minutes.innerHTML = pad(2, time.minutes);
  seconds.innerHTML = pad(2, time.seconds);
  milliseconds.innerHTML = pad(3, time.milliseconds);
};

view.offerLink =
function offerLink(url) {
  link.setAttribute('href', url);
  show(link);
};

})();
