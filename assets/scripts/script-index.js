"use strict";

let menuButton = document.getElementById("menuBtn");
let closeButton=document.getElementById("closeBtn");
let sideNav=document.getElementById("sideNav");
let afterSubmit = document.getElementById("submitSuccess");


function toggleSideMenu() {
    sideNav.classList.toggle("isActive");
}

menuButton.addEventListener("click",toggleSideMenu);

closeButton.addEventListener("click", toggleSideMenu);


$(document).ready(function () {

    $(".navBar__link, .profile__link, .content__link--contact").click(
      function(e) {
        var curLink = $(this);
        var scrollPoint = $(curLink.attr("href")).position().top;
        $("body,html").animate({ scrollTop: scrollPoint }, 700);
          if (curLink.hasClass("navBar__link")) {
            toggleSideMenu();
          }
            
      }
    );

    $(function () {
        $(".js-ContactForm").submit(function (e) {
            e.preventDefault();
            var href = $(this).attr("action");
            $.ajax({
                type: "POST",
                dataType: "json",
                url: href,
                data: $(this).serialize(),
                success: function (response) {
                    if (response.status == "success") {
                        afterSubmit.style.opacity = "1";
                        $(".js-ContactForm").trigger("reset");
                        window.setTimeout(function () {
                            afterSubmit.style.opacity = "0";
                        }, 6000);

                    } else {
                        alert("An error occured: " + response.message);
                    }
                }
            });
        });
    });

});
