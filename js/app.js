/**
 * CYFER SOLUTIONS - Shared App Script
 * Dynamic header/footer, theme, nav active state, service dropdown hover
 */

// Theme - run before DOM ready
(function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
})();

// Load header and footer
async function loadComponents() {
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  
  // Get base path for components
  const getBasePath = () => {
    const path = window.location.pathname;
    const segments = path.split('/');
    if (segments.length > 1) {
      segments.pop(); // Remove current file
      return segments.join('/') + '/';
    }
    return './';
  };
  
  const basePath = getBasePath();
  
  try {
    // Load header
    if (headerEl) {
      const headerPath = basePath + 'components/header.html';
      const headerRes = await fetch(headerPath);
      if (headerRes.ok) {
        const headerHTML = await headerRes.text();
        headerEl.outerHTML = headerHTML;
      }
    }
    
    // Load footer
    if (footerEl) {
      const footerPath = basePath + 'components/footer.html';
      const footerRes = await fetch(footerPath);
      if (footerRes.ok) {
        const footerHTML = await footerRes.text();
        footerEl.outerHTML = footerHTML;
      }
    }
  } catch (error) {
    console.warn('Could not load components. Please serve via HTTP server (npx serve) or check file paths:', error);
    // Fallback: Create basic header/footer if fetch fails
    createFallbackComponents();
  }
  
  // Initialize all app functionality
  initApp();
}

