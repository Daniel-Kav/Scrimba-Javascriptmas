// Scroll Animation Handler
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add the animate-on-scroll class to elements you want to animate
document.querySelectorAll('.pricing-card, .testimonial-card, #product > div, .feature-icon').forEach((element) => {
  element.classList.add('animate-on-scroll');
  observer.observe(element);
}); 