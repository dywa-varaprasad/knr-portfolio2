// ── Register GSAP plugins ──
gsap.registerPlugin(ScrollTrigger);

// ════════════════════════════
// THEME TOGGLE
// ════════════════════════════
const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement;

// Load saved preference or default to dark
const savedTheme = localStorage.getItem("dvp-theme") || "dark";
html.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";

themeBtn.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  themeBtn.textContent = next === "dark" ? "🌙" : "☀️";
  localStorage.setItem("dvp-theme", next);

  // Animate button
  gsap.fromTo(
    themeBtn,
    { rotation: -20, scale: 0.85 },
    { rotation: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }
  );
});

// ════════════════════════════
// MOBILE MENU
// ════════════════════════════
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu() {
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
}

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

// Close on link click
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target))
    closeMenu();
});

// ════════════════════════════
// STICKY NAV
// ════════════════════════════
const siteHeader = document.getElementById("siteHeader");
window.addEventListener(
  "scroll",
  () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true }
);

// ════════════════════════════
// ACTIVE NAV LINK ON SCROLL
// ════════════════════════════
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => sectionObserver.observe(s));

// ════════════════════════════
// SCROLL TO TOP
// ════════════════════════════
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener(
  "scroll",
  () => {
    scrollTopBtn.classList.toggle("show", window.scrollY > 400);
  },
  { passive: true }
);

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ════════════════════════════
// GSAP SCROLL REVEAL
// ════════════════════════════
// Generic fade-up
document.querySelectorAll(".reveal").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
});

// Slide from left
document.querySelectorAll(".reveal-left").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%" },
  });
});

// Slide from right
document.querySelectorAll(".reveal-right").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%" },
  });
});

// ════════════════════════════
// HERO COUNTER ANIMATION
// ════════════════════════════
document.querySelectorAll(".hero-stat-num").forEach((el) => {
  const target = parseInt(el.getAttribute("data-count"), 10);
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    delay: 0.5,
    ease: "power2.out",
    onUpdate() {
      el.textContent = Math.round(obj.val) + "+";
    },
  });
});

// ════════════════════════════
// HERO ENTRANCE ANIMATION
// ════════════════════════════
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
heroTl
  .from(".hero-location", { opacity: 0, y: 20, duration: 0.6 })
  .from(".hero-title", { opacity: 0, y: 36, duration: 0.8 }, "-=0.3")
  .from(".hero-sub", { opacity: 0, y: 24, duration: 0.7 }, "-=0.5")
  .from(".hero-btns", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
  .from(".hero-stats", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
  .from("#siteHeader", { y: -60, opacity: 0, duration: 0.7 }, 0);

// ════════════════════════════
// CARD HOVER SOUND (visual)
// ════════════════════════════
document
  .querySelectorAll(".why-card, .service-card, .testi-card, .work-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { y: -4, duration: 0.25, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
    });
  });

// ════════════════════════════
// PRICING CARD ENTRANCE STAGGER
// ════════════════════════════
gsap.from(".pricing-card", {
  opacity: 50,
  y: 50,
  stagger: 0,
  duration: 0,
  ease: "power3.out",
  scrollTrigger: { trigger: ".pricing-grid", start: "top 82%" },
});

// ════════════════════════════
// FLOATING WHATSAPP PULSE
// ════════════════════════════
gsap.to(".whatsapp-fab", {
  scale: 1.04,
  duration: 1.2,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
  delay: 2,
});

// ════════════════════════════
// SMOOTH ANCHOR CLICKS
// (Handles mobile menu closing + offset for fixed header)
// ════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    const offset = 72; // fixed nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
