// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// Build dots for each slideshow on page load
document.querySelectorAll('.slideshow').forEach(ss => {
    const first = ss.querySelector('img, video');
    if (first && first.tagName === 'VIDEO') first.play();

    // your existing dots code stays below this...
    const slides = ss.querySelectorAll('img, video');
    const dotsEl = ss.querySelector('.slide-dots');
    slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dotsEl.appendChild(d);
    });
});

function changeSlide(btn, dir) {
    const ss = btn.closest('.slideshow');
    const slides = ss.querySelectorAll('img, video');
    const dots = ss.querySelectorAll('.slide-dot');
    let i = parseInt(ss.dataset.index);

    // hide current slide, pause if it's a video
    slides[i].style.display = 'none';
    if (slides[i].tagName === 'VIDEO') slides[i].pause();
    dots[i].classList.remove('active');

    // show next slide, play if it's a video
    i = (i + dir + slides.length) % slides.length;
    slides[i].style.display = 'block';
    if (slides[i].tagName === 'VIDEO') slides[i].play();
    dots[i].classList.add('active');
    ss.dataset.index = i;
}