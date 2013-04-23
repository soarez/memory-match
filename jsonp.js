/*
  
  ::: WARNING :::

  JSONP is bad idea. Since CORS has showed up,
  THERE IS NO GOOD REASON TO USE IT.

  I despise it and recomend everyone to
  never adopt it, supported or even talk about it.

  JSONP is cancer.

*/

(function() {

function randomName(){
  var from = 'a'.charCodeAt(0);
  var to = 'z'.charCodeAt(0);
  var count = 20;

  var range = to - from + 1;
  var args = new Array(count), i;
  for (i=0; i<count; ++i)
    args[i] = Math.floor(Math.random() * range + from);

  var result = String.fromCharCode.apply(String, args);

  return result;
}

window.jsonp =
function jsonp(url, cb) {
  var badIdea = randomName();

  url = url + '?callback=' + badIdea;

  var pureEvil = document.createElement('script');
  pureEvil.setAttribute('src', url)

  var forsaken = false;
  function amend() {
    if (forsaken) return;
    forsaken = true;
    delete window[badIdea];
    pureEvil.parentElement.removeChild(pureEvil);
  }
  var madness = setTimeout(amend, 666 * 10);

  window[badIdea] = 
  function invoker() {
    clearTimeout(madness);
    amend();

    var args = Array.prototype.slice.call(arguments);
    cb.apply(null, args);
  }

  document.head.appendChild(pureEvil);
};

})();
