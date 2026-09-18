(function () {
  var targets = document.querySelectorAll('[data-animate], .card, .event-card');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  targets.forEach(function (el) { observer.observe(el); });
})();

(function () {
  var trigger = document.getElementById('admin-trigger');
  if (!trigger) return;
  var count = 0;
  var resetTimer = null;
  trigger.addEventListener('click', function () {
    count++;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () { count = 0; }, 1200);
    if (count >= 3) {
      count = 0;
      window.location.href = '/login';
    }
  });
})();
