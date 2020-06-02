// set global variables

var timeleft = 60;
var questionIndex = 0;
var questionsEl = document.getElementById("questions");
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
var gameOver = new Audio("assets/sfx/gameover.wav");
var startSound = new Audio("assets/sfx/start.wav");

var responseBox = document.getElementById("feedback");
var playerScore = document.getElementById("score").innerHTML;
var score = 0;
var thegameIsOver = false;


function playSound(soundfile) {

    if (document.getElementById('soundvar').checked) {
        //  Nothing to hear here.
     return;
    
    } else {
    
        if (soundfile == "correct")         {
            sfxRight.play();
        } else if (soundfile == "wrong")    {
            sfxWrong.play();
        } else if (soundfile == "over")     {
            gameOver.play();
        } else if (soudfile = "startgame")  {
            startSound.play();
        }
    }
}


function soundSwitch() {
    if (document.getElementById('soundvar').checked) {
        // sound off
        document.getElementById("speakerimg").setAttribute("src", "assets/images/soundon.png");
        document.getElementById("soundvar").checked = false;


    } else {
        // sound on
        document.getElementById("speakerimg").setAttribute("src", "assets/images/soundoff.png");
        document.getElementById("soundvar").checked = true;
    }
}


function thetimer() {
// rewrote this function to allow for the termination of the timer as before it was embedded in the loop.

    var timerRunningFunction = function () {

        if ((thegameIsOver === false) && (timeleft < 1)) {
            // the user has just failed - game over.
            // gameOver.play();
            playSound("over");

            thegameIsOver = true;
            document.getElementById("GameContent").style = "visibility:hidden";
            document.getElementById("introBox").style = "display:block";
            document.getElementById("FrontInfoBox").innerHTML = "GAME OVER <br> Final Score : " + score;
            document.getElementById("FrontInfoBox").setAttribute("class", "gameoverflash");
            document.getElementById("startGameButton").style = "margin-left:0%;";
            document.getElementById("feedback").style = "visibility:hidden;";
            questionIndex = 0;
            document.getElementById("savescore").style = "visibility:visible";
        }  

        if (timeleft > 0) {
        timeleft --;
      

        } else
              { timeleft = 0; }
           document.getElementById("progressBar").value = (60 - timeleft) + 1;
           document.getElementById("counter").innerText = timeleft + " seconds";   
      };
    // the time is set to go off every 1 second which brings the timer value down
    timer = setInterval(timerRunningFunction, 1000);
}

function rollQuestions() {
    // get current question object from array
    var currentQuestion = questions[questionIndex];
    var showThisQuestion = questionIndex + 1;
    document.getElementById("questionNumber").innerText = "Q" + showThisQuestion;
    document.getElementById("question-title").innerText = currentQuestion.title;
   
    var theChoices = document.getElementById("choices");
    theChoices.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
    // appemd buttons using bootstrap design and move margin slightly left
       
       // get the correct answer
        var theAnswer = currentQuestion.answer;
       
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("value", choice);
        choiceNode.setAttribute("class", "btn btn-light buttonPadding");
        choiceNode.setAttribute("style", "margin:1%;")
        choiceNode.setAttribute("id", "Btn" + i)
        if (theAnswer === choice) {
            // bind action to play sound effect to the button
            // this will resolve the issue with the first question not firing
            // the sound effect correctly
            choiceNode.addEventListener("click", function () { playSound("correct") }, false);
        } else {
            choiceNode.addEventListener("click", function () { playSound("wrong") }, false);
        }

        // add choice array data and text content
        choiceNode.textContent = i + 1 + ". " + choice;

        // add trigger to fire off new event
        choiceNode.onclick = questionClickFunction;

        // dump it to the page
        theChoices.appendChild(choiceNode);
 
    });
}

function questionClickFunction() {

    // ok you've had your fun. now disable to div so you can't have a second shot until the next go.
    $('#choices').children().attr('disabled', 'disabled');

    // erm - is it OK?
    responseBox.setAttribute("style", "visibility:visible");
    // pause the timer


    if (this.value !== questions[questionIndex].answer) {
           
        // nope - not cool - got it wrong. 

        timeleft -= 15;

        // too bad, so sad, you got it wrong. add the nasty shake.

        document.getElementById(this.id).classList.add('apply-shake');
        document.getElementById("counter").classList.add('explode');

        // because javascript is, any element class added and them removed will automatically overide the existing effect. subsequently,
        // a timeout needs to be called to allow the initial effect to occur and then to provide enough time for the class to be removed
        // for next time around.

        setTimeout(function() {
            document.getElementById("counter").classList.remove('explode');
        }, 1000);

        responseBox.setAttribute("style", "color:red");
        responseBox.textContent = "Wrong!";
   
   
    } else {

        responseBox.setAttribute("style", "color:#94a294");
        responseBox.textContent = "Correct!";
        score = score + 1;
        document.getElementById("score").innerHTML = "Score : " + score;
    }

    // flash right/wrong feedback on page for half a second

    setTimeout(function() {
        responseBox.setAttribute("style", "visibility:hidden");

    }, 2000);

    // move to next question
    questionIndex++;

    // check if we've run out of questions
    if (questionIndex === questions.length) {
        // not good dave - we have run out of questions - and you said this would never happen...
        timeleft = 0;
 
    } else {

        setTimeout(() => {
        rollQuestions();
          
                    }, 2000);
            }
}

function startGame() {

    function isHidden(el) {
        return (el.offsetParent === null)
    }

    playSound("statgame");
    // check to see if the input field is ready.
    var userinput = document.getElementById("initials").value;

    // check if user has populated the input field

    if (userinput) {

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

        // otherwise push in the array new results
        results.push({ ui: userinput, score: score, dmy: today });

        // replace by new results
        localStorage["browsergame"] = JSON.stringify(results);
    }


    // set conditions for new game

    thegameIsOver = false;
    score = 0;
    timeleft = 60;

    document.getElementById("score").innerHTML = "Score : " + score;
    document.getElementById("GameContent").style = "visibility:visible";
    thetimer();
   
    if (isHidden("introBox") === false) {
    document.getElementById("introBox").style = "display:none;"
    }

    rollQuestions();
   
}

// add event listeners 

startGameButton.addEventListener("click", startGame, false);
speakerimg.addEventListener("click", soundSwitch, false);
