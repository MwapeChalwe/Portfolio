/* ========== MOBILE MENU ========== */

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
});

links.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});


/* ========== BACK-TO-TOP BUTTON ========== */

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
});


/* ========== ROTATING WORDS ========== */

const words = ["networks in Packet Tracer", "tools in Java", "apps with Node.js", "websites like this one"];
let index = 0;
const rotatingWord = document.querySelector(".rotating-word");

setInterval(() => {
  rotatingWord.classList.add("flip-out");

  setTimeout(() => {
    index = (index + 1) % words.length;
    rotatingWord.textContent = words[index];
    rotatingWord.classList.remove("flip-out");
  }, 400);
}, 2500);


/* ========== SCROLL REVEAL ========== */

const revealSections = document.querySelectorAll("section:not(#hero)");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealSections.forEach((section) => {
  section.classList.add("reveal");
  observer.observe(section);
});


/* ========== INTERACTIVE DOT GRID ========== */

const canvas = document.querySelector(".dot-canvas");
const ctx = canvas.getContext("2d");
const heroBg = document.querySelector(".hero-bg");

const spacing = 24;
const radius = 100;
let dots = [];
let mouse = { x: -1000, y: -1000 };

function setup() {
  canvas.width = heroBg.offsetWidth;
  canvas.height = heroBg.offsetHeight;
  dots = [];

  for (let y = spacing / 2; y < canvas.height; y += spacing) {
    for (let x = spacing / 2; x < canvas.width; x += spacing) {
      dots.push({ x: x, y: y });
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach((dot) => {
    const dx = dot.x - mouse.x;
    const dy = dot.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let x = dot.x;
    let y = dot.y;
    let size = 1;
    let color = "rgba(232, 230, 225, 0.18)";

    if (distance < radius && distance > 0) {
      const strength = 1 - distance / radius;
      x += (dx / distance) * strength * 12;
      y += (dy / distance) * strength * 12;
      size = 1 + strength * 1.5;
      color = `rgba(249, 115, 22, ${0.3 + strength * 0.7})`;
    }

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

heroBg.addEventListener("mousemove", (event) => {
  const rect = heroBg.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

heroBg.addEventListener("mouseleave", () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

window.addEventListener("resize", setup);

setup();
draw();