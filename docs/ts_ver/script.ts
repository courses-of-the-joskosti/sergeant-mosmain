// burger button and menu
const root: HTMLElement = document.getElementsByTagName('html')[0];

const menuBtn: HTMLElement = document.querySelector(".menu-btn");
const menu: HTMLElement = document.querySelector(".menu");
const menuLink: HTMLElement = document.querySelector(".menu-links");

menuBtn.addEventListener("click", (): void => {
  menuBtn.classList.toggle("active");
  menu.classList.toggle("active");
  root.classList.toggle("overflow-hidden");
});

// menuLink.addEventListener("click", (event) => {
//   if (event.target.matches("li a")) {
//     menuBtn.classList.remove("active");
//     menu.classList.remove("active");
//     root.classList.remove("overflow-hidden");
//   }
// });
