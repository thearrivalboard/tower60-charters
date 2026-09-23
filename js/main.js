// Tower 60 Charters - shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.innerHTML = isOpen ? '&times;' : '&#9776;';
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // FAQ accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      faqItems.forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Slideshow (gallery)
  var slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    var slides = slideshow.querySelectorAll('.slide');
    var dotsWrap = slideshow.querySelector('.slide-dots');
    var dots = dotsWrap ? dotsWrap.querySelectorAll('button') : [];
    var thumbs = document.querySelectorAll('.thumb[data-slide]');
    var current = 0;
    var timer;

    function show(index) {
      slides.forEach(function (s, i) { s.classList.toggle('active', i === index); });
      dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
      thumbs.forEach(function (t) {
        t.classList.toggle('active', parseInt(t.getAttribute('data-slide'), 10) === index);
      });
      current = index;
    }

    function next() { show((current + 1) % slides.length); }
    function prev() { show((current - 1 + slides.length) % slides.length); }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    var nextBtn = slideshow.querySelector('.slide-nav.next');
    var prevBtn = slideshow.querySelector('.slide-nav.prev');
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); restart(); });
    });
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        show(parseInt(t.getAttribute('data-slide'), 10));
        restart();
      });
    });

    show(0);
    restart();
  }

  // Inquiry form
  // NOTE: no email backend is wired yet. This depends on the Step 0 hosting
  // discovery (WordPress vs static GoDaddy hosting) called out in the project
  // brief, and must be confirmed with JM before connecting a live send method
  // (PHP mail/SMTP or a third-party form service).
  var form = document.getElementById('inquiry-form');
  var success = document.getElementById('form-success');
  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      success.classList.add('visible');
    });
  }
});
