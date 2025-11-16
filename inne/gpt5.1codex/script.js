const copyButtons = [
  document.getElementById("copyIp"),
  document.getElementById("copyIpBottom"),
];
const yearSpan = document.getElementById("year");
const cards = document.querySelectorAll(".card");
const statValues = document.querySelectorAll(".stat-value");
const faqItems = document.querySelectorAll(".faq-item");
const quotes = document.querySelectorAll(".quote");
const quoteDots = document.querySelectorAll(".quote-nav .dot");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random(),
  y: Math.random(),
  z: Math.random(),
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.z -= 0.002;
    if (star.z <= 0) star.z = 1;
    const k = 0.1 / star.z;
    const x = star.x * canvas.width;
    const y = star.y * canvas.height;
    ctx.fillStyle = `rgba(255,255,255,${0.4 / star.z})`;
    ctx.beginPath();
    ctx.arc(x, y, k * 3, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

async function copyIp(button) {
  try {
    await navigator.clipboard.writeText("mc.takemc.pl");
    const original = button.textContent;
    button.textContent = "Skopiowano!";
    setTimeout(() => {
      button.textContent = original;
    }, 2000);
  } catch (error) {
    console.error("Nie udało się skopiować IP", error);
    alert("Skopiuj ręcznie: mc.takemc.pl");
  }
}

copyButtons.forEach((btn) =>
  btn?.addEventListener("click", () => copyIp(btn))
);

yearSpan.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
requestAnimationFrame(drawStars);

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

function animateCounter(el) {
  const target = parseFloat(el.dataset.target) || 0;
  const decimals = (el.dataset.target.split(".")[1] || "").length;
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toString();
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

statValues.forEach((value) => counterObserver.observe(value));

faqItems.forEach((item) => {
  const trigger = item.querySelector("button");
  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    faqItems.forEach((el) => el.classList.remove("open"));
    if (!isOpen) {
      item.classList.add("open");
    }
  });
});

let quoteIndex = 0;

function setActiveQuote(index) {
  quotes.forEach((quote, i) => {
    quote.classList.toggle("active", i === index);
  });
  quoteDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  quoteIndex = index;
}

if (quotes.length && quoteDots.length) {
  setActiveQuote(0);
  quoteDots.forEach((dot) =>
    dot.addEventListener("click", () => setActiveQuote(Number(dot.dataset.index)))
  );

  setInterval(() => {
    const nextIndex = (quoteIndex + 1) % quotes.length;
    setActiveQuote(nextIndex);
  }, 6000);
}

function handleParallax() {
  const offset = window.scrollY;
  parallaxItems.forEach((el) => {
    const strength = parseFloat(el.dataset.parallax) || 0;
    el.style.transform = `translateY(${offset * strength}px)`;
  });
}

window.addEventListener("scroll", handleParallax);
handleParallax();
