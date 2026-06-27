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

  // Members Tabs functionality
  const membersTabs = document.querySelectorAll('.members-tab');
  const membersTabContents = document.querySelectorAll('.members-tab-content');

  membersTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      membersTabs.forEach(t => t.classList.remove('active'));
      membersTabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
  });

  // Year-wise Achievements functionality
  const yearBtns = document.querySelectorAll('.year-btn');
  const yearContents = document.querySelectorAll('.year-content');

  yearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetYear = btn.getAttribute('data-year');
      
      // Remove active class from all buttons and contents
      yearBtns.forEach(b => b.classList.remove('active'));
      yearContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      document.getElementById(`year-${targetYear}`).classList.add('active');
    });
  });

  // Lions Hall Hero Slider functionality
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  
  if (heroSlides.length > 0 && heroDots.length > 0) {
    let currentSlide = 0;
    const slideInterval = 4000; // Change slide every 4 seconds

    function showSlide(index) {
      // Remove active class from all slides and dots
      heroSlides.forEach(slide => slide.classList.remove('active'));
      heroDots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      heroSlides[index].classList.add('active');
      heroDots[index].classList.add('active');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
    }

    // Auto-advance slides
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Click on dots to change slide
    heroDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        
        // Reset timer when user manually changes slide
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
      });
    });
  }

  // Purpose & Core Values Modal
  const purposeModal = document.getElementById('purposeModal');
  const purposeModalTrigger = document.getElementById('purposeModalTrigger');
  const purposeModalClose = document.getElementById('purposeModalClose');
  const purposeModalOverlay = document.getElementById('purposeModalOverlay');

  function openPurposeModal() {
    if (!purposeModal) return;
    purposeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePurposeModal() {
    if (!purposeModal) return;
    purposeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (purposeModalTrigger) {
    purposeModalTrigger.addEventListener('click', openPurposeModal);
  }

  if (purposeModalClose) {
    purposeModalClose.addEventListener('click', closePurposeModal);
  }

  if (purposeModalOverlay) {
    purposeModalOverlay.addEventListener('click', closePurposeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (purposeModal && purposeModal.classList.contains('active')) {
      closePurposeModal();
    }
  });

  // Partner Contact Form with Captcha
  const partnerForm = document.getElementById('partnerForm');
  const partnerModal = document.getElementById('partnerModal');
  const partnerModalTrigger = document.getElementById('partnerModalTrigger');
  const partnerModalClose = document.getElementById('partnerModalClose');
  const partnerModalOverlay = document.getElementById('partnerModalOverlay');
  const captchaQuestion = document.getElementById('captchaQuestion');
  const captchaAnswer = document.getElementById('captchaAnswer');
  const captchaFeedback = document.getElementById('captchaFeedback');
  
  if (partnerForm && captchaQuestion && captchaAnswer) {
    let correctAnswer = 0;
    
    // Generate captcha
    function generateCaptcha() {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      correctAnswer = num1 + num2;
      captchaQuestion.textContent = `What is ${num1} + ${num2}?`;
      captchaAnswer.value = '';
      captchaFeedback.textContent = '';
      captchaFeedback.className = 'captcha-feedback';
    }
    
    // Initialize captcha on page load
    generateCaptcha();
    
    // Open modal
    function openPartnerModal() {
      partnerModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      generateCaptcha();
    }
    
    // Close modal
    function closePartnerModal() {
      partnerModal.classList.remove('active');
      document.body.style.overflow = '';
      partnerForm.reset();
      generateCaptcha();
    }
    
    // Modal triggers
    if (partnerModalTrigger) {
      partnerModalTrigger.addEventListener('click', openPartnerModal);
    }
    
    if (partnerModalClose) {
      partnerModalClose.addEventListener('click', closePartnerModal);
    }
    
    if (partnerModalOverlay) {
      partnerModalOverlay.addEventListener('click', closePartnerModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && partnerModal.classList.contains('active')) {
        closePartnerModal();
      }
    });
    
    // Validate captcha on input
    captchaAnswer.addEventListener('input', () => {
      const userAnswer = parseInt(captchaAnswer.value);
      if (captchaAnswer.value === '') {
        captchaFeedback.textContent = '';
        captchaFeedback.className = 'captcha-feedback';
      } else if (userAnswer === correctAnswer) {
        captchaFeedback.textContent = '✓ Correct!';
        captchaFeedback.className = 'captcha-feedback success';
      } else if (captchaAnswer.value.length > 0) {
        captchaFeedback.textContent = '✗ Incorrect, please try again';
        captchaFeedback.className = 'captcha-feedback error';
      }
    });
    
    // Handle form submission
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const userAnswer = parseInt(captchaAnswer.value);
      
      // Validate captcha
      if (userAnswer !== correctAnswer) {
        captchaFeedback.textContent = '✗ Please solve the captcha correctly';
        captchaFeedback.className = 'captcha-feedback error';
        captchaAnswer.focus();
        return;
      }
      
      // Get form values
      const name = document.getElementById('partnerName').value;
      const email = document.getElementById('partnerEmail').value;
      const phone = document.getElementById('partnerPhone').value;
      const purpose = document.getElementById('partnerPurpose').value;
      const description = document.getElementById('partnerDescription').value;
      
      // Create mailto link
      const subject = `Partnership Inquiry - ${purpose}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Purpose: ${purpose}`,
        '',
        `Message:`,
        description
      ].join('\n');
      
      const mailto = `mailto:lionsclubhosurSIPCOT@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      
      // Close modal and reset form
      setTimeout(() => {
        closePartnerModal();
      }, 500);
    });
  }
});
