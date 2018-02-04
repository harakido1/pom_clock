$(document).ready(function() {
  var buzzer = $('#buzzer')[0]; // "0" index of audio object.
  var workTime = parseInt($("#num").html()); // Convert string number to integer.
  var breakTime = parseInt($('#breakNum').html());
  $('#reset').hide();
  $("#start").click(function() {
    var counter = setInterval(timer, 1000); // 1000ms. = 1second. setInterval callback function.
    workTime *= 60; // convert "num" to minutes
    breakTime *= 60;
    function timer() {  // create timer function used in "counter" variable.
      // Local function timer.
      $(
        "#start, #minus5Session, #plus5Session, #minus5Break, #plus5Break, #breakNum, #title1, #title2"
      ).hide();
      // Hide variables
      $("#trackTime").show();
      $("#trackTime").html("Session Time: "); // overright with "Session Time".
      workTime -= 1; // decrement "num"
      if (workTime === 0) {
        buzzer.play();
        buzzer.currentTime=3; // Stop buzzer after 3 seconds.
        clearInterval(counter); // Target counter variable to 'break' count down at '0' by clearing counter.
        var startBreak = setInterval(breakTimer, 1000);
        $("#num").hide();
      }
      if(workTime % 60 >= 10){
         $('#num').html(Math.floor(workTime / 60) + ":" + workTime % 60); // Convert "num" to time format.
         }
      else {
        $('#num').html(Math.floor(workTime / 60) + ":" + "0" + workTime % 60); // Convert seconds less than 10 to time format.
      }

      function breakTimer() {
        $("#trackTime").html("Break Time: ");
        $("#breakNum").show();
        $("#trackTime").show();
        breakTime -= 1; // decrament breakNum.
        if (breakTime === 0) {
          clearInterval(startBreak);
          buzzer.play();
          buzzer.currentTime=3;
          $("#reset").show();
          $("#breakNum, #trackTime").hide();
        }
        
       if(breakTime % 60 >= 10){
         $('#breakNum').html(Math.floor(breakTime / 60) + ":" + breakTime % 60);
         }
      else {
        $('#breakNum').html(Math.floor(breakTime / 60) + ":" + "0" + breakTime % 60);
      }
      }
    }
  });

  $("#reset").click(function() {
    workTime = 25;
    breakTime = 25;
    $("#num").html(workTime);
    $("#breakNum").html(breakTime);
    $(
      "#start, #minus5Session, #plus5Session, #minus5Break, #plus5Break, #num, #breakNum, #title1, #title2"
    ).show();
    $("#reset, #trackTime").hide();
  });

  $("#minus5Session").click(function() {
    if (workTime > 1) {
      workTime -= 1;
      $("#num").html(workTime);
    }
    event.preventDefault(); // prevents button jumps on click from mouse when clock is less than full screen.
  });
  $("#plus5Session").click(function() {
    workTime += 5;
    $("#num").html(workTime);
    event.preventDefault();
  });
  $("#minus5Break").click(function() {
    if (breakTime > 1) {
      breakTime -= 1;
      $("#breakNum").html(breakTime);
    }
    event.preventDefault();
  });
  $("#plus5Break").click(function() {
    breakTime += 5;
    $("#breakNum").html(breakTime);
    event.preventDefault();
  });
});
