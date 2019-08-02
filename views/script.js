
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

            document.getElementById("timer-days_"+idTag).innerHTML = days +
            "DAY(S) ";

            document.getElementById("timer-hours_"+idTag).innerHTML = ("0"+hours).slice(-2) +
            "HR(S) ";

            document.getElementById("timer-mins_"+idTag).innerHTML = ("0"+mins).slice(-2) +
            "MIN(S) ";

            document.getElementById("timer-secs_"+idTag).innerHTML = ("0"+secs).slice(-2) +
            "SEC(S)";

        } else {

            document.getElementById("timer_"+idTag).innerHTML = "The countdown is over!";

        }

    }, 1000);
}