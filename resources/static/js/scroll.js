$(function() {
    var direction = "bottom";
    $(document).scroll(function(event) {
        var pdfContainerBottom = $(".pdf-container").offset().top + $(".pdf-container").height();

        if($(this).scrollTop() >= pdfContainerBottom) {
            direction = "top";
            $(".bottom-arr", this).removeClass("fa-arrow-circle-down");
        } else {
            direction = "bottom";
        }
        if($(this).scrollTop() == 0) {
            $(".bottom-arr", this).addClass("fa-arrow-circle-down");
        }
    });

	$(".bottom-arrow").click(function() {
        $('html, body').animate({
            scrollTop: direction === "bottom" ? $("#section02").offset().top : 0
        }, 500);
    });
});