// Fallback components if fetch fails
function createFallbackComponents() {
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  
  if (headerEl) {
    headerEl.outerHTML = `
      <header class="sticky top-4 z-50 mx-auto max-w-6xl px-4">
        <nav class="glass border border-white dark:border-slate-800 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg bg-white dark:bg-slate-900">
          <a href="index.html" class="flex items-center gap-2 group">
            <img 
              id="logo-light"
              src="assets/image.png" 
              alt="Cyfer Solutions" 
              class="rounded-2xl h-14 w-auto min-w-[180px] max-w-[220px] object-contain contrast-110 drop-shadow-sm hover:scale-105 transition-all duration-300 dark:hidden">
            <img 
              id="logo-dark"
              src="assets/darkmoodlogo.png" 
              alt="Cyfer Solutions" 
              class="rounded-2xl h-14 w-auto min-w-[180px] max-w-[220px] object-contain contrast-110 drop-shadow-sm hover:scale-105 transition-all duration-300 hidden dark:block">
          </a>
          <div class="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="index.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors" data-page="index">Home</a>
            <a href="about.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors" data-page="about">About</a>
            <a href="services.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors" data-page="services">Services</a>
            <a href="portfolio.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors" data-page="portfolio">Portfolio</a>
            <a href="contact.html" class="nav-link text-slate-700 dark:text-slate-300 hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors" data-page="contact">Contact</a>
          </div>
          <div class="flex items-center gap-4">
            <button id="theme-toggle" class="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:ring-2 ring-[#1e3a5f] dark:ring-[#2563eb] transition-all outline-none">
              <i id="theme-icon" class="fas fa-moon text-slate-600 dark:text-yellow-400"></i>
            </button>
            <a href="contact.html" class="hidden sm:block bg-[#1e3a5f] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95">Get Started</a>
          </div>
        </nav>
      </header>
    `;
  }
  
  if (footerEl) {
    footerEl.outerHTML = `
      <footer class="relative mt-20 bg-[#0f172a] text-slate-300 overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent opacity-50"></div>
        <div class="max-w-6xl mx-auto px-4 pt-20 pb-10">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div class="md:col-span-2">
              <a href="index.html" class="flex items-center gap-2 mb-6 group">
                <span class="font-bold text-2xl tracking-tight text-white">Cyfer Solutions</span>
              </a>
              <p class="mb-8 max-w-sm text-slate-400 leading-relaxed">
                Transforming ideas into digital reality. ascend to innovation.
              </p>
              <div class="flex max-w-sm gap-2">
                <input type="email" placeholder="Your email address" class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 ring-[#1e3a5f] outline-none transition-all">
                <button class="bg-[#1e3a5f] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95">Join</button>
              </div>
            </div>
            <div>
              <h4 class="text-white font-bold text-lg mb-6">Explore</h4>
              <ul class="space-y-4 text-sm">
                <li><a href="index.html" class="hover:text-[#60a5fa] transition-colors">Home</a></li>
                <li><a href="about.html" class="hover:text-[#60a5fa] transition-colors">Our Vision</a></li>
                <li><a href="services.html" class="hover:text-[#60a5fa] transition-colors">Services</a></li>
                <li><a href="portfolio.html" class="hover:text-[#60a5fa] transition-colors">Featured Projects</a></li>
                <li><a href="contact.html" class="hover:text-[#60a5fa] transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-bold text-lg mb-6">Get in Touch</h4>
              <ul class="space-y-4 text-sm">
                <li class="flex items-center gap-3"><i class="fas fa-envelope text-[#dc2626]"></i> Salmanparismufti@gmail.com</li>
                <li class="flex items-center gap-3"><i class="fas fa-phone text-[#dc2626]"></i> +1(202)956-9850</li>
                <li class="flex gap-4 pt-4 text-xl">
                  <a href="https://facebook.com/Cyfersolutions" target="_blank" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1e3a5f] hover:-translate-y-1 transition-all text-white"><i class="fab fa-facebook-f"></i></a>
                  <a href="https://instagram.com/cyfer_solutions" target="_blank" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1e3a5f] hover:-translate-y-1 transition-all text-white"><i class="fab fa-instagram"></i></a>
                  <a href="https://linkedin.com/company/cyfer-solutions" target="_blank" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1e3a5f] hover:-translate-y-1 transition-all text-white"><i class="fab fa-linkedin-in"></i></a>
                  <a href="https://tiktok.com/@cyfer_solutions" target="_blank" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1e3a5f] hover:-translate-y-1 transition-all text-white"><i class="fab fa-tiktok"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Cyfer Solutions | ascend to innovation. Built with ❤️ for Innovators.</p>
            <div class="flex gap-6">
              <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

// Set active navigation
function setActiveNav() {
  const path = window.location.pathname || window.location.href || '';
  let page = 'index';
  
  if (path.includes('about')) page = 'about';
  else if (path.includes('services')) page = 'services';
  else if (path.includes('portfolio')) page = 'portfolio';
  else if (path.includes('contact')) page = 'contact';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('nav-active');
    const linkPage = link.getAttribute('data-page') || link.getAttribute('href') || '';
    if (linkPage.includes(page) || 
        (page === 'index' && (linkPage === 'index.html' || linkPage === '/' || linkPage === './' || linkPage.includes('index')))) {
      link.classList.add('nav-active');
    }
  });
}

// Theme toggle with logo switching
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!btn || !icon) return;

  function updateThemeUI() {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Update icon
    if (isDark) {
      icon.classList.replace('fa-moon', 'fa-sun');
      icon.classList.add('text-yellow-400');
      icon.classList.remove('text-slate-600');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      icon.classList.add('text-slate-600');
      icon.classList.remove('text-yellow-400');
    }
    
    // Update theme in localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  // Initial UI update
  updateThemeUI();
  
  // Toggle theme on button click
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    updateThemeUI();
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      updateThemeUI();
    }
  });
}

// Service select customization
function initServiceSelect() {
  const select = document.getElementById('service');
  if (!select) return;
  
  // Add custom styling to select element
  select.className = 'cyfer-service-select w-full px-6 py-4 glass border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-[#1e3a5f] dark:focus:ring-[#60a5fa] outline-none transition-all appearance-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white cursor-pointer';
  
  // Add custom arrow
  const wrapper = document.createElement('div');
  wrapper.className = 'service-select-wrapper relative';
  
  const customSelect = select.cloneNode(true);
  wrapper.appendChild(customSelect);
  
  const arrow = document.createElement('div');
  arrow.className = 'absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none';
  arrow.innerHTML = '<i class="fas fa-chevron-down text-slate-500"></i>';
  wrapper.appendChild(arrow);
  
  select.parentNode.replaceChild(wrapper, select);
}

// Contact form handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  // Form validation
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (!this.value.trim()) {
        this.classList.add('border-red-500');
        this.classList.remove('border-slate-200', 'dark:border-slate-800');
      } else {
        this.classList.remove('border-red-500');
        this.classList.add('border-slate-200', 'dark:border-slate-800');
      }
    });
  });
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    let isValid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('border-red-500');
        input.classList.remove('border-slate-200', 'dark:border-slate-800');
        isValid = false;
      }
    });
    
    if (!isValid) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Get form data
    const formData = {
      firstName: document.getElementById('firstName')?.value || '',
      lastName: document.getElementById('lastName')?.value || '',
      email: document.getElementById('email')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      service: document.getElementById('service')?.value || '',
      message: document.getElementById('message')?.value || '',
      newsletter: document.getElementById('newsletter')?.checked || false,
      timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      // Show success message
      alert('✅ Thank you! Your message has been sent successfully.\nWe will get back to you within 24 hours.');
      
      // Reset form
      this.reset();
      
      // Restore button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Reset validation styles
      inputs.forEach(input => {
        input.classList.remove('border-red-500');
        input.classList.add('border-slate-200', 'dark:border-slate-800');
      });
    }, 1500);
  });
}

// Portfolio filter and counter
function initPortfolioFilter() {
  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Animated counters
  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        
        // Animate each counter with different values
        animateCounter('projects-count', 24, '+');
        animateCounter('clients-count', 15, '+');
        animateCounter('retention-count', 98, '%');
        animateCounter('users-count', 50000, '+');
      }
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
  }
}

// Helper: Animate counter
function animateCounter(elementId, finalValue, suffix = '') {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let startValue = 0;
  const duration = 2000; // 2 seconds
  const startTime = Date.now();
  
  function updateCounter() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuad = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easeOutQuad * finalValue);
    
    if (suffix === '%') {
      element.textContent = currentValue + suffix;
    } else {
      element.textContent = currentValue.toLocaleString() + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      if (suffix === '%') {
        element.textContent = finalValue + suffix;
      } else {
        element.textContent = finalValue.toLocaleString() + suffix;
      }
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Initialize AOS animations
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      delay: 100,
      easing: 'ease-out-cubic'
    });
  }
}

// Initialize mobile menu (if needed in future)
function initMobileMenu() {
  // You can add mobile menu functionality here if needed
  // For now, the navigation is hidden on mobile (hidden md:flex)
}

// Initialize all app functionality
function initApp() {
  setActiveNav();
  initThemeToggle();
  initServiceSelect();
  initContactForm();
  initPortfolioFilter();
  initAOS();
  initMobileMenu();
  
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initTheme,
    loadComponents,
    setActiveNav,
    initThemeToggle,
    initServiceSelect,
    initContactForm,
    initPortfolioFilter,
    initAOS,
    initApp
  };
}