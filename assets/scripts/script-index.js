"use strict";

const menuButton = document.getElementById("menuBtn");
const closeButton = document.getElementById("closeBtn");
const sideNav = document.getElementById("sideNav");
const afterSubmit = document.getElementById("submitSuccess");
const navBarLinks = document.querySelectorAll(".navBar__link");
const form = document.getElementById("ajaxForm");
const successMessage = document.getElementById("successMsg");

const gRecaptchaWidget = document.getElementById("g-recaptcha");

let gRecaptchaWidgetID;

const RC2KEY = '6Lcy2dQUAAAAAP5xbr19Br7Mj0ufp6XgIQSeQeAo';
let doSubmit = false;

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 550,
  easing: 'easeInOutQuad',
  updateURL: false // Update the URL on scroll
});

// Toggle Side Menu

function toggleSideMenu(event) {
  sideNav.classList.toggle("isActive");
}

menuButton.addEventListener("click", toggleSideMenu);

closeButton.addEventListener("click", toggleSideMenu);

navBarLinks.forEach(link =>
  link.addEventListener("click", toggleSideMenu)
);

// Form Submission using AJAX

form.addEventListener("submit", function(event) {
  
  event.preventDefault();
  const url = this.action;

  if (doSubmit) {
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
        form.reset(gRecaptchaWidgetID);
        successMessage.textContent = "Message Sent!";
        afterSubmit.style.opacity = "1";
        window.setTimeout(function () {
          afterSubmit.style.opacity = "0";
        }, 4000);
        grecaptcha.reset(gRecaptchaWidgetID);
      })
      .catch(error => {
        alert("Something went wrong!!");
      });
  } else {
    successMessage.textContent = "Please complete the captcha!";
    afterSubmit.style.opacity = "1";
    window.setTimeout(function () {
      afterSubmit.style.opacity = "0";
    }, 4000);

  }

});

// Google Recaptcha 

function reCaptchaVerify(response) {
  if (response === grecaptcha.getResponse()) {
    doSubmit = true;
  }
}

function reCaptchaExpired() {
  /* do something when it expires */
  doSubmit = false;
}


function reCaptchaCallback() {
  /* this must be in the global scope for google to get access */
  gRecaptchaWidgetID = grecaptcha.render(gRecaptchaWidget, {
    'sitekey': RC2KEY,
    'callback': reCaptchaVerify,
    'expired-callback': reCaptchaExpired,
    'theme': 'dark',
  });
}


