var startBtnEl = document.querySelector("#startBtn");   //variable targetting Start Quiz button
var cardHeadingEl = document.querySelector("#banner"); //Heading + questions 
var answerAEl = document.querySelector("#answerA");      //Answer A
var answerBEl = document.querySelector("#answerB");      //Answer B
var answerCEl = document.querySelector("#answerC");      //Answer C
var answerDEl = document.querySelector("#answerD");      //Answer D
var questionNo = 0;                       //Variable to determine which question number to show
var userAnswer;                 //variable to capture user response to questions to assess if correct
var score; //user score
var time = 75; //time remaining
var outcomeEl = document.querySelector("#outcome"); //target element that displays correct/incorrect
var answerbtnEl = document.querySelectorAll(".answerbtn"); //Capture all answer buttons
console.log(answerbtnEl)
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
        answerA: "A: Yes2",
        answerB: "B: No2*",
        answerC: "C: Maybe2",
        answerD: "D:Other2,",
        correct: "b"
    },

    { 
        question: "Question 3",
        answerA: "A: Yes3",
        answerB: "B: No3",
        answerC: "C: Maybe3*",
        answerD: "D: Other3,",
        correct: "c"
    },

    { 
        question: "Question 4",
        answerA: "A: Yes4",
        answerB: "B: No4",
        answerC: "C: Maybe4",
        answerD: "D:Other4*",
        correct: "d"
    },
]

console.log("Number of questions " + quizQuestions.length)

function initialiseQuiz() {
    console.log ("initialiseQuiz() called");
    questionNo=0; //start from question one
    console.log ("Question number set to " + questionNo )
    score = 0; //start with score zero
    console.log ("Score set to " + score)
    console.log ("Hiding start button")
    startBtnEl.style.display = "none"; //Hide the start button
    
    //display answerbtnEl as blocks
    for (i=0; i< answerbtnEl.length; i++) {
    answerbtnEl[i].style.display = "block";
    } 
    //timer
    quizInFlight();
    

//change formatting of answer etc (padding, hide/show etc)



return;
}

function quizInFlight(){
    console.log ("quizInFlight Called")    
    if (questionNo < quizQuestions.length) {
        console.log("questionNo = " + questionNo + ", No. of Q = " + quizQuestions.length);
        cardHeadingEl.textContent = quizQuestions[questionNo].question;  //Set question
        answerAEl.textContent = quizQuestions[questionNo].answerA;   //Set answer A
        answerBEl.textContent = quizQuestions[questionNo].answerB;   //Set answer B
        answerCEl.textContent = quizQuestions[questionNo].answerC;   //Set answer C
        answerDEl.textContent = quizQuestions[questionNo].answerD;   //Set answer D
        
    } else {
       //console.log("You have reached the end of the quiz");
       console.log("hi - end of game");
       //call end game function
    }
    
}


//-------------------------------------------//
//Function to check if user answer is correct//
//-------------------------------------------//
function checkAnswer(){    
    //If userAnswer matches answer in array, add score, add question number
    if (userAnswer === quizQuestions[questionNo].correct){
        console.log("checkAnswer() engaged. User: " + userAnswer + ", Answer: " + quizQuestions[questionNo].correct + " Correct! +1 point no time penalty");
        score++; //add one to score
        console.log ("Score is now: " + score);
        questionNo++; //add one to question number
        outcomeEl.textContent = "Correct!";
        outcomeEl.style.color = "green";
        displayOutcome();
    } else {
        console.log("checkAnswer() engaged. User: " + userAnswer + ", Answer: " + quizQuestions[questionNo].correct + " Wrong! Time penalty");
        time -= 15; //subtract 15 seconds from time
        console.log("Time: "+ time)
        questionNo++; //add one to question number
        outcomeEl.textContent = "Incorrect!";
        outcomeEl.style.color = "red";
        displayOutcome();
    }
    quizInFlight();    
}

//-----------------------------------------//
//Timer to display outcome of each question//
//-----------------------------------------//
function displayOutcome() {
    var outcomeSeconds = 1
    var outcomeTimer = setInterval (function() {
        outcomeSeconds--;
        outcomeEl.textcontent += outcomeSeconds;
        if (outcomeSeconds === 0) {
        outcomeEl.textContent = "";
        clearInterval(outcomeTimer)
        }
    }, 1000);
}


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


//-----------------------------------------------------//
//Listener to start game when user clicks on "Start Quiz"
//-----------------------------------------------------//
startBtnEl.addEventListener("click", initialiseQuiz);



//----------------------------------------//
//Listener to capture response to question//
//----------------------------------------//
    //If user clicks answer to A - update "userAnswer" variable to "a" and call "checkAnswer" function
answerAEl.addEventListener("click", () => {
    userAnswer = "a";
    console.log("answerA() engaged. " + userAnswer + " selected");
    checkAnswer();
});
    //If user clicks answer to A - update "userAnswer" variable to "a" and call "checkAnswer" function
answerBEl.addEventListener("click", () => {
    userAnswer = "b";    
    console.log("answerB() engaged. " + userAnswer + " selected");
    checkAnswer();
});
    //If user clicks answer to A - update "userAnswer" variable to "a" and call "checkAnswer" function
answerCEl.addEventListener("click", () => {
    userAnswer = "c";
    console.log("answerC() engaged. " + userAnswer + " selected");
    checkAnswer();
})
    //If user clicks answer to A - update "userAnswer" variable to "a" and call "checkAnswer" function
answerDEl.addEventListener("click", () => {
    userAnswer = "d";
    console.log("answerD() engaged. " + userAnswer + " selected");
    checkAnswer();
})
