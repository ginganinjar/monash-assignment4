
var defaults = {}
theTimer = 60000;
, one_second = 1000
, one_minute = one_second * 60
, one_hour = one_minute * 60
, one_day = one_hour * 24
, startDate = new Date()
, face = document.getElementById('lazy');

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
var requestAnimationFrame = (function() {

setInterval(function(){
        theTimer --;
},1000);
alert(theTimer);

return window.requestAnimationFrame       || 
       window.webkitRequestAnimationFrame || 
       window.mozRequestAnimationFrame    || 
       window.oRequestAnimationFrame      || 
       window.msRequestAnimationFrame     || 
       function( callback ){
         window.setTimeout(callback, 1000 / 60);
       };
}());

tick();



face.innerText = "9999";
requestAnimationFrame(tick);

}