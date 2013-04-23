function Timer() {
  var timer = {};

  var t0;
  var interval;

  timer.start =
  function start() {
    if (interval) return;

    t0 = Date.now();
    interval = setInterval(onInterval, 5);
  };

  function onInterval() {
    var total = Date.now() - t0;

    if (typeof timer.tick == 'function')
      timer.tick(expand(total));
  }

  function expand(total) {
    var milliseconds = total % 1000;
    total -= milliseconds;

    total = Math.floor(total / 1000);
    var seconds = total % 60;
    total -= seconds;

    total = Math.floor(total / 60);
    var minutes = total % 60;

    return {
      milliseconds: milliseconds,
      seconds: seconds,
      minutes: minutes
    };
  }

  timer.stop =
  function stop() {
    var total = Date.now() - t0;
    clearInterval(interval);
    return expand(total);
  };

  return timer;
}