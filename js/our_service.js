document.addEventListener('DOMContentLoaded', function() {
  // Animation is handled by CSS
  
  // Add extra animation for cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });
  
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    observer.observe(card);
  });
  
  // Add hovering effect for icons
  cards.forEach(card => {
    const icon = card.querySelector('.service-icon');
    
    card.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.1) rotate(15deg)';
      icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});