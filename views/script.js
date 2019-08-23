
$(document).ready(function() {

  $(".work__list-item").click(function() {
    console.log(this.id);
    console.log("#first" + this.id);
    $("#first" + this.id).slideToggle("slow");
  });

});



function myFunction() {
  document.getElementById("here").innerHTML = "Hello1 World";
}
document.addEventListener("DOMContentLoaded", function() {
  someFunction("October 04, 2019 08:00:00");
});

function someFunction(endDateString, idTag) {
    if (idTag === undefined) {
//        console.log('Exiting');
        return;
    }
    var endDate = new Date(endDateString).getTime();

    var timer = setInterval(function() {

        var now = new Date().getTime();
        var t = endDate - now;

        if (t >= 0) {

            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            var secs = Math.floor((t % (1000 * 60)) / 1000);

//            console.log(days + ' days ' + hours + ' hours ' + mins + ' mins ' + secs + ' secs');
//            console.log(idTag);

            document.getElementById("timer-days_"+idTag).innerHTML = days;

            document.getElementById("timer-hours_"+idTag).innerHTML = ("0"+hours).slice(-2);

            document.getElementById("timer-mins_"+idTag).innerHTML = ("0"+mins).slice(-2);

            document.getElementById("timer-secs_"+idTag).innerHTML = ("0"+secs).slice(-2);

        } else {

            document.getElementById("timer_"+idTag).innerHTML = "The countdown is over!";

        }

    }, 1000);
}