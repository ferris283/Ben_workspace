const body = document.body;
const button = document.querySelector('button');

// Gradient background pairs
const gradients = [
  "linear-gradient(120deg, #a8edea, #fed6e3)", 
  "linear-gradient(120deg, #89f7fe, #66a6ff)", 
  "linear-gradient(120deg, #fddb92, #d1fdff)", 
  "linear-gradient(120deg, #fbc2eb, #a6c1ee)", 
  "linear-gradient(120deg, #cfd9df, #e2ebf0)", 
  "linear-gradient(120deg, #F6F5AE, #E5D9F2)",
  "linear-gradient(120deg, #95B46A, #172815)",
  "linear-gradient(120deg, #E0FBFC, #138A36)",
  "linear-gradient(120deg, #FCEFF9, #4E5283)",
  "linear-gradient(120deg, #6969B3, #E5D9F2)"
];

let current = 0;

// Smooth background change every 5s
function changeBackground() {
  current = (current + 1) % gradients.length;
  body.style.transition = 'background 3s ease';
  body.style.background = gradients[current];
}
setInterval(changeBackground, 5000);

// Button click cinematic effect
button.addEventListener('click', () => {
    // Step 1: Button jump + bounce
    button.style.transition = 'transform 0.3s ease, all 0.3s ease';
    button.style.transform = 'scale(1.4) rotate(15deg)';
    button.style.color = '#02111B';
    button.style.backgroundColor = '#83BCA9';
    button.style.border = '2px solid black';

    setTimeout(() => {
        button.style.transform = 'scale(1) rotate(0deg)';
    }, 150);

    // Step 2: Swirling gradient background
    let swirlCount = 0;
    const swirlInterval = setInterval(() => {
        body.style.background = gradients[(current + swirlCount) % gradients.length];
        swirlCount++;
        if(swirlCount > 7) clearInterval(swirlInterval); // swirl 7 times quickly
    }, 80);

    // Step 3: Page lift + fade-out
    body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    body.style.opacity = '0';
    body.style.transform = 'translateY(-70px)'; // moves page upward slightly

    // Step 4: Navigate after animation
    setTimeout(() => {
        window.location.href = 'page2.html';
    }, 600);
});
