
function Badge(clickCb) {
  return function(badge) {
    var el = document.createElement('div');
    el.className = 'badge';

    var cover = document.createElement('img');
    var coverImage = 'https://i2.wp.com/codebits.eu/logos/defaultavatar.jpg';
    cover.setAttribute('src', coverImage);
    cover.addEventListener('click', propagate);
    el.appendChild(cover);

    var face = document.createElement('img');
    face.setAttribute('src', badge.img);
    View.hide(face);
    el.appendChild(face);

    function propagate() {
      clickCb({
        id: badge.id,
        show: show,
        hide: hide,
        remove: remove
      });
    }

    function show() {
      View.hide(cover);
      View.show(face);
    }

    function hide() {
      View.hide(face);
      View.show(cover);
    }

    function remove() {
      cover.removeEventListener('click', propagate);
      View.fadeout(el);
    }

    return el;
  }
}
