
$(document).ready(function() {
  $("#firstRadio_0").click(function() {
    $("#firstHiddenDiv_0").slideToggle("slow");
  });
  $("#firstRadio_1").click(function() {
    $("#firstHiddenDiv_1").slideToggle("slow");
  });
  $("#firstRadio_2").click(function() {
    $("#firstHiddenDiv_2").slideToggle("slow");
  });
  $("#firstRadio_3").click(function() {
    $("#firstHiddenDiv_3").slideToggle("slow");
  });
  $("#firstRadio_4").click(function() {
    $("#firstHiddenDiv_4").slideToggle("slow");
  });
  $("#firstRadio_5").click(function() {
    $("#firstHiddenDiv_5").slideToggle("slow");
  });
//  $("#firstRadio_6").click(function() {
//    $("#firstHiddenDiv_6").slideToggle("slow");
//  });
//  $("#firstRadio_7").click(function() {
//    $("#firstHiddenDiv_7").slideToggle("slow");
//  });
//  $("#firstRadio_8").click(function() {
//    $("#firstHiddenDiv_8").slideToggle("slow");
//  });
//  $("#firstRadio_" + num).click(function() {
//    $("#firstHiddenDiv_" + num).slideToggle("slow");
//  });
//  $("#firstRadio_" + num).click(function() {
//    $("#firstHiddenDiv_" + num).slideToggle("slow");
//  });
//  $("#firstRadio_" + num).click(function() {
//    $("#firstHiddenDiv_" + num).slideToggle("slow");
//  });
//  $("#firstRadio_" + num).click(function() {
//    $("#firstHiddenDiv_" + num).slideToggle("slow");
//  });
});

//function sliderFunction(idNum) {
//  $("#firstRadio_" + idNum).click(function() {
//    $("#firstHiddenDiv_" + idNum).slideToggle("slow");
//  });
//}


function myFunction() {
  document.getElementById("here").innerHTML = "Hello1 World";
}
document.addEventListener("DOMContentLoaded", function() {
  someFunction("October 04, 2019 08:00:00");
});

function someFunction(endDateString, idTag) {
    var endDate = new Date(endDateString).getTime();

    var timer = setInterval(function() {

        var now = new Date().getTime();
        var t = endDate - now;

        if (t >= 0) {

            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            var secs = Math.floor((t % (1000 * 60)) / 1000);

            document.getElementById("timer-days_"+idTag).innerHTML = days;

            document.getElementById("timer-hours_"+idTag).innerHTML = ("0"+hours).slice(-2);

            document.getElementById("timer-mins_"+idTag).innerHTML = ("0"+mins).slice(-2);

            document.getElementById("timer-secs_"+idTag).innerHTML = ("0"+secs).slice(-2);

        } else {

            document.getElementById("timer_"+idTag).innerHTML = "The countdown is over!";

        }

    }, 1000);
}