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
