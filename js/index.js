document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
      const mobileMenu = document.querySelector(".mobile-menu");
      const mobileMenuClose = document.querySelector(".mobile-menu-close");
      const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");

      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function () {
          mobileMenu.classList.add("active");
          mobileMenuOverlay.classList.add("active");
          document.body.style.overflow = "hidden";
        });

        if (mobileMenuClose) {
          mobileMenuClose.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
            mobileMenuOverlay.classList.remove("active");
            document.body.style.overflow = "";
          });
        }

        if (mobileMenuOverlay) {
          mobileMenuOverlay.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
            mobileMenuOverlay.classList.remove("active");
            document.body.style.overflow = "";
          });
        }
      }
    })
    .catch((error) => {
      console.error("Error loading navbar:", error);
    });

  const heroHeading = document.querySelector(".hero-heading");
  const heroSubheading = document.querySelector(".hero-subheading");
  const heroImage = document.querySelector(".hero-image img");

  if (heroHeading && heroSubheading && heroImage) {
    const headingText = heroHeading.textContent;
    const subheadingText = heroSubheading.textContent;

    heroHeading.textContent = "";
    heroSubheading.textContent = "";

    if (window.innerWidth > 768) {
      heroImage.style.transform = "translateY(-100%)";
    } else {
      heroImage.style.transform = "translateY(0)";
    }

    heroImage.style.transition = "transform 1.5s ease-out";

    function typeWriter(element, text, speed, callback) {
      let i = 0;
      element.classList.add("typing");

      const interval = setInterval(function () {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          element.classList.remove("typing");
          element.classList.add("typing-done");
          if (callback) callback();
        }
      }, speed);
    }

    setTimeout(() => {
      heroImage.style.transform = "translateY(0)";

      setTimeout(() => {
        typeWriter(heroHeading, headingText, 50, function () {
          setTimeout(() => {
            typeWriter(heroSubheading, subheadingText, 30);
          }, 300);
        });
      }, 800);
    }, 300);
  }
});

