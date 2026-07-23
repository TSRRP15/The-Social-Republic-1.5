const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const spotlight = document.querySelector(".spotlight");
const copyButton = document.querySelector(".copy-ip");
const copyStatus = document.querySelector(".copy-status");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("pointermove", (event) => {
  if (!spotlight) return;
  spotlight.style.left = `${event.clientX}px`;
  spotlight.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), index * 70);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

copyButton.addEventListener("click", async () => {
  const ip = copyButton.dataset.ip;

  if (!ip || ip === "CHANGE-ME") {
    copyStatus.textContent = "Първо смени CHANGE-ME с IP адреса на сървъра.";
    return;
  }

  try {
    await navigator.clipboard.writeText(ip);
    copyStatus.textContent = `IP адресът е копиран: ${ip}`;
  } catch {
    copyStatus.textContent = `Копирай ръчно: ${ip}`;
  }
});
