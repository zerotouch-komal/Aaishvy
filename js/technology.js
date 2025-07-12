// BACKEND TECHNOLOGY
document.getElementById("java-icon").src = "assets/java.png";
document.getElementById("nodejs-icon").src = "assets/node.png";
document.getElementById("dotnet-icon").src = "assets/net.png";
document.getElementById("golang-icon").src = "assets/go.png";
document.getElementById("python-icon").src = "assets/Python.png";
document.getElementById("php-icon").src = "assets/Php.png";
document.getElementById("spring-icon").src = "assets/spring.png";

// FORNTEND TECHNOLOGY
document.getElementById("react-icon").src = "assets/React.png";
document.getElementById("angular-icon").src = "assets/A.png";
document.getElementById("ts-icon").src = "assets/Ts.png";
document.getElementById("redux-icon").src = "assets/Redux.png";
document.getElementById("html-icon").src = "assets/Html.png";
document.getElementById("css-icon").src = "assets/Css.png";
document.getElementById("bootstrap-icon").src = "assets/B.png";
document.getElementById("tailwind-icon").src = "assets/tailwind.png";

// APPLICATION TECHNOLOGY
document.getElementById("react-native-icon").src = "assets/React.png";
document.getElementById("flutter-icon").src = "assets/Flutter.png";
document.getElementById("android-icon").src = "assets/Android.png";
document.getElementById("ios-icon").src = "assets/Ios.png";

// Create floating particles effect
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const numParticles = 50;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    // Random size
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random opacity and color
    const opacity = Math.random() * 0.5 + 0.1;
    const colors = [
      "rgba(71, 118, 230,",
      "rgba(142, 84, 233,",
      "rgba(104, 160, 99,",
      "rgba(32, 178, 204,",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `${color} ${opacity})`;

    // Animation
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

    particlesContainer.appendChild(particle);
  }
}

// Add hover effect for tech cards
const techCards = document.querySelectorAll(".tech-card");
techCards.forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on mouse position
    const rotateY = (x - centerX) / 20;
    const rotateX = (centerY - y) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform = "";
    setTimeout(() => {
      card.style.transition =
        "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.6s ease";
    }, 100);
  });
});

// Staggered animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  techCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // Create particles effect
  createParticles();
});

// Animate the particles
function animateParticles() {
  const particles = document.querySelectorAll(".particle");

  particles.forEach((particle) => {
    // Generate random movement
    const moveX = (Math.random() - 0.5) * 0.5;
    const moveY = (Math.random() - 0.5) * 0.5;

    const currentX = parseFloat(particle.style.left);
    const currentY = parseFloat(particle.style.top);

    let newX = currentX + moveX;
    let newY = currentY + moveY;

    // Keep particles within the container
    if (newX < 0) newX = 0;
    if (newX > 100) newX = 100;
    if (newY < 0) newY = 0;
    if (newY > 100) newY = 100;

    particle.style.left = `${newX}%`;
    particle.style.top = `${newY}%`;
  });

  requestAnimationFrame(animateParticles);
}

// Start particle animation
animateParticles();
