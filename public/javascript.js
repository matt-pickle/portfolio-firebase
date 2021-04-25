const openNavButton = document.querySelector("#open-nav-button");
const closeNavButton = document.querySelector("#close-nav-button");
const navLinks = document.querySelectorAll("nav a");
const nav = document.querySelector('.nav');

openNavButton.addEventListener("click", () => {
  nav.classList.add("nav-open");
});

closeNavButton.addEventListener("click", () => {
  nav.classList.remove("nav-open");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
  });
});