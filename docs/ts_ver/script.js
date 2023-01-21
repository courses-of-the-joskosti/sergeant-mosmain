// burger button and menu
var root = document.getElementsByTagName('html')[0];
var menuBtn = document.querySelector(".menu-btn");
var menu = document.querySelector(".menu");
var menuLink = document.querySelector(".menu-links");
menuBtn.addEventListener("click", function () {
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
