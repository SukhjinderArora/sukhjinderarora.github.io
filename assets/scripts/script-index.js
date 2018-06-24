var menuButton=document.getElementById("menu-btn");
var closeButton=document.getElementById("close-btn");
var sideMenu = document.getElementById("side-menu");

menuButton.addEventListener("click",function(){
   sideMenu.style.width = '250px';

});
closeButton.addEventListener("click",function(){
    sideMenu.style.width = '0';

});

$(document).ready(function(){

    $(".nav-bar > ul > li > .nav-link, .know-more, #about a").click(function (e) {
        e.preventDefault();
        var curLink = $(this);
        var scrollPoint = $(curLink.attr("href")).position().top;
        $("body,html").animate(
            {
                scrollTop: scrollPoint
            },
            700
        );
        sideMenu.style.width= '0';
        
    });




    $(function () {
        $(".ajaxForm").submit(function (e) {
            e.preventDefault();
            var href = $(this).attr("action");
            $.ajax({
                type: "POST",
                dataType: "json",
                url: href,
                data: $(this).serialize(),
                success: function (response) {
                    if (response.status == "success") {
                        alert("We received your submission, thank you!");
                    } else {
                        alert("An error occured: " + response.message);
                    }
                }
            });
        });
    });

});