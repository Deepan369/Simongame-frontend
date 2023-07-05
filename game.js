var buttonColors = ["red","green","yellow","blue"];
var gamepattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var random = (Math.random() * 4);
  var randomnumber = Math.floor(random);
  var randomchosencolor = buttonColors[randomnumber];
  gamepattern.push(randomchosencolor);
  $('#' + randomchosencolor).fadeOut(100).fadeIn(100);
  Playsound(randomchosencolor);
}

function Playsound(name){
    var audio = new Audio(name + '.mp3');
    audio.play();

}

function animatePress(currentcolor){
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function(){
      $("#" + currentcolor).removeClass("pressed");
    },100);
}

$(".btn").click(function(){
  var userchosencolor = $(this).attr("id");
  userClickedPattern.push(userchosencolor);
  Playsound(userchosencolor);
  animatePress(userchosencolor);
  checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentlevel){
  if(gamepattern[currentlevel] === userClickedPattern[currentlevel]){
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    Playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over,Press Any key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
  }
}
function startOver(){
  level = 0;
  gamepattern = [];
  started = false;
}