// CUSTOMER SECTION
// Animation for cards on scroll
document.addEventListener("DOMContentLoaded", () => {
  const storyCards = document.querySelectorAll(".story-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = `fadeInUp 0.8s ease forwards ${
              index * 0.2
            }s`;
          }, 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  storyCards.forEach((card) => {
    observer.observe(card);
  });

  // Create stars in the background
  createStars();

  // Initialize popup functionality
  initPopup();
});

// Create animated stars in the background
function createStars() {
  const stars = document.querySelector(".stars");
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random position
    const x = Math.random() * screenWidth;
    const y = Math.random() * screenHeight;

    // Random size
    const size = Math.random() * 3;

    // Random animation delay
    const delay = Math.random() * 5;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;

    stars.appendChild(star);
  }
}

// Initialize popup functionality
function initPopup() {
  const storyCards = document.querySelectorAll(".story-card");
  const popup = document.querySelector(".testimonial-popup");
  const closePopup = document.querySelector(".close-popup");

  const caseStudies = [
    {
      id: 1,
      title: "Smart Agriculture IoT Platform",
      company:
        "We help businesses across industries stay competitive by optimizing their offerings to customers and service seekers.",
      description:
        "We developed an advanced platform for a client in the agriculture industry that controls heavy engines using AWS IoT and provides real-time data dashboards. The frontend was built with React, while the backend was implemented using Terraform with AWS Serverless technologies, including Aurora DB (MySQL), DynamoDB, API Gateway (Lambdas), IoT Core, and Cognito for user management.",
      stats: [
        {
          value: "✔",
          label:
            "Google Maps-based farming platform for efficient management and tracking of multiple farming sites with interactive operations.",
        },
        {
          value: "✔",
          label:
            "Farming staff management and task assignment for streamlined workflows and improved productivity.",
        },
        {
          value: "✔",
          label:
            "Centralized control plane for seamless management and coordination of the entire farming staff.",
        },
      ],
    },
    {
      id: 2,
      title: "Enterprise Tax Solution",
      company:
        "We take pride in delivering innovative, customized software solutions that enhance efficiency and productivity for our clients.",
      description:
        "We built a sophisticated tax platform for tax professionals and small to medium-sized businesses, leveraging cutting-edge technologies and a microservice architecture on AWS. Virstack designed the entire platform, delivering a full-scale MVP in under 4 months.",
      stats: [
        {
          value: "✔",
          label:
            "Seamless user onboarding with standard sign-up, Single Sign-On (SSO), and Federated Identity Management (FIM) via Google and LinkedIn.",
        },
        {
          value: "✔",
          label:
            "Improved security with Email and Mobile OTP (One-Time Password) for user management.",
        },
        {
          value: "✔",
          label:
            "Effortless communication with a fully integrated user feed and chat engine.",
        },
      ],
    },
    {
      id: 3,
      title: "Next-Gen Trading Platform",
      company: "We specialize in crafting intuitive, seamless user experiences that enhance engagement and drive higher conversion rates.",
      description:
        "We created a native, feature-rich mobile experience for iOS and Android for an innovative investment trading platform, designed to simplify access to and replication of professional wealth managers' investment strategies.",
      stats: [
        {
          value: "✔",
          label:
            "Explore the marketplace and filter strategies by risk, cost, trader type, or investment amount.",
        },
        {
          value: "✔",
          label:
            "Evaluate the firm and advisors overseeing the performance of each strategy.",
        },
        {
          value: "✔",
          label:
            "Centralized control plane for seamless management and coordination of the entire farming staff.",
        },
      ],
    },
  ];

  storyCards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = parseInt(card.getAttribute("data-id"));
      const study = caseStudies.find((s) => s.id === id);

      if (study) {
        document.getElementById("popup-title").textContent = study.title;
        document.getElementById("popup-company").textContent = study.company;
        document.getElementById("popup-description").textContent =
          study.description;

        // Update stats
        document.getElementById("stat1-value").textContent =
          study.stats[0].value;
        document.getElementById("stat1-label").textContent =
          study.stats[0].label;
        document.getElementById("stat2-value").textContent =
          study.stats[1].value;
        document.getElementById("stat2-label").textContent =
          study.stats[1].label;
        document.getElementById("stat3-value").textContent =
          study.stats[2].value;
        document.getElementById("stat3-label").textContent =
          study.stats[2].label;

        // Show popup with animation
        popup.classList.add("active");

        // Animate the stats with counting effect
        animateStats();
      }
    });
  });

  closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  // Close popup when clicking outside content
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });
}

// Animate stats with counting effect
function animateStats() {
  const statValues = document.querySelectorAll(".stat-value");

  statValues.forEach((stat) => {
    const value = stat.textContent;

    // If it's a percentage or has a special character
    if (value.includes("%") || value.includes("$") || value.includes("x")) {
      const prefix = value.match(/[^\d.]/)[0];
      const numValue = parseFloat(value.replace(/[^\d.]/g, ""));

      // If it's a number we can animate
      if (!isNaN(numValue)) {
        let startValue = 0;
        const duration = 1500;
        const increment = numValue / (duration / 16);

        stat.textContent = prefix + startValue;

        const counter = setInterval(() => {
          startValue += increment;

          if (startValue >= numValue) {
            clearInterval(counter);
            stat.textContent = value;
          } else {
            // Format based on the original value format
            if (value.includes(".")) {
              stat.textContent = prefix + startValue.toFixed(1);
            } else {
              stat.textContent = prefix + Math.floor(startValue);
            }
          }
        }, 16);
      }
    }
  });
}

// Add hover effect to cards
document.querySelectorAll(".story-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    // Add pulsing animation to the link button
    const link = card.querySelector(".story-link");
    link.style.animation = "pulse 1.5s infinite";
  });

  card.addEventListener("mouseleave", () => {
    // Remove pulsing animation
    const link = card.querySelector(".story-link");
    link.style.animation = "";
  });
});

// CILENT SECTION
document.addEventListener("DOMContentLoaded", function () {
  // Client data - replace with your actual clients
  const clients = [
    { name: "Tech Solutions Inc.", logo: "assets/client1.png" },
    { name: "Global Innovations", logo: "assets/client2.png" },
    { name: "Digital Dynamics", logo: "assets/client3.png" },
    { name: "Future Systems", logo: "assets/client4.png" },
    { name: "Creative Networks", logo: "assets/client5.png" },
    { name: "Smart Enterprises", logo: "assets/client6.png" },
    { name: "Elite Technologies", logo: "assets/client7.png" },
    { name: "Vision Partners", logo: "assets/client8.png" },
    { name: "Digital Dynamics", logo: "assets/client9.png" },
    { name: "Future Systems", logo: "assets/client10.png" },
    { name: "Creative Networks", logo: "assets/client11.png" },
    { name: "Smart Enterprises", logo: "assets/client12.png" },
    { name: "Elite Technologies", logo: "assets/client13.png" },
    { name: "Vision Partners", logo: "assets/client14.png" },
  ];
  const clientTrack = document.getElementById("clientTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");
  // Create client cards
  clients.forEach((client) => {
    const card = document.createElement("div");
    card.className = "client-card";
    card.innerHTML = `
          <img class="client-logo" src="${client.logo}" alt="${client.name}" />
      `;
    // Add appearing animation for each card
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    clientTrack.appendChild(card);
  });
  // Calculate scroll position and limits
  const cardWidth = 320; // card width + margins
  let position = 0;
  const maxScroll = clients.length * cardWidth - window.innerWidth;
  // Animate cards appearing
  setTimeout(() => {
    const cards = document.querySelectorAll(".client-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 150);
    });
  }, 500);
  // Update progress bar
  function updateProgress() {
    const progress = (position / maxScroll) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }
  // Scroll functions
  function scrollLeft() {
    position = Math.max(position - cardWidth * 2, 0);
    clientTrack.style.transform = `translateX(-${position}px)`;
    updateProgress();
  }
  function scrollRight() {
    position = Math.min(position + cardWidth * 2, maxScroll);
    clientTrack.style.transform = `translateX(-${position}px)`;
    updateProgress();
  }
  // Button event listeners
  prevBtn.addEventListener("click", scrollLeft);
  nextBtn.addEventListener("click", scrollRight);
  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") scrollLeft();
    if (e.key === "ArrowRight") scrollRight();
  });
  // Mouse wheel horizontal scrolling
  clientTrack.parentElement.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (e.deltaY > 0) scrollRight();
      else scrollLeft();
    },
    { passive: false }
  );
  // Touch scrolling
  let touchStartX = 0;
  clientTrack.parentElement.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  clientTrack.parentElement.addEventListener(
    "touchmove",
    (e) => {
      const touchDiff = touchStartX - e.touches[0].clientX;
      if (Math.abs(touchDiff) > 50) {
        if (touchDiff > 0) scrollRight();
        else scrollLeft();
        touchStartX = e.touches[0].clientX;
      }
      e.preventDefault();
    },
    { passive: false }
  );
  // Auto scroll animation
  let autoScrollInterval;
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (position >= maxScroll) {
        position = 0;
      } else {
        position += cardWidth;
      }
      clientTrack.style.transform = `translateX(-${position}px)`;
      updateProgress();
    }, 3000);
  }
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  // Start auto scroll
  startAutoScroll();
  // Stop on hover
  clientTrack.parentElement.addEventListener("mouseenter", stopAutoScroll);
  clientTrack.parentElement.addEventListener("mouseleave", startAutoScroll);
  // Float animation for cards
  function floatAnimation() {
    const cards = document.querySelectorAll(".client-card");
    cards.forEach((card, index) => {
      const delay = index * 0.4;
      card.animate(
        [
          { transform: "translateY(0px)" },
          { transform: "translateY(-5px)" },
          { transform: "translateY(0px)" },
        ],
        {
          duration: 3000,
          delay: delay * 1000,
          iterations: Infinity,
        }
      );
    });
  }
  // Initialize float animation
  floatAnimation();
  // Update progress initially
  updateProgress();
});

//

// Create particle animation
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("particleContainer");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }

  // Add smooth scroll effect
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

function createParticle(container) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // Random size between 2px and 6px
  const size = Math.random() * 4 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Random position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;

  // Random opacity
  particle.style.opacity = Math.random() * 0.5 + 0.3;

  // Random animation duration
  const duration = Math.random() * 20 + 10;
  particle.style.animationDuration = `${duration}s`;

  // Random animation delay
  const delay = Math.random() * 5;
  particle.style.animationDelay = `${delay}s`;

  container.appendChild(particle);
}

// Add parallax effect
document.addEventListener("mousemove", function (e) {
  const heroContent = document.querySelector(".hero-content");
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

  heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// SERVICE SECTION
document.addEventListener("DOMContentLoaded", function () {
  // Create particles
  createParticles();

  // Add hover effect for headline
  const headline = document.querySelector(".headline");
  headline.addEventListener("mouseover", function () {
    this.style.transform = "translateY(-5px)";
    this.style.transition = "transform 0.3s ease";
  });

  headline.addEventListener("mouseout", function () {
    this.style.transform = "translateY(0)";
  });

  // Parallax effect
  document.addEventListener("mousemove", function (e) {
    const parallaxItems = document.querySelectorAll(
      ".right-content, .left-content"
    );
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    parallaxItems.forEach(function (item, index) {
      const speed = index === 0 ? 2 : 1;
      item.style.transform = `translate(${moveX * speed}px, ${
        moveY * speed
      }px)`;
    });
  });
});

function createParticles() {
  const container = document.getElementById("particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size between 2px and 8px
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;

    // Create floating animation
    const animDuration = Math.random() * 20 + 10;
    const animDelay = Math.random() * 5;
    const animX = Math.random() * 100 - 50;
    const animY = Math.random() * 100 - 50;

    particle.style.animation = `floatParticle ${animDuration}s infinite alternate ease-in-out ${animDelay}s`;

    // Create keyframe animation dynamically
    const keyframes = `
          @keyframes floatParticle {
              0% {
                  transform: translate(0, 0);
              }
              100% {
                  transform: translate(${animX}px, ${animY}px);
              }
          }
      `;

    const style = document.createElement("style");
    style.innerHTML = keyframes;
    document.head.appendChild(style);

    container.appendChild(particle);
  }
}

//
// Create particles effect with glowing particles
function createParticles() {
  const container = document.getElementById("particles");
  const colors = ["#3a1c71", "#d76d77", "#ffaf7b", "#a17fe0", "#5d26c1"];

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random styling
    const size = Math.random() * 18 + 5;
    const colorIndex = Math.floor(Math.random() * colors.length);

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = colors[colorIndex];
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 30 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.boxShadow = `0 0 ${size}px ${colors[colorIndex]}`;
    particle.style.filter = "blur(1px)";

    container.appendChild(particle);
  }
}

// Add glowing elements
function addGlowElements() {
  const section = document.querySelector(".about-section");
  const positions = [
    { top: "15%", left: "75%" },
    { top: "80%", left: "25%" },
    { top: "40%", left: "85%" },
  ];

  positions.forEach((pos) => {
    const glow = document.createElement("div");
    glow.classList.add("glow-effect");
    glow.style.top = pos.top;
    glow.style.left = pos.left;
    glow.style.animationDelay = `${Math.random() * 2}s`;
    section.appendChild(glow);
  });
}

// Animate features with staggered timing
function animateFeatures() {
  const features = document.querySelectorAll(".feature-card");

  features.forEach((feature, index) => {
    feature.style.animation = `fadeUp 0.8s forwards ${0.8 + index * 0.2}s`;
  });
}

// Initialize animations when the page loads
window.addEventListener("load", () => {
  createParticles();
  animateFeatures();
  addGlowElements();
});

// Add parallax effect on scroll
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const bgImage = document.querySelector(".bg-image");
  const diagonalDivider = document.querySelector(".diagonal-divider");
  const featureCards = document.querySelectorAll(".feature-card");

  // Parallax effect for background
  bgImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;

  // Subtle movement for diagonal divider
  diagonalDivider.style.transform = `skewY(-8deg) translateY(${
    scrollPosition * 0.05
  }px)`;

  // Add subtle rotation to feature cards on scroll
  featureCards.forEach((card, index) => {
    const rotateValue = Math.sin(scrollPosition * 0.003 + index) * 1;
    card.style.transform = `translateY(0) rotate(${rotateValue}deg)`;
  });
});

// Add interactive mouse movement effects
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const icons = document.querySelectorAll(".feature-icon");
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Make icons subtly follow mouse cursor
  icons.forEach((icon, index) => {
    const moveX = ((mouseX - windowWidth / 2) / windowWidth) * 10;
    const moveY = ((mouseY - windowHeight / 2) / windowHeight) * 10;

    // Different movement for each icon based on index
    const factor = index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0.5;

    icon.style.transform = `translate(${moveX * factor}px, ${
      moveY * factor
    }px)`;
  });

  // Adjust headline glow based on mouse position
  const headlineGlow = document.querySelector(
    ".headline-container .glow-effect"
  );
  if (headlineGlow) {
    headlineGlow.style.left = `${(mouseX / windowWidth) * 40 + 10}%`;
    headlineGlow.style.top = `${(mouseY / windowHeight) * 40 + 10}%`;
  }
});

// SERVICE SECTION
// Animate service cards on scroll
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");

  // Animation for service cards
  function animateCards() {
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 300 * index);
    });
  }

  // Trigger animations when page loads
  animateCards();

  // Create particles
  const particlesContainer = document.getElementById("particles-container");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;

    // Random size
    const size = Math.random() * 5 + 1;

    // Set particle properties
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random color variations
    const hue = Math.random() > 0.5 ? "100, 255, 218" : "0, 191, 255";
    const opacity = Math.random() * 0.3 + 0.1;
    particle.style.background = `rgba(${hue}, ${opacity})`;

    // Add particle to container
    particlesContainer.appendChild(particle);

    // Animate the particle
    animateParticle(particle);
  }

  function animateParticle(particle) {
    // Random duration
    const duration = Math.random() * 15 + 10;
    // Random direction
    const directionX = Math.random() * 100 - 50;
    const directionY = Math.random() * 100 - 50;

    // Apply animation
    particle.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${directionX}px, ${directionY}px)` },
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );

    // Opacity animation
    particle.animate([{ opacity: 0.1 }, { opacity: 0.5 }, { opacity: 0.1 }], {
      duration: Math.random() * 5000 + 3000,
      iterations: Infinity,
      direction: "alternate",
      easing: "ease-in-out",
    });
  }

  // Interactive hover effect for buttons
  const buttons = document.querySelectorAll(".learn-more-btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 5px 15px rgba(100, 255, 218, 0.3)";
    });

    button.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });

    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(1px)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-3px)";
    });
  });

  // Parallax effect for floating shapes
  document.addEventListener("mousemove", function (e) {
    const shapes = document.querySelectorAll(".shape");
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
      const factor = (index + 1) * 10;
      const moveX = (mouseX - 0.5) * factor;
      const moveY = (mouseY - 0.5) * factor;

      shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${
        moveX * 2
      }deg)`;
    });
  });
});

// CUSTOMER SECTION
// Animate categories on scroll
document.addEventListener("DOMContentLoaded", function () {
  const techCategories = document.querySelectorAll(".tech-category");

  // Create and position orbs
  const floatingOrbs = document.getElementById("floating-orbs");
  createOrbs(15);

  function createOrbs(num) {
    for (let i = 0; i < num; i++) {
      const orb = document.createElement("div");
      orb.classList.add("orb");

      // Random size
      const size = Math.random() * 100 + 50;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      orb.style.left = `${x}%`;
      orb.style.top = `${y}%`;

      // Random animation
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;
      orb.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite alternate, pulse ${
        duration / 2
      }s ease-in-out ${delay}s infinite`;

      floatingOrbs.appendChild(orb);
    }
  }

  // Set up intersection observer for category animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCategory(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe each category
  techCategories.forEach((category) => {
    observer.observe(category);
  });

  function animateCategory(category) {
    // Animate category entrance
    setTimeout(() => {
      category.style.opacity = "1";
      category.style.transform = "translateY(0)";
    }, 100);

    // Stagger animate tech logos
    const logos = category.querySelectorAll(".tech-logo");
    logos.forEach((logo, index) => {
      setTimeout(() => {
        logo.style.transform = "scale(0.8)";
        logo.style.opacity = "0";

        // Animate in
        setTimeout(() => {
          logo.style.transform = "scale(1)";
          logo.style.opacity = "1";

          // Add subtle hover animation
          logo.addEventListener("mouseenter", () => {
            const icons = document.querySelectorAll(".tech-logo");
            icons.forEach((icon) => {
              if (icon !== logo) {
                icon.style.opacity = "0.5";
              }
            });
          });

          logo.addEventListener("mouseleave", () => {
            const icons = document.querySelectorAll(".tech-logo");
            icons.forEach((icon) => {
              icon.style.opacity = "1";
            });
          });
        }, 50);
      }, 100 + index * 80);
    });
  }

  // Mouse follow effect for blobs
  const blob1 = document.querySelector(".blob1");
  const blob2 = document.querySelector(".blob2");

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blob1.style.transform = `translate(${x * 100}px, ${y * 100}px)`;
    blob2.style.transform = `translate(${-x * 100}px, ${-y * 100}px)`;
  });

  // Add wave effect to CTA button
  const ctaButton = document.querySelector(".cta-button");

  ctaButton.addEventListener("mouseover", function () {
    this.style.transform = "translateY(-5px)";
  });

  ctaButton.addEventListener("mouseout", function () {
    this.style.transform = "translateY(0)";
  });

  // Initialize the section with a staggered animation
  function initAnimation() {
    const techCategories = document.querySelectorAll(".tech-category");

    techCategories.forEach((category, index) => {
      category.style.transitionDelay = `${index * 0.1}s`;
    });

    // Start category animations
    setTimeout(() => {
      techCategories.forEach((category, index) => {
        setTimeout(() => {
          category.style.opacity = "1";
          category.style.transform = "translateY(0)";
        }, index * 150);
      });
    }, 300);
  }

  // Start animations
  initAnimation();
});

