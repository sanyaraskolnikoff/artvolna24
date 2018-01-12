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
