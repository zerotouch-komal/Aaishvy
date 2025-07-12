document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });

  // Rest of your existing JavaScript (typewriter effect)
  const heroHeading = document.querySelector(".hero-heading");
  const heroSubheading = document.querySelector(".hero-subheading");
  const heroImage = document.querySelector(".hero-image img");

  const headingText = heroHeading.textContent;
  const subheadingText = heroSubheading.textContent;

  heroHeading.textContent = "";
  heroSubheading.textContent = "";

  heroImage.style.transform = "translateY(-100%)";
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
});
