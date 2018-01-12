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
$(function() {
    //$('.no-fouc').removeClass('no-fouc');
    
    var tmpImg = new Image();
    tmpImg.src = $("#twenty-st").attr('src');
    tmpImg.onload = function() {
        $("#twenty-cont").show();
        $("#twenty-cont").twentytwenty({
            default_offset_pct: 0.4, // How much of the before image is visible when the page loads
            orientation: 'horizontal', // Orientation of the before and after images ('horizontal' or 'vertical')
            before_label: 'это фото', // Set a custom before label
            after_label: 'это портрет', // Set a custom after label
            no_overlay: false, //Do not show the overlay with before and after
            move_slider_on_hover: false, // Move slider on mouse hover?
            move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement. 
            click_to_move: false // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
        });
        $("#twenty-st").hide();                        
    };
       
    
    $(".slider").slick({
        arrows: true,
        dots: true
    });
});
$(function() {
    $(".feedback-form > input[type=button]").click(function(event) {
        var form = $(event.target).parent();
        var name_input = $(form.children("input[name='name']")[0]);
        var phone_input = $(form.children("input[name='phone']")[0]);
        var name = name_input.val();
        var phone = phone_input.val();
        var comment = $(form.children("textarea[name='comment']")[0]).val();
        if (name === "" || phone === "") {
            if (name === "") name_input.addClass("invalid");
            if (phone === "") phone_input.addClass("invalid");
            return;
        }
        $.ajax({
            url: "https://formspree.io/artvolna24@yandex.ru",
            method: "POST",
            data: {name: name, phone: phone, comment: comment},
            dataType: "json"
        }); 
        $(event.target).attr("value", "Спасибо!");
        $(event.target).attr("disabled", "disabled");
        setTimeout( function() {
            var btn = $(".feedback-form > input[type=button]");
            btn.removeAttr("disabled");
            btn.attr("value", "Заказать");
        }, 5000);
    });
    $(".feedback-form > input[type='text'][name='name']").change(function (){
        $(".feedback-form > input[type='text'][name='name']").removeClass("invalid");
    });
    $(".feedback-form > input[type='text'][name='phone']").change(function (){
        $(".feedback-form > input[type='text'][name='phone']").removeClass("invalid");
    });    
});

$(function () {
    $("body").click(function(event) {
        if ($(event.target).attr("class") === "modal") {
            closeModal();
        }
    });    
});

function openModal(id) {
    $(id).show();
    $(".slider").slick('slickGoTo', 0, false);
    $(".slider").slick('refresh');
    $("body").css("overflow", "hidden");
}

function closeModal() {
    $(".modal").hide();
    $("body").css("overflow", "auto");
}
