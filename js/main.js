/* ============================================
   FAB — Forest Abandoned Bamboo
   Main JavaScript Framework
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Hamburger Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      nav.classList.toggle('is-active');
    });

    // Close menu when clicking nav links
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-active');
      });
    });
  }

  // 3. Hero Slideshow (Fade Transition)
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  if (slides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }

  // 4. Scroll Reveal Animation (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Trigger stat counter if inside this element
          if (entry.target.classList.contains('stat-card')) {
            animateCounter(entry.target);
          }
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    fadeElements.forEach(el => el.classList.add('is-visible'));
  }

  // 5. Stat Counter Animation
  function animateCounter(cardElement) {
    const numberEl = cardElement.querySelector('.stat-number[data-target]');
    if (!numberEl || numberEl.dataset.animated === 'true') return;
    
    numberEl.dataset.animated = 'true';
    const target = parseInt(numberEl.dataset.target, 10);
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        numberEl.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        numberEl.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  }

  // 6. Tabs Interaction (if present)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetTab)?.classList.add('active');
    });
  });

  // 7. Modal Dialog Handler
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloseBtns = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modal;
      document.getElementById(modalId)?.classList.add('is-open');
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay')?.classList.remove('is-open');
    });
  });
});
