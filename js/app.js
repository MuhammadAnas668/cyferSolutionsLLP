/**
 * CYFER SOLUTIONS - Shared App Script
 * Dynamic header/footer, theme, nav active state, service dropdown hover
 */

// Theme - run before DOM ready
(function initTheme() {
  if (localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme','dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme','light')
  }
})();

// Load header and footer (requires HTTP server for fetch - use: npx serve)
async function loadComponents() {
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  
  const getBase = () => {
    const path = window.location.pathname || '';
    const idx = path.lastIndexOf('/');
    return idx >= 0 ? path.substring(0, idx + 1) : './';
  };
  const base = getBase();
  
  try {
    if (headerEl) {
      const res = await fetch(base + 'components/header.html');
      if (res.ok) headerEl.outerHTML = await res.text();
    }
    if (footerEl) {
      const res = await fetch(base + 'components/footer.html');
      if (res.ok) footerEl.outerHTML = await res.text();
    }
  } catch (e) {
    console.warn('Run via HTTP server (e.g. npx serve) for dynamic header/footer:', e);
  }
  initApp();
}

// Set active nav - ONLY ONE at a time (never Home + About both active)
function setActiveNav() {
  const path = (window.location.pathname || window.location.href || '').toLowerCase();
  const page = path.includes('about') ? 'about' : 
               path.includes('services') ? 'services' : 
               path.includes('portfolio') ? 'portfolio' : 
               path.includes('contact') ? 'contact' : 'index';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('nav-active');
    if ((link.getAttribute('data-page') || '').toLowerCase() === page) {
      link.classList.add('nav-active');
    }
  });
}

// Service select - custom dropdown with blue hover (like user's reference)
function initServiceSelect() {
  const select = document.getElementById('service');
  if (!select) return;
  const options = Array.from(select.options).map(o => ({ value: o.value, text: o.text }));
  if (options.length <= 1) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'cyfer-select-wrapper relative';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'contact-input w-full px-6 py-4 glass border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-[#1d4ed8] outline-none text-left flex items-center justify-between';
  btn.innerHTML = '<span class="select-text">Select a service</span><i class="fas fa-chevron-down text-slate-500"></i>';
  const dropdown = document.createElement('div');
  dropdown.className = 'cyfer-dropdown absolute left-0 right-0 top-full mt-1 py-2 rounded-xl bg-slate-800 dark:bg-slate-900 border border-slate-700 shadow-xl z-50 hidden';
  options.forEach(opt => {
    const item = document.createElement('div');
    item.className = 'px-4 py-3 cursor-pointer text-slate-300 hover:bg-[#1d4ed8] hover:text-white transition-colors';
    item.textContent = opt.text;
    item.dataset.value = opt.value;
    item.addEventListener('click', () => {
      select.value = opt.value;
      btn.querySelector('.select-text').textContent = opt.text;
      dropdown.classList.add('hidden');
    });
    dropdown.appendChild(item);
  });
  wrapper.appendChild(btn);
  wrapper.appendChild(dropdown);
  select.parentNode.insertBefore(wrapper, select);
  select.style.position = 'absolute'; select.style.opacity = '0'; select.style.pointerEvents = 'none'; select.style.width = '0';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });
  document.addEventListener('click', () => dropdown.classList.add('hidden'));
}

// Theme toggle
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!btn || !icon) return;

  function updateUI() {
    if (document.documentElement.classList.contains('dark')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      icon.classList.add('text-yellow-400');
      icon.classList.remove('text-slate-600');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      icon.classList.add('text-slate-600');
      icon.classList.remove('text-yellow-400');
    }
  }
  updateUI();
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    updateUI();
  });
}

// AOS init
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true });
  }
}

// Contact form handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
      alert('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Portfolio filter + counter
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
        projectCards.forEach(card => {
          const cat = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || cat.includes(filterValue)) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }
  // Portfolio counter animation
  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const animateCounter = (el, final, suffix) => {
      if (!el) return;
      let start = 0, startTime = null;
      function update(ts) {
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / 2000, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const v = Math.floor(ease * final);
        el.textContent = (suffix === '%' ? v + suffix : v.toLocaleString() + suffix);
        if (v < final) requestAnimationFrame(update);
        else el.textContent = (suffix === '%' ? final + suffix : final.toLocaleString() + suffix);
      }
      requestAnimationFrame(update);
    };
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        setTimeout(() => animateCounter(document.getElementById('projects-count'), 24, '+'), 200);
        setTimeout(() => animateCounter(document.getElementById('clients-count'), 15, '+'), 500);
        setTimeout(() => animateCounter(document.getElementById('retention-count'), 98, '%'), 800);
        setTimeout(() => animateCounter(document.getElementById('users-count'), 50000, '+'), 1100);
      }
    }, { threshold: 0.5 });
    obs.observe(statsSection);
  }
}

function initApp() {
  setActiveNav();
  initThemeToggle();
  initServiceSelect();
  initContactForm();
  initPortfolioFilter();
  initAOS();
}

// Run when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
