document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll effect
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 96;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // Scroll reveal animation
  const reveals = document.querySelectorAll(
    '.about-grid, .structure-grid, .compliance-section, .focus-card, ' +
    '.project-card, .school-img, .stat-card, .partner-card, .partner-cta, ' +
    '.bb-card, .trust-feature, .trust-compliance-card, .trust-cta-card, ' +
    '.donate-payment-wrap, .membership-panel, .member-card'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Counter animation for achievements
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const donateForm = document.getElementById('donateForm');
  const copyUpiBtn = document.getElementById('copyUpiBtn');
  const copyUpiFeedback = document.getElementById('copyUpiFeedback');
  const donateUpiId = document.getElementById('donateUpiId');

  if (copyUpiBtn && donateUpiId && copyUpiFeedback) {
    copyUpiBtn.addEventListener('click', async () => {
      const id = donateUpiId.textContent.trim();
      try {
        await navigator.clipboard.writeText(id);
        copyUpiFeedback.textContent = 'UPI ID copied to clipboard.';
      } catch {
        copyUpiFeedback.textContent = 'Could not copy. Please select and copy the UPI ID manually.';
      }
      window.setTimeout(() => {
        copyUpiFeedback.textContent = '';
      }, 4000);
    });
  }

  if (donateForm) {
    donateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!donateForm.checkValidity()) {
        donateForm.reportValidity();
        return;
      }
      const name = document.getElementById('donorName').value.trim();
      const phone = document.getElementById('donorPhone').value.trim();
      const upi = donateUpiId ? donateUpiId.textContent.trim() : '';
      const body = [
        'I have made a donation via UPI.',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        '',
        `UPI ID: ${upi}`,
        '',
        'Please share acknowledgement / 80G details as applicable.'
      ].join('\n');
      const mailto = `mailto:urssathiya@gmail.com?subject=${encodeURIComponent('Donation notification - LCHS')}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
});
