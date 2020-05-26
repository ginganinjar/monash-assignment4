// set global variables

var timeleft = 60;
var QuestionIndex = 0;
var questionsEl = document.getElementById("questions");
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
var ResponseBox = document.getElementById("feedback");

// countdown timer.
function timer() {

//timeleft counter starts at 60

document.getElementById("invisibletimer").style.visibility = "visible";

var downloadTimer = setInterval(function(){
  if(timeleft <= 1){
    clearInterval(downloadTimer);
  }
  document.getElementById("progressBar").value = ((60 - timeleft) / 60) * 10 ;
  timeleft -= 1;
  document.getElementById("counter").innerText = timeleft + "   seconds left";
}, 1000);

}



function rollQuestions () {
  // get current question object from array
  var currentQuestion = questions[QuestionIndex];
  var ShowThisQuestion = QuestionIndex + 1;
document.getElementById("questionNumber").innerText = "Q" + ShowThisQuestion;
  document.getElementById("question-title").innerText = currentQuestion.title;
  var theChoices = document.getElementById("choices");
  theChoices.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // appemd buttons using bootstrap design and move margin slightly left
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("value", choice); 
    choiceNode.setAttribute("class", "btn btn-light buttonPadding");
    choiceNode.setAttribute("id", "Btn" + i )

    // add choice array data and text content
    choiceNode.textContent = i + 1 + ". " + choice;

    // add trigger to fire off new event
    choiceNode.onclick = questionClickFunction;

    // dump it to the page
    theChoices.appendChild(choiceNode);
  });
}

function questionClickFunction() {
  // erm - is it OK?
  ResponseBox.setAttribute("style", "visibility:visible");
  if (this.value !== questions[QuestionIndex].answer) {

    // nope - not cool - got it wrong. 

    timeleft -= 15;
    if (timeleft < 0) {
      timeleft = 0;
    }

      // too bad, so sad, you got it wrong. add the nasty shake.
     
      document.getElementById(this.id).classList.add('apply-shake');
    
    // play you stuffed up sound effect
      sfxWrong.play();
      ResponseBox.setAttribute("style", "color:red");
      ResponseBox.textContent = "Wrong!";
  } else {
    // play "right" sound effect
    sfxRight.play();
    ResponseBox.setAttribute("style", "color:green");
    ResponseBox.textContent = "Correct!";
  
  }

  // flash right/wrong feedback on page for half a second
 
  setTimeout(function() {
    ResponseBox.setAttribute("style", "visibility:hidden");
  }, 2000);

  // move to next question
  QuestionIndex++;

  // check if we've run out of questions
  if (QuestionIndex === questions.length) {
    quizEnd();
  } else {
    setTimeout(() => {rollQuestions();  }, 2000);
  
    
  }


}

function startGame() {


  timer();
  document.getElementById("introBox").style = "visibility:hidden;"
  rollQuestions();


}


startGameButton.addEventListener("click",startGame, false);
