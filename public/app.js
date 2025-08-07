// Elevate header on scroll
const header = document.querySelector('[data-elevate]');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.boxShadow = y > 4 ? '0 10px 30px rgba(0,0,0,.25)' : 'none';
  lastY = y;
});

// Floating card parallax
const float = document.querySelector('[data-float]');
if (float) {
  const origin = { x: 0, y: 0 };
  float.addEventListener('mousemove', e => {
    const rect = float.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width/2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height/2) / rect.height;
    float.style.transform = `translateY(${origin.y + dy * 6}px) rotateX(${dy * -3}deg) rotateY(${dx * 3}deg)`;
  });
  float.addEventListener('mouseleave', () => { float.style.transform = 'translateY(0)'; });
}

// Reveal on intersection
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('is-visible');
  });
}, { threshold:.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Simple carousel
const carousel = document.querySelector('[data-carousel]');
if (carousel){
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  let i = 0;
  const show = (n) => {
    slides[i].classList.remove('active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active');
  };
  prev.addEventListener('click', () => show(i-1));
  next.addEventListener('click', () => show(i+1));
  setInterval(() => show(i+1), 6000);
}
