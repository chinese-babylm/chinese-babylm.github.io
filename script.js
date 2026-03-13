// ─── Language Switcher ────────────────────────────────────────────────
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;

  // Toggle button states
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-zh').classList.toggle('active', lang === 'zh');

  // Toggle body class for font switching
  document.body.classList.toggle('zh-mode', lang === 'zh');

  // Set html lang attribute
  document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';

  // Update all elements with data-en / data-zh attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
    if (text !== null) el.textContent = text;
  });

}

// ─── Navbar scroll effect ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── Hamburger menu ───────────────────────────────────────────────────
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Close hamburger menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ─── Smooth active section highlight ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--red)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
