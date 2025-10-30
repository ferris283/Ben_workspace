// 🌅 HERO IMAGE SLIDER + DYNAMIC GREETING + SCROLL REVEAL

const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero h1');
const heroParagraph = document.querySelector('.hero p');

// --- Background Images ---
const images = [
  'url("pic1.avif")',
  'url("pic2.avif")',
  'url("pic3.avif")',
  'url("pic4.avif")',
  'url("pic5.avif")',
  'url("pic6.avif")'
];

let current = 0;

// --- Smooth Background Transition ---
function changeBackground() {
  current = (current + 1) % images.length;
  hero.style.opacity = 0;
  setTimeout(() => {
    hero.style.backgroundImage = images[current];
    hero.style.backgroundRepeat = "no-repeat";
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center center";
    hero.style.transition = "background-image 1s ease-in-out, opacity 1s ease-in-out";
    hero.style.opacity = 1;
  }, 500);
}
setInterval(changeBackground, 5000);

// --- Personalized Greeting ---
let userName = localStorage.getItem('userName');
if (userName) {
  heroTitle.textContent = `Welcome back, ${userName}!`;
} else {
  heroTitle.textContent = `Welcome to My Workspace`;
}

// --- Rotating Tagline ---
const messages = [
  "Explore creativity, projects, and inspiration — all in one place.",
  "Your ideas deserve a space to grow.",
  "Let’s build something extraordinary today.",
  "How can I be of assitance today?"
];
let msgIndex = 0;
function changeMessage() {
  msgIndex = (msgIndex + 1) % messages.length;
  heroParagraph.textContent = messages[msgIndex];
}
setInterval(changeMessage, 4000);

// --- Scroll Reveal Animation ---
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add('visible');
    }
  });
});
// ✉️ CONTACT FORM HANDLING
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const question = document.getElementById("question").value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showPopup("⚠️ Please fill in all fields.", "error");
    return;
  }

  // Simple math check (anti-bot)
  if (question !== "15") {
    showPopup("❌ Incorrect answer to the security question.", "error");
    return;
  }

  // All good — show success message
  showPopup("✅ Message sent successfully! Thank you, " + name + ".", "success");

  // Optional: reset form
  contactForm.reset();
});

// 🔔 Popup notification function
function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.className = `popup-message ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 50);

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 3000);
}

