const cursor = document.querySelector(".cursor");
const interactiveElements = document.querySelectorAll("a, .project-card");
const track = document.querySelector(".horizontal-track");
const panels = document.querySelectorAll(".panel");
const progressBar = document.querySelector(".scroll-progress-bar");

let currentScroll = 0;
let targetScroll = 0;
let maxScroll = 0;

function calculateMaxScroll() {
  maxScroll = track.scrollWidth - window.innerWidth;
}

calculateMaxScroll();

window.addEventListener("resize", calculateMaxScroll);

// Curseur custom
window.addEventListener("mousemove", (event) => {
  if (!cursor) return;

  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});

// Scroll horizontal avec la molette verticale
window.addEventListener(
  "wheel",
  (event) => {
    if (window.innerWidth <= 900) return;

    event.preventDefault();

    targetScroll += event.deltaY;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
  },
  { passive: false }
);

// Animation douce du déplacement
function animateScroll() {
  currentScroll += (targetScroll - currentScroll) * 0.08;

  track.style.transform = `translateX(${-currentScroll}px)`;

  const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  requestAnimationFrame(animateScroll);
}

animateScroll();

// Navigation menu vers une section précise
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetIndex = Number(link.dataset.target);
    targetScroll = targetIndex * window.innerWidth;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
  });
});

// Effet léger sur le visuel hero
const heroVisual = document.querySelector(".hero-visual");
const orb = document.querySelector(".orb");

if (heroVisual && orb) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 40;
    const moveY = (y / rect.height - 0.5) * 40;

    orb.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    orb.style.transform = "translateX(-50%) translateY(0)";
  });
}