// TESTIMONIAL SECTION
document.addEventListener('DOMContentLoaded', function() {
  const testimonials = [
    {
      content: "The Virstack team was (and is!) fantastic. Their discovery calls helped me coalesce the vision, they checked in and reported on progress along the way, and quickly helped bring the project to life.",
      author: "Todd Herschberg",
      position: "Founder",
      company: "Orange County Executives & Networkers (OCEAN)",
      location: "Newport Beach, California"
    },
    {
      content: "Best team in the business! Amazing expertise and guidance through the Discovery for our app project. Delivered beyond expectations every time.",
      author: "Sarah Johnson",
      position: "CEO",
      company: "Innovate Solutions",
      location: "San Francisco, California"
    },
    {
      content: "Working with this team has been a game-changer for our startup. Their technical knowledge combined with exceptional communication made our complex project seamless.",
      author: "Michael Chen",
      position: "Technical Director",
      company: "NextGen Robotics",
      location: "Boston, Massachusetts"
    },
    {
      content: "They took our vague concept and transformed it into a concrete plan with clear milestones. Their development process was transparent and the results exceeded our projections.",
      author: "Elena Rodriguez",
      position: "Marketing Director",
      company: "Global Connect",
      location: "Miami, Florida"
    }
  ];

  const slider = document.getElementById('testimonials-slider');
  const dotsContainer = document.getElementById('dots-container');
  let currentIndex = 0;

  // Create testimonial cards
  function createTestimonialCards() {
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
      // Create testimonial card
      const card = document.createElement('div');
      card.className = `testimonial-card ${index === currentIndex ? 'active' : index === currentIndex - 1 || (currentIndex === 0 && index === testimonials.length - 1) ? 'prev' : index === currentIndex + 1 || (currentIndex === testimonials.length - 1 && index === 0) ? 'next' : ''}`;
      
      // Get initials for avatar
      const initials = testimonial.author.split(' ').map(name => name[0]).join('');
      
      card.innerHTML = `
        <div class="quote-icon">❝</div>
        <p class="testimonial-content">${testimonial.content}</p>
        <div class="testimonial-author">
          <div class="author-avatar">${initials}</div>
          <div class="author-info">
            <div class="author-name">${testimonial.author}</div>
            <div class="author-position">${testimonial.position}</div>
            <div class="author-company">${testimonial.company}</div>
            <div class="author-company">${testimonial.location}</div>
          </div>
        </div>
        <div class="quote-icon quote-end">❝</div>
      `;
      
      slider.appendChild(card);
      
      // Create dot for navigation
      const dot = document.createElement('div');
      dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Initialize slider
  createTestimonialCards();

  // Navigate to previous slide
  document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateSlider();
  });

  // Navigate to next slide
  document.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlider();
  });

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  // Update slider display
  function updateSlider() {
    createTestimonialCards();
    
    // Add entry animation for active card
    const activeCard = document.querySelector('.testimonial-card.active');
    activeCard.style.animation = 'none';
    setTimeout(() => {
      activeCard.style.animation = 'float 4s ease-in-out infinite';
    }, 10);
  }

  // Auto-advance slider
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlider();
  }, 6000);

  // Pause auto-advance on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  // Resume auto-advance when mouse leaves
  slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    }, 6000);
  });

  // Add touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateSlider();
    }
  }
});