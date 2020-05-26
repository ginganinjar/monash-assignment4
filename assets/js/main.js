

// countdown timer.
function timer() {

//timeleft counter starts at 60

document.getElementById("invisibletimer").style.visibility = "visible";
var timeleft = 60;
var downloadTimer = setInterval(function(){
  if(timeleft <= 1){
    clearInterval(downloadTimer);
  }
  document.getElementById("progressBar").value = ((60 - timeleft) / 60) * 10 ;
  timeleft -= 1;
  document.getElementById("counter").innerText = timeleft + "   seconds left";
}, 1000);

}

// timer();


