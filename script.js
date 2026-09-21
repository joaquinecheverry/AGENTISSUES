document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('introOverlay');
  var video = document.getElementById('introVideo');
  if (!overlay || !video) return;

  var STORAGE_KEY = 'agentIntroPlayed';
  var alreadyPlayed = false;
  try {
    alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch (e) {}

  if (alreadyPlayed) {
    overlay.remove();
    return;
  }

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {}
    overlay.remove();
  }

  video.addEventListener('ended', dismiss);
  overlay.addEventListener('click', dismiss);
  video.play().catch(dismiss);
});

document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.hero-strip__track');
  if (!track) return;

  var halfWidth = 0;
  function measure() {
    halfWidth = track.scrollWidth / 2;
  }
  measure();
  window.addEventListener('resize', measure);

  var SPEED = 1;
  var offset = 0;

  function render() {
    if (!halfWidth) return;
    var wrapped = offset % halfWidth;
    if (wrapped < 0) wrapped += halfWidth;
    track.style.transform = 'translateX(-' + wrapped + 'px)';
  }

  var centerImg = track.querySelector('img[src="assets/spread-mokrov.jpg"]');
  if (centerImg) {
    offset = centerImg.offsetLeft + centerImg.offsetWidth / 2 - window.innerWidth / 2;
  }

  window.addEventListener('wheel', function (e) {
    offset += e.deltaY * SPEED;
    render();
  }, { passive: true });

  render();
});
