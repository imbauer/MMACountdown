
$(document).ready(function() {

    $("#timeZones").change(function(){


        console.log($(this).val());
        var f = $(this).val();
        var newGMT = $(this).find('option:selected').attr("value");
        $('.work__list-item').each(function(i, obj) {
            // console.log(i);
            // console.log(obj);

            var newYork    = moment.tz("2014-06-01 12:00", "Europe/London");
            var losAngeles = newYork.clone().tz("US/Arizona");
            var london     = newYork.clone().tz("America/New_York");
            console.log();
            console.log(newGMT);
            console.log('oooooooo');
            console.log(newYork);
            console.log(losAngeles);
            console.log(london);


            var timeToBeChanged = $(obj).find('.clockRight .textRotate').text();
            var time = moment(new Date(timeToBeChanged.split(':00 ')[0])).format('YYYY-MM-DD HH:mm');
            var offset = timeToBeChanged.split(':00 ')[1].trim();
            // console.log('Old Region: ' + offset);
            console.log(time);
            console.log(offset);
            var currentTime = moment.tz(time.toString(), offset);
            var differentTime = currentTime.clone().tz(newGMT);
            console.log(currentTime);
            console.log(differentTime);
            console.log($(obj).find('.clockRight .textRotate').text());
            console.log('New Region: ' + newGMT);
            console.log(differentTime.toString().replace(/GMT.*/g, newGMT));
            $(obj).find('.clockRight .textRotate').text(differentTime.toString().replace(/GMT.*/g, newGMT)); //._d.toString().replace(/GMT.*/g, newGMT)

        });
    });



  $(".work__list-item").click(function() {
    console.log(this.id);
    console.log("#first" + this.id);
    $("#first" + this.id).slideToggle("slow");
  });

  $("#match_1").click(function() {
    console.log(this.id);
    console.log(document.getElementById(this.id).checked);

    $.ajax({
        url: "hey",
        success: function(result)
        {
            console.log(result);
            // $('.work__list').html(result);
        }
    });

  });
  $("#match_2").click(function() {
    console.log(this.id);
    console.log(document.getElementById(this.id).checked);
  });

  $('#ufcCheckBox').change(function() {
    console.log($(this).val());
    console.log(document.getElementById(this.id).checked);
    // $('#checkboxOne').val(this.checked);
  });

  $('#bellatorCheckBox').change(function() {
    console.log($(this).val());
    console.log(document.getElementById(this.id).checked);
    // $('#checkboxOne').val(this.checked);
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
