var startBtnEl = document.querySelector("#startBtn");               //variable targetting Start Quiz button
var cardHeadingEl = document.querySelector("#question") //Heading + questions 
var answerAEl = document.querySelector("#answerA") //Answer A
var answerBEl = document.querySelector("#answerB") //Answer B
var answerCEl = document.querySelector("#answerC") //Answer C
var answerDEl = document.querySelector("#answerD") //Answer D
var i = 0 //Variable to determine which question number to show
var userAnswer; //variable to capture user responsen to questions to assess if correct
var score; //user score
var time = 75; //time remaining

//Store all the questions here//
var quizQuestions = [
    {
        question: "Question 1 - Why is the sky blue?", 
        answerA: "A: Because it has been painted blue*",
        answerB: "B: It is a reflection of the sea",
        answerC: "C: Because Red would've been too angry a colour",
        answerD: "D: Why are *you* blue?",
        correct: "a",
    },
    
    { 
        question: "Question 2",
        answerA: "Yes2",
        answerB: "No2*",
        answerC: "Maybe2",
        answerD: "Other2,",
        correct: "b"
    },

    { 
        question: "Question 3",
        answerA: "Yes3",
        answerB: "No3",
        answerC: "Maybe3*",
        answerD: "Other3,",
        correct: "c"
    }
]

console.log("Number of questions " + quizQuestions.length)

function initialiseQuiz() {
    console.log ("initialiseQuiz() called");
    i=0; //start from question one
    score = 0; //start with score zero
        //timer
    quizInFlight();
//Call timer function - 75 seconds
//Hide "start quiz button"
//change formatting of answer etc (padding, hide/show etc)
//left align etc
//Present question in sequence (counter that triggers on submission)

//Need a counter/check to see if we've reached the end (also need to check timer)

return;
}

function quizInFlight(){
    console.log ("quizInFlight Called")    
    if (i > quizQuestions.length) {
        //console.log("You have reached the end of the quiz");
        console.log("hi - end of game");
        //call end game function
    } else {
        console.log('else')
    cardHeadingEl.textContent = quizQuestions[i].question;  //Set question
    answerAEl.textContent = quizQuestions[i].answerA;   //Set answer A
    answerBEl.textContent = quizQuestions[i].answerB;   //Set answer B
    answerCEl.textContent = quizQuestions[i].answerC;   //Set answer C
    answerDEl.textContent = quizQuestions[i].answerD;   //Set answer D
    }
    
}



function checkAnswer(){    
    console.log("")
    if (userAnswer === quizQuestions[i].correct){
        console.log("checkAnswer() engaged. User: " + userAnswer + ", Answer: " + quizQuestions[i].correct + " Correct! +1 point no time penalty");
        score++; //add one to score
        console.log ("Score is now: " + score);
        i++; //add one to question number
    } else {
        console.log("checkAnswer() engaged. User: " + userAnswer + ", Answer: " + quizQuestions[i].correct + " Wrong! Time penalty");
        time -= 15; //subtract 15 seconds from time
        console.log("Time: "+ time)
        i++; //add one to question number

    }
    quizInFlight();
    
}


//Append 4 responses that have event listener attached
    //Clicking will set variable to 'a', 'b, 'c' or 'd'
    //Compares variable to correct answer in array
        // if equal then display correct + 1 score,
        // else penalise 
        // move to next question

    //  If questions run out - end game
            // Set var to "Congratulations you have reached the end"

function timer() {}
//Timer function
    //Count down from 75
    // With each refresh, assess if timer runs out,
        //If timer runs out:
            //Set var to "Oh! You've run out of time!"
            // end game

//endGame function
    //Update screen to display variable (end game)
    //Show score
    //Field to type in initials
    //Start again
    //View high scores



//Listener to start game when user clicks on "Start Quiz"
startBtnEl.addEventListener("click", initialiseQuiz);

//Listener to capture response to question//
    //If user clicks answer to A - update "userAnswer" variable to "a" and call "checkAnswer" function
answerAEl.addEventListener("click", answerA)
function answerA() {
    userAnswer = "a";
    console.log("answerA() engaged. " + userAnswer + " selected");
    checkAnswer();
}

answerBEl.addEventListener("click", answerB)

function answerB() {
    userAnswer = "b";    
    console.log("answerB() engaged. " + userAnswer + " selected");
    checkAnswer();
}

answerCEl.addEventListener("click", answerC)

function answerC() {
    userAnswer = "c";
    console.log("answerC() engaged. " + userAnswer + " selected");
    checkAnswer();
}
answerDEl.addEventListener("click", answerD)

function answerD() {
    userAnswer = "d";
    console.log("answerD() engaged. " + userAnswer + " selected");
    checkAnswer();
}
