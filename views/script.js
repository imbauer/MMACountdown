
$(document).ready(function() {

    $("#timeZones").change(function(){
      // var newYork    = moment.tz("2014-06-01 12:00", "America/New_York");
      // var losAngeles = newYork.clone().tz("America/Los_Angeles");
      // console.log(newYork.format());    // 2014-06-01T12:00:00-04:00
      // console.log(losAngeles.format()); // 2014-06-01T09:00:00-07:00

        // alert('Selected value: ' + $(this).val());
        // console.log($('.s4-ql .menu-item-text').html());
        console.log($(this).val());
        var f = $(this).val();
        console.log($(this).find('option:selected').attr("gmtAdjustment"));
        $('.work__list-item').each(function(i, obj) {
            console.log(i);
            console.log(obj);

            var timeOnWebpage = $(obj).find('.clockRight .textRotate').text();
            var ny = moment.tz('2014-08-01 16:00', "America/New_York");
            console.log(ny);

            console.log('vvvvvvv');
            console.log($(obj).find('.clockRight .textRotate').text());
            $(obj).find('.clockRight .textRotate').text(ny);
            console.log('---------> ' + f);
            if (parseInt(f) === parseInt(-7)) {
              console.log('IF STATEMENT RUN');

              var la = ny.clone().tz("America/Los_Angeles");
              console.log(la);

              $(obj).find('.clockRight .textRotate').text(la);
            }
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
