/* ============================================
   FAB — Forest Abandoned Bamboo
   Main JavaScript Framework & Motion Handler
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Site Header Scroll Behavior
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Hamburger Toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      nav.classList.toggle('is-active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-active');
      });
    });
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-mask-box');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Trigger number counter if contains stat-val
          const counterEl = entry.target.querySelector('.stat-val[data-target]');
          if (counterEl) {
            animateNumber(counterEl);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Number Counter Animation
  function animateNumber(element) {
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';

    const target = parseInt(element.dataset.target, 10);
    const duration = 1800;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  }

  // 5. Modal Dialog Events
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.modalTarget;
      document.getElementById(targetId)?.classList.add('is-open');
    });
  });

  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop || e.target.classList.contains('modal-close-button')) {
        backdrop.classList.remove('is-open');
      }
    });
  });
});
