/* =============================================
   MUHAMMAD HASSAAN — PORTFOLIO JAVASCRIPT
   Author: Muhammad Hassaan
   Version: 1.0
   ============================================= */

'use strict';

/* ===== LOADING SCREEN ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Wait for the progress bar animation (~1.8s) then hide
  setTimeout(() => {
    loader.classList.add('hidden');
    // Remove from DOM after fade completes
    setTimeout(() => loader.remove(), 500);
  }, 2000);
});

/* ===== AOS INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  initNav();
  initTheme();
  initTyping();
  initSkillBars();
  initCounters();
  initProjectFilter();
  initContactForm();
  initScrollProgress();
  initBackToTop();
  initSmoothScroll();
  initMobileMenu();
  initActiveNavLink();
});

/* ===== SCROLL PROGRESS BAR ===== */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ===== STICKY NAVBAR ===== */
function initNav() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ===== DARK / LIGHT THEME TOGGLE ===== */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('mh-theme') || 'dark';
  applyTheme(savedTheme);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('mh-theme', next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      icon.classList.replace('fa-sun', 'fa-moon');
    } else {
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  }
}

/* ===== TYPING ANIMATION ===== */
function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const strings = [
    'Frontend Developer',
    'CS Student',
    'Web Designer',
    'Graphic Designer',
    'Problem Solver',
  ];

  let strIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 45;
  const pauseAfterType = 1800;
  const pauseAfterDelete = 400;

  function type() {
    const current = strings[strIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseAfterType;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      strIndex = (strIndex + 1) % strings.length;
      delay = pauseAfterDelete;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ===== ANIMATED SKILL BARS ===== */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  // Use IntersectionObserver to trigger when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ===== ANIMATED COUNTERS ===== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

/* ===== PROJECT FILTER ===== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hide');
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-message');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      showMessage('error', 'Please fill in all fields.');
      return;
    }
    if (!isValidEmail(email)) {
      showMessage('error', 'Please enter a valid email address.');
      return;
    }

    // Simulate form submission (replace with actual API call)
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      showMessage('success', '✅ Message sent successfully! I will get back to you soon.');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 1500);
  });

  function showMessage(type, text) {
    msg.className = type;
    msg.textContent = text;
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}
