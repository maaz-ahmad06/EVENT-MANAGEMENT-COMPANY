/* ==========================================================================
   AURAEVENTS PREMIUM INTERACTIVE JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // PRELOADER DISPOSAL
  // ==========================================================================
  const preloader = document.getElementById('preloader');
  
  // Set explicit minimum load time of 2.5 seconds
  setTimeout(() => {
    preloader.classList.add('fade-out');
    // Remove from layout after fade animation is done
    preloader.addEventListener('transitionend', () => {
      preloader.remove();
    });
  }, 2500);

  // ==========================================================================
  // CUSTOM CURSOR LERP (SMOOTH INTERPOLATION)
  // ==========================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  let dotX = 0, dotY = 0; // Current position of dot (instant)
  let outlineX = 0, outlineY = 0; // Current position of outline (interpolated)
  let targetX = 0, targetY = 0; // Target coordinates (mouse position)
  
  const speed = 0.15; // Speed multiplier for smooth outline lag
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    
    if (!isMoving) {
      isMoving = true;
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    }
  });

  // Main animation frame for cursor layout
  function animateCursor() {
    // Lerping calculations
    outlineX += (targetX - outlineX) * speed;
    outlineY += (targetY - outlineY) * speed;
    
    // Position dot instantly
    cursorDot.style.left = `${targetX}px`;
    cursorDot.style.top = `${targetY}px`;
    
    // Position outline smoothly
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hide cursor on leaving window boundaries
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
    isMoving = false;
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
  });

  // Hover states for interactive elements
  const hoverables = document.querySelectorAll('a, button, select, input, textarea, .service-card, .gallery-card, .filter-btn, .dot');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('custom-cursor-hover-dot');
      cursorOutline.classList.add('custom-cursor-hover-outline');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('custom-cursor-hover-dot');
      cursorOutline.classList.remove('custom-cursor-hover-outline');
    });
  });

  // ==========================================================================
  // STICKY NAVBAR & ACTIVE NAVIGATION
  // ==========================================================================
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Sticky Header toggle
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section link highlighter
    let currentSectionId = 'home';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // MOBILE SIDE NAVIGATION MENU
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const mobileNavLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Auto-close menu when a navigation item is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // ==========================================================================
  // SCROLL ENTRANCE OBSERVER ANIMATIONS
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Unobserve once shown to save layout cycles
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fits screen
  });

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });

  // ==========================================================================
  // PORTFOLIO GALLERY CATEGORY FILTER
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button highlights
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // ==========================================================================
  // PORTFOLIO GALLERY LIGHTBOX MODAL
  // ==========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const galleryCards = document.querySelectorAll('.gallery-card');

  let activeImages = []; // List of currently visible (filtered) images
  let currentImgIndex = 0;

  // Build current active image list for next/prev operations
  function updateActiveImages() {
    activeImages = [];
    galleryItems.forEach(item => {
      if (!item.classList.contains('hide')) {
        const img = item.querySelector('.gallery-img');
        const title = item.querySelector('.gallery-card-title').innerText;
        activeImages.push({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt'),
          title: title
        });
      }
    });
  }

  // Open Lightbox
  galleryCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      updateActiveImages();
      
      const currentSrc = card.querySelector('.gallery-img').getAttribute('src');
      currentImgIndex = activeImages.findIndex(img => img.src === currentSrc);

      showLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scroll
    });
  });

  function showLightboxImage() {
    if (activeImages[currentImgIndex]) {
      lightboxImg.setAttribute('src', activeImages[currentImgIndex].src);
      lightboxImg.setAttribute('alt', activeImages[currentImgIndex].alt);
      lightboxCaption.innerText = activeImages[currentImgIndex].title;
    }
  }

  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Next / Prev triggers
  function showNextImage() {
    if (activeImages.length > 0) {
      currentImgIndex = (currentImgIndex + 1) % activeImages.length;
      showLightboxImage();
    }
  }

  function showPrevImage() {
    if (activeImages.length > 0) {
      currentImgIndex = (currentImgIndex - 1 + activeImages.length) % activeImages.length;
      showLightboxImage();
    }
  }

  lightboxNext.addEventListener('click', showNextImage);
  lightboxPrev.addEventListener('click', showPrevImage);

  // Keyboard navigation inside lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    }
  });

  // ==========================================================================
  // CLIENT TESTIMONIALS CAROUSEL
  // ==========================================================================
  const slides = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let testimonialIndex = 0;
  let testimonialTimer;

  function showTestimonial(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    testimonialIndex = index;
  }

  function nextTestimonial() {
    let nextIndex = (testimonialIndex + 1) % slides.length;
    showTestimonial(nextIndex);
  }

  // Auto switch slide every 5 seconds
  function startTestimonialRotation() {
    testimonialTimer = setInterval(nextTestimonial, 5000);
  }

  function resetTestimonialRotation() {
    clearInterval(testimonialTimer);
    startTestimonialRotation();
  }

  // Click dot event listener
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIdx = parseInt(dot.getAttribute('data-slide'));
      showTestimonial(slideIdx);
      resetTestimonialRotation();
    });
  });

  startTestimonialRotation();

  // ==========================================================================
  // BOOKING FORM INPUT VALIDATOR
  // ==========================================================================
  const bookingForm = document.getElementById('booking-form');
  const toast = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close-btn');

  // Input selectors
  const inputs = {
    name: document.getElementById('client-name'),
    email: document.getElementById('client-email'),
    phone: document.getElementById('client-phone'),
    eventType: document.getElementById('event-type'),
    eventDate: document.getElementById('event-date'),
    guestCount: document.getElementById('guest-count')
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear validation flags when input content changes
  Object.keys(inputs).forEach(key => {
    const field = inputs[key];
    field.addEventListener('input', () => {
      const formGroup = field.closest('.form-group');
      if (formGroup.classList.contains('invalid')) {
        formGroup.classList.remove('invalid');
      }
    });
  });

  // Validation routines
  function validateForm() {
    let isValid = true;

    // Validate Name
    if (inputs.name.value.trim() === '') {
      inputs.name.closest('.form-group').classList.add('invalid');
      isValid = false;
    }

    // Validate Email
    if (!emailRegex.test(inputs.email.value.trim())) {
      inputs.email.closest('.form-group').classList.add('invalid');
      isValid = false;
    }

    // Validate Phone
    if (inputs.phone.value.trim() === '') {
      inputs.phone.closest('.form-group').classList.add('invalid');
      isValid = false;
    }

    // Validate Event Category
    if (inputs.eventType.value === '') {
      inputs.eventType.closest('.form-group').classList.add('invalid');
      isValid = false;
    }

    // Validate Proposed Date
    if (inputs.eventDate.value === '') {
      inputs.eventDate.closest('.form-group').classList.add('invalid');
      isValid = false;
    } else {
      const selectedDate = new Date(inputs.eventDate.value);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        inputs.eventDate.closest('.form-group').classList.add('invalid');
        const errorSpan = document.getElementById('error-eventDate');
        errorSpan.innerText = 'Date cannot be in the past';
        isValid = false;
      }
    }

    // Validate Guests Count
    const countVal = parseInt(inputs.guestCount.value);
    if (isNaN(countVal) || countVal < 10) {
      inputs.guestCount.closest('.form-group').classList.add('invalid');
      isValid = false;
    }

    return isValid;
  }

  // Handle form submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Trigger success animations and show Toast
      toast.classList.add('show');
      bookingForm.reset();

      // Automatically slide toast out after 6 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 6000);
    }
  });

  // Close toast banner early
  toastClose.addEventListener('click', () => {
    toast.classList.remove('show');
  });

});
