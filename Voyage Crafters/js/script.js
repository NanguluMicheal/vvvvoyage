/* NAV MENU */
const menuBtn = document.querySelector('#menu-btn');
const nav = document.querySelector('.header .navbar');
const navClose = document.querySelector('#nav-close');

if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('active'));
if (navClose) navClose.addEventListener('click', () => nav.classList.remove('active'));

/* SEARCH */
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('.search-form');
const closeSearch = document.querySelector('#close-search');

if (searchBtn) {
  searchBtn.addEventListener('click', () => searchForm.classList.add('active'));
}
if (closeSearch) {
  closeSearch.addEventListener('click', () => searchForm.classList.remove('active'));
}

/* HEADER SCROLL EFFECT */
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
  nav.classList.remove('active');
});

/* HERO SLIDER */
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function showSlide(idx) {
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
setInterval(nextSlide, 4000); // Change slide every 4 seconds

/* GALLERY LIGHTBOX */
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const closeLightbox = document.querySelector('#lightbox-close');

if (galleryImages) {
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightbox.classList.add('open');
    });
  });
}
if (closeLightbox) {
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
  });
}

/* TESTIMONIALS CAROUSEL */
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;
let currentTestimonial = 0;
const testimonialInterval = 6000; // 6 seconds

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  testimonialsTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
}
setInterval(nextTestimonial, testimonialInterval);

/* PACKAGES FILTERING */
const destSelect = document.querySelector('#destination-filter');
const minInput = document.querySelector('#min-price');
const maxInput = document.querySelector('#max-price');
const packages = document.querySelectorAll('.packages-container .box');
const applyBtn = document.querySelector('#apply-filters');
const clearBtn = document.querySelector('#clear-filters');

function applyFilters() {
  const destination = destSelect.value;
  const minPrice = parseFloat(minInput.value) || 0;
  const maxPrice = parseFloat(maxInput.value) || Infinity;

  packages.forEach(pkg => {
    const pkgDest = pkg.classList.contains('destination-' + destination) || destination === 'all';
    const pkgPrice = parseFloat(pkg.dataset.price);

    if (pkgDest && pkgPrice >= minPrice && pkgPrice <= maxPrice) {
      pkg.style.display = 'block';
    } else {
      pkg.style.display = 'none';
    }
  });
}
if (applyBtn) applyBtn.addEventListener('click', applyFilters);
if (clearBtn) clearBtn.addEventListener('click', () => {
  destSelect.value = 'all';
  minInput.value = '';
  maxInput.value = '';
  applyFilters();
});

/* FORM VALIDATION */
function validateForm(formId) {
  const form = document.querySelector(formId);
  if (!form) {
    console.error('Form not found:', formId);
    return false;
  }

  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (!input.value.trim()) {
      alert(`Please fill out the "${input.placeholder || input.name}" field.`);
      input.focus();
      return false;
    }

    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      alert("Please enter a valid email address.");
      input.focus();
      return false;
    }

    if (input.type === 'tel' && !/^\d+$/.test(input.value)) {
      alert("Please enter a valid phone number (digits only).");
      input.focus();
      return false;
    }
  }

  // Specific validation for booking form package selection
  if (formId === '#booking-form') {
    const packageSelect = form.querySelector('select[name="package"]');
    if (packageSelect.value === "") {
      alert("Please select a package.");
      packageSelect.focus();
      return false;
    }
  }

  return true;
}

/* BOOKING FORM */
const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm('#booking-form')) {
      const data = new FormData(bookingForm);
      alert(`Thanks ${data.get('name')}! Your booking for ${data.get('package')} is received. We'll contact you at ${data.get('email')}.`);
      bookingForm.reset();
    }
  });
}

/* CONTACT FORM */
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    if (!validateForm('#contact-form')) {
      e.preventDefault();
    } else {
      alert('Message sent successfully!');
    }
  });
}

/* DARK MODE */
const themeToggle = document.querySelector('#theme-toggle');
const userPref = localStorage.getItem('theme');
if (userPref === 'dark') document.body.classList.add('dark');
else if (userPref === 'light') document.body.classList.remove('dark');

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  icon.className = document.body.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon';
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });
  updateThemeIcon();
}