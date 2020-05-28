// set global variables

var timeleft = 60;
var QuestionIndex = 0;
var questionsEl = document.getElementById("questions");
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
var gameOver = new Audio("assets/sfx/gameover.wav");
var startSound = new Audio("assets/sfx/start.wav");

var ResponseBox = document.getElementById("feedback");
var playerScore = document.getElementById("score").innerHTML;
var score = 0;
var ThegameIsOver = false;

// javascript seems to prohibit sound effects unless they are manually executed by the user and need to be loaded in the buffer to fire correctly.
// as such, this routine plays all sound effects at the same time to load them up so they trigger correctly when the game is in execution.

function startTheDrums() {

  sfxRight.play();
  sfxWrong.play();
  gameOver.play();
  startSound.play();
  gameOver.pause();

}

// countdown timer.
function timer() {

  //timeleft counter starts at 60

  document.getElementById("invisibletimer").style.visibility = "visible";

  var downloadTimer = setInterval(function () {
    if (timeleft <= 1) {
      clearInterval(downloadTimer);
    }
    document.getElementById("progressBar").value = (60 - timeleft) + 1;
    timeleft -= 1;

    if ((ThegameIsOver === false) && (timeleft < 1)) {
      // the user has just failed - game over.
      gameOver.play();
      ThegameIsOver = true;
      document.getElementById("GameContent").style = "visibility:hidden";


      document.getElementById("introBox").style = "display:block";
      document.getElementById("FrontInfoBox").innerHTML = "GAME OVER <br> Final Score : " + score;
      document.getElementById("FrontInfoBox").setAttribute("class", "gameFont");
      document.getElementById("FrontInfoBox").style = "font-size:53px;";
      document.getElementById("startGameButton").style = "margin-left:0%;";
      document.getElementById("feedback").style = "visibility:hidden;";
      QuestionIndex = 0;
      document.getElementById("savescore").style = "visibility:visible";

    }

    // if our counter gets screwed below 0, then reset it and bring it back to 0 so it looks nice and ok - it's also an indication 
    if (timeleft < 0) {
      timeleft = 0;
    }
    document.getElementById("counter").innerText = timeleft + "   seconds left";
  }, 1000);

}



function rollQuestions() {
  // get current question object from array
  var currentQuestion = questions[QuestionIndex];
  var ShowThisQuestion = QuestionIndex + 1;
  document.getElementById("questionNumber").innerText = "Q" + ShowThisQuestion;
  document.getElementById("question-title").innerText = currentQuestion.title;
  var theChoices = document.getElementById("choices");
  theChoices.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // appemd buttons using bootstrap design and move margin slightly left
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("value", choice);
    choiceNode.setAttribute("class", "btn btn-light buttonPadding");
    choiceNode.setAttribute("id", "Btn" + i)

    // add choice array data and text content
    choiceNode.textContent = i + 1 + ". " + choice;

    // add trigger to fire off new event
    choiceNode.onclick = questionClickFunction;

    // dump it to the page
    theChoices.appendChild(choiceNode);
  });
}

function questionClickFunction() {

  // ok you've had your fund. now disable to div so you can't have a second shot until the next go.
  $('#choices').children().attr('disabled', 'disabled');

  // erm - is it OK?
  ResponseBox.setAttribute("style", "visibility:visible");
  if (this.value !== questions[QuestionIndex].answer) {

    // nope - not cool - got it wrong. 

    timeleft -= 15;


    // too bad, so sad, you got it wrong. add the nasty shake.

    document.getElementById(this.id).classList.add('apply-shake');
    document.getElementById("counter").classList.add('explode');

    // because javascript is shit, any element class added and them removed will automatically overide the existing effect. subsequently,
    // a timeout needs to be called to allow the initial effect to occur and then to provide enough time for the class to be removed
    // for next time around.

    setTimeout(function () {
      document.getElementById("counter").classList.remove('explode');
    }, 1000);

    // play you stuffed up sound effect
    sfxWrong.play();
    ResponseBox.setAttribute("style", "color:red");
    ResponseBox.textContent = "Wrong!";
  } else {
    // play "right" sound effect
    sfxRight.play();
    ResponseBox.setAttribute("style", "color:#94a294");
    ResponseBox.textContent = "Correct!";
    // document.getElementById("marioImage").style = "visibility:visible";
    score = score + 1;
    document.getElementById("score").innerHTML = "Score : " + score;
  }

  // flash right/wrong feedback on page for half a second

  setTimeout(function () {
    ResponseBox.setAttribute("style", "visibility:hidden");
  }, 2000);

  // move to next question
  QuestionIndex++;

  // check if we've run out of questions
  if (QuestionIndex === questions.length) {
    // not good dave - we have run out of questions - and you said this would never happen...
    timeleft = 0;

  } else {
    setTimeout(() => {
      rollQuestions();
      // because tre said that the timer does not pause during the questions process
      // i've just added two seconds to the clock. the delay is important because
      // the effects will not work without it. 
      // because javascript is not procedural - like that's a good thing.

      timeleft = timeleft + 2;
    }, 2000);
  }
}

function startGame() {

  // check to see if the input field is ready.
  var userinput = document.getElementById("initials").value;

  // check if user has populated the input field

   
if (userinput) {

// change the play button startGameButton to something else
document.getElementById("startGameButton").innerHTML = "Try Again";


// get the date of smashing record
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;


  // get what we have in storage
  var getStorageInfo = localStorage["browsergame"];
 
  // if getStorageInfo is not empty then parse json otherwise set as empty array
  var results = getStorageInfo ? JSON.parse(getStorageInfo) : [];

  // search for previous result
  const old = results.find((r) => r.ui === userinput);

  // if old record exists then replace score it it
  if (old) {
      // this is the most tricky part
      // old is not a copy of object from results array but 
      // reference, therefore if you change score in old then print 
      // results array you will see that array will have that change
      old.score = score;
  } else {
      // otherwise push in the array new results
      results.push({ ui: userinput, score: score, dmy : today });    
  }

  // replace by new results
  localStorage["browsergame"] = JSON.stringify(results);
}


  // set conditions for new game

  ThegameIsOver = false;
  score = 0;
  timeleft = 60;

  document.getElementById("score").innerHTML = "Score : " + score;
  document.getElementById("GameContent").style = "visibility:visible";
  startTheDrums();
  timer();
  document.getElementById("introBox").style = "display:none;"
  rollQuestions();


}


startGameButton.addEventListener("click", startGame, false);
