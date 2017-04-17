$(function ($) {

    var qNum = 1;

    $("#qform").hide().fadeIn(1000);

    $("#start").bind("click", function (e) {
        $("#welcome").hide();
        formToWizard();
        setupFormValidation();
    });

    function formToWizard() {
        var form = $("#qform");
        var steps = $(form).find("fieldset");
        var count = steps.size();
        var submmitButton = "#submit";
        
        $("fieldset").hide();
        $("#quest" + qNum).show();
        navBtn();

        $("#prev").bind("click", function (e) {
            var stepName = "quest" + qNum;
            $("#" + stepName).hide();
            $("#quest" + (qNum - 1)).show();
            $(submmitButton).hide();
            qNum -= 1;
            navBtn();
        });

        $("#next").bind("click", function (e) {
            var stepName = "quest" + qNum;
            if (form.valid()) {
                $("#quest" + (qNum - 1)).hide();
                $("#" + stepName).hide();
                $("#quest" + (qNum + 1)).show();
                qNum += 1;
                navBtn();

            }
        });

        function navBtn() {
            switch (qNum) {           
                case 1 :
                    $("#next").show();
                    $("#prev").hide();
                    break;
                case count :
                    $(submmitButton).show();
                    $("#next").hide();
                    break;
                default :
                    $("#prev").show();
                    $("#next").show();
                    $(submmitButton).hide();
                    break;
            }
        }

    }

    function setupFormValidation() {
        var required_msg = "<span class='icon-attention-circled'></span> Merci de choisir une réponse.";
        $("#qform").validate({
            onfocusout: false,
            onkeyup: false,
            ignore: ":hidden",
            errorPlacement: function (error, element) {
                error.prependTo($("#message"));
            },
            messages: {
                q1: required_msg,
                q2: required_msg,
                q3: required_msg,
                q4: required_msg,
                q5: required_msg,
                q6: required_msg,
                q7: required_msg,
                q8: required_msg,
                q9: required_msg,
                q10: required_msg
            },
            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "/training-form/php/send_mail.php",
                    data: $("#qform").serialize(),
                    success: function (html) {
                        $("#msg").html("<p><span class='icon-emo-thumbsup'></span><br>Merci d'avoir pris le temps de répondre à ce questionnaire.</p>");
                        $("fieldset").hide();
                        $("#next").hide();
                        $("#prev").hide();
                        $("#submit").hide();
                        $("#end").show();
                    }
                });
            }
        });
    }

});