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