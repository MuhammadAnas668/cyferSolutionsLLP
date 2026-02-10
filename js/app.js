/**
 * CYFER SOLUTIONS - App Script (Optimized)
 */

// Theme initialization
(function initTheme() {
  const stored = localStorage.getItem('theme');
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = stored === 'dark' || (!stored && dark);
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
})();

// Load components
async function loadComponents() {
  const header = document.getElementById('header-placeholder');
  const footer = document.getElementById('footer-placeholder');
  const base = window.location.pathname.split('/').slice(0, -1).join('/') + '/';
  
  try {
    if (header) {
      const res = await fetch(base + 'components/header.html');
      if (res.ok) header.outerHTML = await res.text();
    }
    if (footer) {
      const res = await fetch(base + 'components/footer.html');
      if (res.ok) footer.outerHTML = await res.text();
    }
  } catch (e) {
    console.warn('Components not loaded. Run via HTTP server.');
    createFallback();
  }
  initApp();
}

// Fallback components
function createFallback() {
  const header = document.getElementById('header-placeholder');
  const footer = document.getElementById('footer-placeholder');
  
  if (header) header.outerHTML = `<header class="sticky top-4 z-50 mx-auto max-w-6xl px-4">
    <nav class="glass border border-white dark:border-slate-800 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg bg-white dark:bg-slate-900">
      <a href="index.html" class="flex items-center gap-2 group">
        <img src="assets/image.png" alt="Cyfer" class="rounded-2xl h-14 w-auto min-w-[180px] max-w-[220px] object-contain drop-shadow-sm hover:scale-105 transition-all dark:hidden">
        <img src="assets/darkmoodlogo.png" alt="Cyfer" class="rounded-2xl h-14 w-auto min-w-[180px] max-w-[220px] object-contain drop-shadow-sm hover:scale-105 transition-all hidden dark:block">
      </a>
      <div class="hidden md:flex items-center gap-8 text-sm font-semibold">
        <a href="index.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400" data-page="index">Home</a>
        <a href="about.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400" data-page="about">About</a>
        <a href="services.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400" data-page="services">Services</a>
        <a href="portfolio.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400" data-page="portfolio">Portfolio</a>
        <a href="contact.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400" data-page="contact">Contact</a>
      </div>
      <div class="flex items-center gap-4">
        <button id="theme-toggle" class="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:ring-2 ring-[#1e3a5f]">
          <i id="theme-icon" class="fas fa-moon text-slate-600 dark:text-yellow-400"></i>
        </button>
        <a href="contact.html" class="hidden sm:block bg-[#1e3a5f] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-sm font-bold">Get Started</a>
      </div>
    </nav>
  </header>`;
  
  if (footer) footer.outerHTML = `<footer class="relative mt-20 bg-[#0f172a] text-slate-300">
    <div class="max-w-6xl mx-auto px-4 pt-20 pb-10">
      <div class="grid md:grid-cols-4 gap-12 mb-16">
        <div class="md:col-span-2">
          <a href="index.html" class="block mb-6"><span class="text-2xl font-bold text-white">Cyfer Solutions</span></a>
          <p class="mb-8 max-w-sm text-slate-400">Transforming ideas into digital reality.</p>
          <div class="flex max-w-sm gap-2">
            <input type="email" placeholder="Email" class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 outline-none">
            <button class="bg-[#1e3a5f] text-white px-6 py-3 rounded-xl font-bold">Join</button>
          </div>
        </div>
        <div><h4 class="text-white font-bold mb-6">Explore</h4>
          <ul class="space-y-4 text-sm">
            <li><a href="index.html" class="hover:text-[#60a5fa]">Home</a></li>
            <li><a href="about.html" class="hover:text-[#60a5fa]">Our Vision</a></li>
            <li><a href="services.html" class="hover:text-[#60a5fa]">Services</a></li>
            <li><a href="portfolio.html" class="hover:text-[#60a5fa]">Projects</a></li>
            <li><a href="contact.html" class="hover:text-[#60a5fa]">Contact</a></li>
          </ul>
        </div>
        <div><h4 class="text-white font-bold mb-6">Contact</h4>
          <ul class="space-y-4 text-sm">
            <li><i class="fas fa-envelope text-[#dc2626] mr-2"></i>Salmanparismufti@gmail.com</li>
            <li><i class="fas fa-phone text-[#dc2626] mr-2"></i>+1(202)956-9850</li>
            <li class="flex gap-4 pt-4">
              <a href="#" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center"><i class="fab fa-instagram"></i></a>
              <a href="#" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center"><i class="fab fa-tiktok"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 Cyfer Solutions</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-white">Privacy</a>
          <a href="#" class="hover:text-white">Terms</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// Active navigation
function setActiveNav() {
  const path = window.location.pathname.toLowerCase();
  const page = path.includes('about') ? 'about' : 
               path.includes('services') ? 'services' : 
               path.includes('portfolio') ? 'portfolio' : 
               path.includes('contact') ? 'contact' : 'index';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('nav-active');
    if ((link.getAttribute('data-page') || '').includes(page)) {
      link.classList.add('nav-active');
    }
  });
}

// Theme toggle
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!btn || !icon) return;
  
  function update() {
    const dark = document.documentElement.classList.contains('dark');
    icon.classList.toggle('fa-moon', !dark);
    icon.classList.toggle('fa-sun', dark);
    icon.classList.toggle('text-slate-600', !dark);
    icon.classList.toggle('text-yellow-400', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
  update();
  
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    update();
  });
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you! Your message has been sent successfully.');
      this.reset();
      btn.innerHTML = original;
      btn.disabled = false;
    }, 1500);
  });
}

// Portfolio filter
function initPortfolioFilter() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  
  if (filters.length && cards.length) {
    filters.forEach(btn => btn.addEventListener('click', function() {
      filters.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      
      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    }));
  }
  
  // Counter animation
  const stats = document.getElementById('stats-section');
  if (stats) {
    new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        counter('projects-count', 24, '+');
        counter('clients-count', 15, '+');
        counter('retention-count', 98, '%');
        counter('users-count', 50000, '+');
      }
    }, { threshold: 0.3 }).observe(stats);
  }
}

// Counter helper
function counter(id, target, suffix) {
  const el = document.getElementById(id);
  if (!el) return;
  let count = 0;
  const inc = target / 50;
  const timer = setInterval(() => {
    count += inc;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = suffix === '%' ? 
      Math.floor(count) + suffix : 
      Math.floor(count).toLocaleString() + suffix;
  }, 40);
}

// Initialize AOS
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }
}

// Initialize everything
function initApp() {
  setActiveNav();
  initThemeToggle();
  initContactForm();
  initPortfolioFilter();
  initAOS();
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
