document.addEventListener("DOMContentLoaded", () => {

  // NAV TOGGLE (Accessible & Safe)
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.classList.toggle("open");
      navMenu.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
  // HERO IMAGE SLIDER
  const hero = document.querySelector(".hero");
  const heroTitle = document.querySelector(".hero h1");
  const heroParagraph = document.querySelector(".hero p");

  if (hero) {
    const images = [
      "pic1.avif",
      "pic2.avif",
      "pic3.avif",
      "pic4.avif",
      "pic5.avif",
      "pic6.avif",
      "pic7.avif"
    ];

    const BG_INTERVAL = 5000;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let index = 0;
    let bgInterval = null;

    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    function applyBackground() {
      hero.style.backgroundImage = `url("${images[index]}")`;
      hero.style.backgroundRepeat = "no-repeat";
      hero.style.backgroundPosition = "center";
      hero.style.backgroundSize =
        window.innerWidth <= 768 ? "cover" : "110%";
    }

    function startSlider() {
      if (prefersReducedMotion || bgInterval) return;

      bgInterval = setInterval(() => {
        hero.style.opacity = "0";
        setTimeout(() => {
          index = (index + 1) % images.length;
          applyBackground();
          hero.style.opacity = "1";
        }, 500);
      }, BG_INTERVAL);
    }

    function stopSlider() {
      clearInterval(bgInterval);
      bgInterval = null;
    }

    hero.style.transition = "opacity 1s ease-in-out";
    applyBackground();
    startSlider();

    document.addEventListener("visibilitychange", () => {
      document.hidden ? stopSlider() : startSlider();
    });

    window.addEventListener("resize", applyBackground);

    // ---- Greetings ----
    if (heroTitle && !prefersReducedMotion) {
      const greetings = [
        "Hello there!",
        "Welcome to my workspace.",
        "Step into my digital space.",
        "Glad you’re here.",
        "Let’s explore together."
      ];

      let gIndex = 0;
      heroTitle.textContent = greetings[0];
      heroTitle.style.transition = "opacity 0.4s ease";

      setInterval(() => {
        heroTitle.style.opacity = "0";
        setTimeout(() => {
          gIndex = (gIndex + 1) % greetings.length;
          heroTitle.textContent = greetings[gIndex];
          heroTitle.style.opacity = "1";
        }, 400);
      }, 6000);
    }

    // ---- Tagline ----
    if (heroParagraph && !prefersReducedMotion) {
      const messages = [
        "Explore creativity, projects, and inspiration — all in one place.",
        "Your ideas deserve a space to grow.",
        "Let’s build something extraordinary today.",
        "How can I be of assistance today?"
      ];

      let mIndex = 0;
      heroParagraph.textContent = messages[0];

      setInterval(() => {
        mIndex = (mIndex + 1) % messages.length;
        heroParagraph.textContent = messages[mIndex];
      }, 4000);
    }
  }

  
  // SCROLL REVEAL
 
  const sections = document.querySelectorAll("section");

  if (sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(sec => observer.observe(sec));
  }
  // CONTACT FORM HANDLING (FIXED)
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const subject = document.getElementById("subject")?.value.trim();
      const message = document.getElementById("message")?.value.trim();
      const question = document.getElementById("question")?.value.trim();

      if (!name || !email || !subject || !message || !question) {
        showPopup("⚠️ Please fill in all fields.", "error");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        showPopup("❌ Please enter a valid email address.", "error");
        return;
      }

      if (question !== "15") {
        showPopup("❌ Incorrect answer to the security question.", "error");
        return;
      }

      showPopup(`✅ Message sent successfully! Thank you, ${name}.`, "success");
      contactForm.reset();
    });
  }

  // POPUP SYSTEM (SAFE)
  function showPopup(message, type = "info") {
  // Remove existing popup
  const existing = document.querySelector(".popup-message");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.textContent = message;

  // Inline styles = cannot be overridden by your CSS
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.padding = "12px 16px";
  popup.style.borderRadius = "8px";
  popup.style.fontSize = "14px";
  popup.style.background =
    type === "success" ? "#16a34a" :
    type === "error"   ? "#dc2626" :
                         "#020617";
  popup.style.color = "#ffffff";
  popup.style.zIndex = "2147483647"; // absolute top
  popup.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";

  document.body.appendChild(popup);

  // Auto remove
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

});
