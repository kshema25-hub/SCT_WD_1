const navbar = document.getElementById("navbar");
const links = document.querySelectorAll(".menu a");
const sections = document.querySelectorAll(".section");
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");
const themeToggle = document.getElementById("themeToggle");

/* SCROLL PROGRESS BAR */
const progress = document.createElement("div");
progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "4px";
progress.style.width = "0%";
progress.style.background = "linear-gradient(90deg,#00f5ff,#00c6ff,#7c7cff)";
progress.style.zIndex = "2000";
document.body.appendChild(progress);

/* SCROLL EVENTS */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  navbar.classList.toggle("scrolled", scrollY > 80);
  progress.style.width = `${(scrollY / height) * 100}%`;

  let current = "";
  sections.forEach((sec) => {
    if (scrollY >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
});

/* HAMBURGER */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

/* DARK / LIGHT MODE */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light")
    ? "☀️"
    : "🌙";
});

/* SECTION REVEAL */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 },
);

document.querySelectorAll(".reveal").forEach((sec) => {
  revealObserver.observe(sec);
});

/* SMOOTH SCROLLING FOR NAVIGATION LINKS */
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* BACK TO TOP BUTTON */
const backToTopBtn = document.createElement("button");
backToTopBtn.innerHTML = "↑";
backToTopBtn.id = "backToTop";
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(45deg, #00c6ff, #7c7cff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 198, 255, 0.3);
`;
backToTopBtn.addEventListener("mouseenter", () => {
  backToTopBtn.style.transform = "scale(1.1)";
});
backToTopBtn.addEventListener("mouseleave", () => {
  backToTopBtn.style.transform = "scale(1)";
});
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  backToTopBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
});

/* TYPING ANIMATION FOR HOME TITLE */
const homeTitle = document.querySelector("#home h1");
const originalText = homeTitle.textContent;
homeTitle.textContent = "";
let charIndex = 0;
function typeWriter() {
  if (charIndex < originalText.length) {
    homeTitle.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}
setTimeout(typeWriter, 1000); // Start typing after 1 second

/* ENHANCED SECTION REVEAL WITH FADE AND SLIDE */
const enhancedRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".section").forEach((sec) => {
  sec.style.opacity = "0";
  sec.style.transform = "translateY(50px)";
  sec.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  enhancedRevealObserver.observe(sec);
});
