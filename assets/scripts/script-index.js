"use strict";

const menuButton = document.getElementById("menuBtn");
const closeButton = document.getElementById("closeBtn");
const sideNav = document.getElementById("sideNav");
const afterSubmit = document.getElementById("submitSuccess");
const navBarLinks = document.getElementsByClassName("navBar__link");

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 550,
  easing: "easeInOutQuad"
})

// Toggle Side Menu

function toggleSideMenu() {
  sideNav.classList.toggle("isActive");
}

menuButton.addEventListener("click", toggleSideMenu);
closeButton.addEventListener("click", toggleSideMenu);

Array.from(navBarLinks).forEach(link =>
  link.addEventListener("click", toggleSideMenu)
);

// Form Submission using AJAX

const form = document.getElementById("ajaxForm");
const url = form.getAttribute("action");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams(new FormData(form)).toString(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }
  })
    .then(response => {
      form.reset();
      afterSubmit.style.opacity = "1";
      window.setTimeout(function() {
        afterSubmit.style.opacity = "0";
      }, 4000);
    })
    .catch(error => {
      alert("Something went wrong!!");
    });
});
