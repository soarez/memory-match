(function(){

function newGame() {
  jsonp('https://services.sapo.pt/Codebits/listbadges', afterGettingTheBadges);
}

function afterGettingTheBadges(badges) {

  function rand(n) {
    return Math.floor(Math.random() * n);
  }

  var a = new Array(count*2), i;
  var picked;
  for (i=0; i<count*2; i += 2) {
    while(~a.indexOf(picked = badges[rand(badges.length)]));

    a[i] = a[i+1] = picked;
  }

  var x, y;
  for(i = count*2; i; x = rand(i), y = a[--i], a[i] = a[x], a[x] = y);

  View.allowStartGame(a.map(Badge(badgeClicked)), 3, 6);
}


var count = 9;
var found = 0;
var active;
var lastBadge;

function badgeClicked(badge) {
  if (!active) return;

  badge.show();

  if (!lastBadge) {
    lastBadge = badge;
    return;
  }

  active = false;

  if (badge.id == lastBadge.id) {
    lastBadge.remove();
    badge.remove();

    if (++found === count)
      finished();

    proceed();
  } else {
    setTimeout(hide, 500);
  }

  function hide() {
    lastBadge.hide();
    badge.hide();
    proceed();
  }

  function proceed() {
    lastBadge = null;
    active = true;
  }
}

function startGame() {
  timer.start();
  active = true;
}

function finished() {
  var time = timer.stop();
  var text = 'Memory JavaScript FTW em: ' + time.minutes + ' minutos e ' + time.seconds + ' segundos';
  var component = encodeURIComponent(text);
  var link = 'https://twitter.com/intent/tweet/?text=' + component;
  View.offerLink(link);
}

View.newGame = newGame;
View.startGame = startGame;
View.initialize();

var timer = Timer();
timer.tick = View.setTime;

})();
