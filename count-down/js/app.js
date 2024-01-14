// Targeted date
var countDownDate = new Date("jan 10, 2024 00:00:00 AM").getTime();
// var countDownDate = new Date("dec 31, 2023 00:00:00 AM").getTime();
document.getElementById("end-date");
const inputs = document.querySelectorAll("input");
// const days = document.getElementById("#day");
// const hours = document.getElementById("#hour");
// const minutes = document.getElementById("#minute");
// const seconds = document.getElementById("#second");
function clock(){
// Update the count down every 1 second
  var x = setInterval(function() {
      // Get current date and time
      var now = new Date().getTime();
      // Time to the date
      var timeToDate = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      inputs[0].value = Math.floor(timeToDate / (1000 * 60 * 60 * 24));
      inputs[1].value = Math.floor((timeToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      inputs[2].value = Math.floor((timeToDate % (1000 * 60 * 60)) / (1000 * 60));
      inputs[3].value = Math.floor((timeToDate % (1000 * 60)) / 1000);
      // Display the result in the element with id="counter"
      if(timeToDate < 0) return;
      // If the countdown is finished, display a message 
      if (timeToDate < 0) {
          clearInterval(x);
          document.getElementById("end-date").innerHTML = "Countdown finished";
      }
  }, 1000);

  
}

clock();

// var _second = 1000;
// var _minute = _second * 60;
// var _hour = _minute * 60;
// var _day = _hour * 24;