const body = document.body;
const button = document.querySelector("button");

/* 
   BACKGROUND GRADIENT SYSTEM
 */

/* Reduced but DISTINCT gradients */
const gradients = [
  "linear-gradient(135deg, #e0f2fe, #fdf2f8)",
  "linear-gradient(135deg, #ede9fe, #f0fdfa)",
  "linear-gradient(135deg, #fef3c7, #ecfeff)",
  "linear-gradient(135deg, #f1f5f9, #e0e7ff)"
];

let current = 0;

/* Initial state */
body.style.background = gradients[0];
body.style.transition = "background 4s ease-in-out";

/* Visible but calm background change */
setInterval(() => {
  current = (current + 1) % gradients.length;
  body.style.background = gradients[current];
}, 7000);

/* 
   BUTTON INTERACTION (VISIBLE)
 */

if (button) {
  button.addEventListener("click", () => {
    button.disabled = true;

    /* Button press feedback */
    button.style.transition =
      "transform 0.2s ease, box-shadow 0.2s ease";
    button.style.transform = "scale(0.94)";
    button.style.boxShadow =
      "0 12px 30px rgba(0, 0, 0, 0.25)";

    /* Page exit animation — NOTICEABLE */
    body.style.transition =
      "opacity 0.5s ease, transform 0.5s ease";
    body.style.opacity = "0";
    body.style.transform = "scale(0.97) translateY(-24px)";

    setTimeout(() => {
      window.location.href = "page2.html";
    }, 500);
  });
}
