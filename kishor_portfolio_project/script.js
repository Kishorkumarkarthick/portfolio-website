/* Nav toggle */
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  links.classList.toggle('open');
  toggle.querySelector('i').classList.toggle('fa-bars');
  toggle.querySelector('i').classList.toggle('fa-times');
});
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.querySelector('i').classList.add('fa-bars');
    toggle.querySelector('i').classList.remove('fa-times');
  });
});

/* Navbar scroll style */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(6,10,18,.97)'
    : 'rgba(6,10,18,.80)';
});

/* Reveal on scroll */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(r => io.observe(r));

/* Stagger children inside reveal containers */
document.querySelectorAll('.skills-layout, .projects-grid, .cert-grid, .contact-links, .about-highlights, .about-stats').forEach(container => {
  Array.from(container.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.07}s`;
    child.classList.add('reveal');
    io.observe(child);
  });
});

/* Active nav link */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cyan)' : '';
  });
});

/* Typewriter Effect */
const phrases = [
  "Aspiring Software Developer",
  "AI & Data Science Enthusiast",
  "Problem Solver & Tech Explorer"
];
const typingDelay = 100;
const erasingDelay = 60;
const newTextDelay = 2000;
let phraseIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById('typewriter');

function type() {
  if (!typewriterElement) return;
  if (charIndex < phrases[phraseIndex].length) {
    typewriterElement.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (!typewriterElement) return;
  if (charIndex > 0) {
    typewriterElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    phraseIndex++;
    if (phraseIndex >= phrases.length) phraseIndex = 0;
    setTimeout(type, typingDelay + 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (phrases.length) setTimeout(type, newTextDelay + 250);
});
