$(function() {
    $(".accordion .accordion-switcher").each(function(index) {
        console.log($(this).prev(".accordion-panel"));
        if (!$(this).hasClass("accordion-switcher-active")) {
            $(this).next().css("max-height", "0px");
        }
    })
    
    $(".accordion .accordion-switcher").click(function() {
        var panel = $(this).next();
        var opened = (panel.css("max-height") != "0px");
        $(this).siblings(".accordion-switcher-active").toggleClass("accordion-switcher-active");
        $(this).toggleClass("accordion-switcher-active");
        $(this).siblings(".accordion-panel").css('max-height', "0px");
        if (opened) {
            panel.css("max-height", "0px")
        } else {
            panel.css("max-height", panel.prop("scrollHeight") + "px");
        }
    });
});