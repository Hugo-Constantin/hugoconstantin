const cursor = document.querySelector(".cursor");
const interactiveElements = document.querySelectorAll("a, .info-block, .process-list div");
const parallaxItems = document.querySelectorAll(".parallax");

window.addEventListener("mousemove", (e) => {
  if (window.innerWidth <= 900 || !cursor) return;

  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (cursor) cursor.classList.add("active");
  });

  el.addEventListener("mouseleave", () => {
    if (cursor) cursor.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.dataset.speed || "0.1");
    const rect = item.getBoundingClientRect();
    const itemTop = rect.top + scrollY;

    const offset = (scrollY - itemTop) * speed;

    item.style.transform = `translateY(${offset}px)`;
  });
});