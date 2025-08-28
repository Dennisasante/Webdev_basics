// Skuulba main JS: navigation, loader, reveals, counters, and small UI helpers

function onReady(fn){
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

onReady(() => {
  // Loader fade-out
  const loader = document.querySelector('.page-loader');
  setTimeout(() => loader && loader.classList.add('hidden'), 500);

  // Mobile menu (simple toggle for demo; you can enhance with real menu)
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');
  toggle && toggle.addEventListener('click', () => {
    const isOpen = navLinks && navLinks.style.display === 'flex';
    if (navLinks) navLinks.style.display = isOpen ? 'none' : 'flex';
    if (navActions) navActions.style.display = isOpen ? 'none' : 'flex';
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    })
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    })
  }, { threshold: 0.2 });
  revealEls.forEach(el => io.observe(el));

  // Counters (data-counter)
  document.querySelectorAll('[data-counter]')?.forEach(el => {
    const end = parseInt(el.getAttribute('data-counter') || '0', 10);
    const duration = 1200;
    const startTime = performance.now();
    function tick(now){
      const t = Math.min(1, (now - startTime) / duration);
      const val = Math.floor(end * (1 - Math.pow(1 - t, 3))); // easeOutCubic
      el.textContent = val.toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  // Hero tilt effect
  const demo = document.querySelector('.hero-demo');
  if (demo) {
    demo.addEventListener('mousemove', (e) => {
      const rect = demo.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left) / rect.width;
      const offsetY = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - offsetY) * 6;
      const rotY = (offsetX - 0.5) * 6;
      demo.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    demo.addEventListener('mouseleave', () => {
      demo.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
    });
  }
});

