/* ============================================
   RAJU BHOWMICK'S COACHING CENTER
   Main JavaScript
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // PRELOADER
  // ============================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2000);
  }

  // ============================================
  // NAVIGATION
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // HERO PARTICLES
  // ============================================
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      particlesContainer.appendChild(particle);
    }
  }

  // ============================================
  // TYPING TEXT EFFECT
  // ============================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const phrases = [
      'Premier coaching institute for Arts and Language groups in Kolkata.',
      'Class VII to Graduation — expert guidance across all humanities subjects.',
      'English, Bengali, History, Geography, Political Science & more.',
      '25 years of shaping young minds and building academic careers.',
      'Kolkata\'s most trusted coaching centre since 2001.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        currentText = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      typingElement.textContent = currentText;

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2500);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
        return;
      }

      const speed = isDeleting ? 30 : 60;
      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  // ============================================
  // SCROLL REVEAL
  // ============================================
  const scrollReveals = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  scrollReveals.forEach(el => revealObserver.observe(el));

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = Math.ceil(target / 80);
      const duration = 2000;
      const stepTime = Math.floor(duration / 80);

      const updateCounter = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          return;
        }
        counter.textContent = current.toLocaleString();
        setTimeout(updateCounter, stepTime);
      };
      updateCounter();
    });
  }

  // Start counters when stats section is visible
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // Hero counters (simpler)
  const heroStatNums = document.querySelectorAll('.hero-stat-num');
  heroStatNums.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    let current = 0;
    const increment = Math.ceil(target / 60);
    const update = () => {
      current += increment;
      if (current >= target) {
        stat.textContent = target.toLocaleString();
        return;
      }
      stat.textContent = current.toLocaleString();
      requestAnimationFrame(() => setTimeout(update, 30));
    };
    setTimeout(update, 1000);
  });

  // ============================================
  // ACHIEVEMENT SLIDER
  // ============================================
  const slider = document.getElementById('achievementSlider');
  const slides = slider ? slider.querySelectorAll('.achievement-slide') : [];
  const tabs = document.querySelectorAll('.achievement-tab');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;

  if (slider && slides.length > 0) {
    function goToSlide(index) {
      currentSlide = index;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;

      tabs.forEach(t => t.classList.remove('active'));
      const activeTab = document.querySelector(`.achievement-tab[data-year="${slides[currentSlide].getAttribute('data-year')}"]`);
      if (activeTab) activeTab.classList.add('active');
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const year = tab.getAttribute('data-year');
        for (let i = 0; i < slides.length; i++) {
          if (slides[i].getAttribute('data-year') === year) {
            goToSlide(i);
            break;
          }
        }
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
      });
    }

    // Auto slide
    let autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    }, 5000);

    const sliderContainer = document.querySelector('.achievement-slider-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % slides.length;
          goToSlide(currentSlide);
        }, 5000);
      });
    }
  }

  // ============================================
  // TESTIMONIAL SLIDER
  // ============================================
  const testimonialSlider = document.getElementById('testimonialSlider');
  const testimonialCards = testimonialSlider ? testimonialSlider.querySelectorAll('.testimonial-card') : [];
  const dotsContainer = document.getElementById('testimonialDots');
  let currentTestimonial = 0;

  if (testimonialSlider && testimonialCards.length > 0) {
    // Create dots
    testimonialCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goToTestimonial(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function goToTestimonial(index) {
      currentTestimonial = index;
      testimonialSlider.style.transform = `translateX(-${currentTestimonial * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[currentTestimonial].classList.add('active');
    }

    // Auto slide
    let testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      goToTestimonial(currentTestimonial);
    }, 5000);

    const testimonialContainer = document.querySelector('.testimonial-slider-container');
    if (testimonialContainer) {
      testimonialContainer.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
      testimonialContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
          currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
          goToTestimonial(currentTestimonial);
        }, 5000);
      });
    }
  }

  // ============================================
  // GALLERY LIGHTBOX
  // ============================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentImage = 0;

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    function openLightbox(index) {
      currentImage = index;
      const item = galleryItems[currentImage];
      const placeholder = item.querySelector('.gallery-placeholder');
      const overlayText = item.querySelector('.gallery-overlay span');
      const clone = placeholder.cloneNode(true);
      clone.classList.add('large');

      lightboxContent.innerHTML = '';
      lightboxContent.appendChild(clone);
      if (overlayText) {
        const textEl = document.createElement('div');
        textEl.style.cssText = 'text-align:center;color:#D4AF37;margin-top:16px;font-size:1.2rem;font-weight:600;';
        textEl.textContent = overlayText.textContent;
        lightboxContent.appendChild(textEl);
      }
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
      currentImage = (currentImage + direction + galleryItems.length) % galleryItems.length;
      openLightbox(currentImage);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  // ============================================
  // ADMISSION FORM
  // ============================================
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const studentClass = document.getElementById('formClass').value;
      const board = document.getElementById('formBoard').value;
      const subject = document.getElementById('formSubject').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !studentClass || !board || !phone) {
        alert('Please fill in all required fields.');
        return;
      }

      // WhatsApp message
      const whatsappMsg = `*New Enquiry - Raju Bhowmick's Coaching Center*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Class:* ${encodeURIComponent(studentClass)}%0A*Board:* ${encodeURIComponent(board)}%0A*Subject:* ${encodeURIComponent(subject || 'Not specified')}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Message:* ${encodeURIComponent(message || 'No message')}`;

      const whatsappURL = `https://wa.me/919830298132?text=${whatsappMsg}`;
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');

      admissionForm.reset();

      // Show success feedback
      const submitBtn = admissionForm.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✓ Sent Successfully!';
      submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 3000);
    });
  }

  // ============================================
  // BACK TO TOP
  // ============================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // PARALLAX EFFECT ON HERO
  // ============================================
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.scrollY;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
      }
    }
  });

});
