const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-list");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class",isOpen ? "ri-close-line" : "ri-menu-fill")
})

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-fill");
});

const navSearch = document.getElementById("nav-search");

navSearch.addEventListener("click", (e) => {
    navSearch.classList.toggle("open");
});

const scrollRevealoption = {
    distance: "50px",
    origin: "bottom",
    duration: "1000",
};
ScrollReveal().reveal(".header-image img", {
    ...scrollRevealoption,
    origin: "right",
});
ScrollReveal().reveal(".header-content div", {
    duration: 1000,
    delay: 500,
});
ScrollReveal().reveal(".header-content h1", {
    ...scrollRevealoption,
    delay: 1000,
});
ScrollReveal().reveal(".header-content p", {
    ...scrollRevealoption,
    delay: 1500,
});
ScrollReveal().reveal(".deals-card", {
    ...scrollRevealoption,
    interval: 500,
});
ScrollReveal().reveal(".about-img img", {
    ...scrollRevealoption,
    origin: "right",
});
ScrollReveal().reveal(".about-card", {
    duration: 1000,
    interval: 500,
    delay: 500,
});

const swiper = new Swiper(".swiper" , {
    loop: true,
});