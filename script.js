/**
 * ALEENA ELSA MANU — PERSONAL PORTFOLIO JAVASCRIPT
 * High-Tech Cyber Red & Black Theme with Rich Animations & Interactive FX
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. DOM Elements & State
  // ========================================================================
  const header = document.getElementById('header');
  const mainNav = document.getElementById('main-nav');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  const currentYearSpan = document.getElementById('current-year');
  const cvBtn = document.getElementById('cv-btn');
  const cvModal = document.getElementById('cv-modal');
  const modalClose = document.getElementById('modal-close');
  const modalDismiss = document.getElementById('modal-dismiss');
  const comingSoonBtns = document.querySelectorAll('.project-coming-soon-btn');
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  const bgCanvas = document.getElementById('bg-canvas');
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  const typewriterText = document.getElementById('typewriter-text');

  const TARGET_EMAIL = 'aleenaelsamanu2030@cs.ajce.in';
  let toastTimeout = null;
  let soundEnabled = true;

  // Set dynamic footer year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ========================================================================
  // 2. Synthesized Web Audio Cyber Sound Effects (No External MP3 Needed)
  // ========================================================================
  let audioCtx = null;

  const initAudio = () => {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const playCyberSound = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        // High-tech subtle click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'beep') {
        // Confirmation chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(780, now + 0.06);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'error') {
        // Low alert beep
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {
      // Audio not permitted without interaction
    }
  };

  // Sound Toggle Button
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundToggleBtn.classList.remove('muted');
        soundIcon.className = 'fa-solid fa-volume-high';
        playCyberSound('click');
        showToast('Sound effects enabled', 'fa-solid fa-volume-high');
      } else {
        soundToggleBtn.classList.add('muted');
        soundIcon.className = 'fa-solid fa-volume-xmark';
        showToast('Sound effects muted', 'fa-solid fa-volume-xmark');
      }
    });
  }

  // Bind subtle click sound to buttons
  document.querySelectorAll('.btn, .nav-link, .social-btn, .modal-close-btn, .copy-btn').forEach(el => {
    el.addEventListener('click', () => playCyberSound('click'));
  });

  // ========================================================================
  // 3. Custom Cyber Red Neon Cursor (Follower + Dot)
  // ========================================================================
  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth inertia interpolation loop
    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    // Expand on hoverable elements
    const hoverables = document.querySelectorAll('a, button, input, textarea, .tilt-card, .floating-badge');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
    });

    window.addEventListener('mousedown', () => cursorOutline.classList.add('clicking'));
    window.addEventListener('mouseup', () => cursorOutline.classList.remove('clicking'));
  }

  // ========================================================================
  // 4. Interactive Red Particles & Embers Canvas
  // ========================================================================
  if (bgCanvas && bgCanvas.getContext) {
    const ctx = bgCanvas.getContext('2d');
    let width = (bgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 32 : 65;
    const particles = [];
    const mouse = { x: null, y: null, maxDist: 130 };

    window.addEventListener('resize', () => {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // initial random distribution
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 2.4 + 1.2;
        this.speedY = Math.random() * 0.7 + 0.35; // gentle upward float
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.65 + 0.25;
        this.pulse = Math.random() * 0.02 + 0.01;
        this.pulseDir = 1;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.015) * 0.3;

        // Pulse opacity
        this.opacity += this.pulse * this.pulseDir;
        if (this.opacity > 0.85 || this.opacity < 0.2) {
          this.pulseDir *= -1;
        }

        // Mouse gentle pull
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.maxDist) {
            this.x += (dx / dist) * 0.8;
            this.y += (dy / dist) * 0.8;
          }
        }

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 42, 81, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff2a51';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles with delicate red lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 42, 81, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    };

    requestAnimationFrame(animateParticles);
  }

  // ========================================================================
  // 5. Dynamic Multi-Role Typewriter Effect
  // ========================================================================
  if (typewriterText) {
    const roles = [
      'Aspiring Web Developer',
      'Technology Enthusiast',
      'First-Year B.Tech Student',
      'Lifelong Learner',
      'Creative Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeRole = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typewriterText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at completed word
        typingSpeed = 1900;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 450;
      }

      setTimeout(typeRole, typingSpeed);
    };

    setTimeout(typeRole, 600);
  }

  // ========================================================================
  // 6. 3D Card Tilt Micro-Interaction
  // ========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.matchMedia('(hover: hover)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6.5;
        const rotateY = ((x - centerX) / centerX) * 6.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // ========================================================================
  // 7. Header Scroll Effect & Back-to-Top Visibility
  // ========================================================================
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollPos > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      playCyberSound('click');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================================================
  // 8. Mobile Navigation Drawer
  // ========================================================================
  const toggleMobileNav = (forceState) => {
    const isOpen = typeof forceState === 'boolean' ? forceState : !mainNav.classList.contains('open');
    mainNav.classList.toggle('open', isOpen);
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      playCyberSound('click');
      toggleMobileNav();
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        toggleMobileNav(false);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('open') && 
        !mainNav.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
      toggleMobileNav(false);
    }
  });

  // ========================================================================
  // 9. Active Navigation Link on Scroll
  // ========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navObserverOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));

  // ========================================================================
  // 10. Scroll Reveal Animations & Number Counters
  // ========================================================================
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay');
        if (delay) {
          setTimeout(() => {
            el.classList.add('revealed');
          }, parseInt(delay, 10));
        } else {
          el.classList.add('revealed');
        }
        observer.unobserve(el);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Animated Number Counters
  const counterNumbers = document.querySelectorAll('.counter-number');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target'), 10) || 0;
        let startVal = 0;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / targetVal), 25);

        const timer = setInterval(() => {
          startVal += 1;
          el.textContent = startVal;
          if (startVal >= targetVal) {
            clearInterval(timer);
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterNumbers.forEach(c => counterObserver.observe(c));

  // Skill Bar Progress Animation on Viewport Entry
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillProgressBars = document.querySelectorAll('.skill-progress-fill');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillProgressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') || '50%';
            bar.style.width = progress;
          });
        }
      });
    }, { threshold: 0.25 });

    skillObserver.observe(skillsSection);
  }

  // ========================================================================
  // 11. Toast Notification Helper
  // ========================================================================
  const showToast = (message, iconClass = 'fa-solid fa-circle-check', duration = 4000) => {
    if (!toast) return;

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastMessage.textContent = message;
    if (toastIcon) {
      toastIcon.className = `toast-icon ${iconClass}`;
    }

    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  // ========================================================================
  // 12. 1-Click Copy Email to Clipboard
  // ========================================================================
  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(TARGET_EMAIL);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = TARGET_EMAIL;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      playCyberSound('beep');
      showToast('Email copied to clipboard: ' + TARGET_EMAIL, 'fa-solid fa-clipboard-check');
    } catch {
      showToast('Email: ' + TARGET_EMAIL, 'fa-solid fa-envelope');
    }
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmail();
    });
  }

  // ========================================================================
  // 13. Contact Form Handling & Validation
  // ========================================================================
  if (contactForm) {
    const nameInput = document.getElementById('user_name');
    const emailInput = document.getElementById('user_email');
    const subjectInput = document.getElementById('user_subject');
    const messageInput = document.getElementById('user_message');
    const submitBtn = document.getElementById('submit-btn');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const setError = (input, isValid) => {
      const group = input.closest('.form-group');
      if (!group) return;
      if (isValid) {
        group.classList.remove('has-error');
      } else {
        group.classList.add('has-error');
      }
    };

    [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
      if (!field) return;
      field.addEventListener('input', () => {
        field.closest('.form-group')?.classList.remove('has-error');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      let isValid = true;

      if (!nameVal || nameVal.length < 2) {
        setError(nameInput, false);
        isValid = false;
      } else {
        setError(nameInput, true);
      }

      if (!emailVal || !validateEmail(emailVal)) {
        setError(emailInput, false);
        isValid = false;
      } else {
        setError(emailInput, true);
      }

      if (!subjectVal || subjectVal.length < 3) {
        setError(subjectInput, false);
        isValid = false;
      } else {
        setError(subjectInput, true);
      }

      if (!messageVal || messageVal.length < 10) {
        setError(messageInput, false);
        isValid = false;
      } else {
        setError(messageInput, true);
      }

      if (!isValid) {
        playCyberSound('error');
        showToast('Please fix the highlighted fields to continue.', 'fa-solid fa-triangle-exclamation');
        return;
      }

      playCyberSound('beep');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Initializing Mail Client...';

      const encodedSubject = encodeURIComponent(`[Portfolio Contact] ${subjectVal} - from ${nameVal}`);
      const encodedBody = encodeURIComponent(
        `Hello Aleena,\n\n${messageVal}\n\n---\nSender Details:\nName: ${nameVal}\nEmail: ${emailVal}\nSent via personal portfolio website.`
      );
      const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;

        showToast('Your email client was opened! Review and send your message.', 'fa-solid fa-envelope-circle-check', 6500);

        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }, 750);
    });
  }

  // ========================================================================
  // 14. Curriculum Vitae (CV) Modal Handling
  // ========================================================================
  const toggleCVModal = (show) => {
    if (!cvModal) return;
    if (show) {
      playCyberSound('beep');
      cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      playCyberSound('click');
      cvModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCVModal(true);
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => toggleCVModal(false));
  }

  if (modalDismiss) {
    modalDismiss.addEventListener('click', () => toggleCVModal(false));
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        toggleCVModal(false);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cvModal && cvModal.classList.contains('active')) {
        toggleCVModal(false);
      }
      if (mainNav && mainNav.classList.contains('open')) {
        toggleMobileNav(false);
      }
    }
  });

  // ========================================================================
  // 15. Project "Coming Soon" Notification
  // ========================================================================
  comingSoonBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playCyberSound('beep');
      const projName = btn.getAttribute('data-project') || 'This project';
      showToast(`${projName} is currently under construction as part of 1st-year coursework!`, 'fa-solid fa-code-branch', 4500);
    });
  });

  console.log('Aleena Elsa Manu Cyber Red & Black Portfolio initialized.');
});
