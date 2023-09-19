var startBtnEl = document.querySelector("#startBtn");   //variable targetting Start Quiz button
var cardHeadingEl = document.querySelector("#banner"); //Heading + questions 
var answerAEl = document.querySelector("#answerA");      //Answer A
var answerBEl = document.querySelector("#answerB");      //Answer B
var answerCEl = document.querySelector("#answerC");      //Answer C
var answerDEl = document.querySelector("#answerD");      //Answer D
var outcomeEl = document.querySelector("#outcome"); //target element that displays correct/incorrect
var answerbtnEl = document.querySelectorAll(".answerbtn"); //Capture all answer buttons
var blurbEl = document.querySelector("#blurb");  //blurb on opening screen
var questionNo = 0;                       //Variable to determine which question number to show
var userAnswer;                 //variable to capture user response to questions to assess if correct
var score; //user score
var time = 75; //time remaining
var endGameString;
var hiScoreEl = document.querySelector("#hiscore-initial");
var hiScoreBtn = document.querySelector("#hiscoreBtn");
var hiScoreFormEl = document.querySelector("#hiscore-form");
var hiScoreArray = []; //Array to store hiScoreObject (initials and score)
var hiScoreCurrent = {}; //hiScoreCurrent Object to store initials and score
//--------------------------------------//
//Store all the questions in this object//
//--------------------------------------//
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
        question: "Question 2 - ",
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

function initialiseQuiz() {
    console.log ("> initialiseQuiz() called");
    questionNo=0;                                               //start from question one
    console.log ("    Reset - Question number: " + questionNo );
    score = 0;                                                  //start with score zero
    console.log ("    Reset - Score: " + score);
    startBtnEl.style.display = "none";                          //Hide the start button
    console.log ("    Hide - Start Quiz Button");
    blurbEl.style.display = "none";                             //Hide the blurb
    console.log ("    Hide - Blurb");
    hiScoreEl.style.display = "none";                           //Hide the high score field
    console.log ("    Hide - High score field");
    hiScoreBtn.style.display = "none";                          //Hide the high score button
    console.log ("    Hide - High score button");
    for (i=0; i< answerbtnEl.length; i++) {                     //Show answer buttons (answerbtnEl)
        answerbtnEl[i].style.display = "block";
    }
    console.log ("    Show - Answers buttons") 
    //TODO: gameTimer
    retrieveStorage()                                           //retrieve hiScoreArray from local storage
    console.log("    hiScoreArray = " + hiScoreArray)

    quizInFlight();
    
    return;
}

//-------------------------------------------------------------------------//
//Displays next question in queue - checks to see if questions have run out//
//-------------------------------------------------------------------------//

function quizInFlight(){
    console.log("")
    console.log("> quizInFlight() Called")    
    if (questionNo < quizQuestions.length) {
        console.log("   ** Question " + questionNo + "/" + quizQuestions.length + " **");
        cardHeadingEl.textContent = quizQuestions[questionNo].question;  //Set question
        answerAEl.textContent = quizQuestions[questionNo].answerA;   //Set answer A
        answerBEl.textContent = quizQuestions[questionNo].answerB;   //Set answer B
        answerCEl.textContent = quizQuestions[questionNo].answerC;   //Set answer C
        answerDEl.textContent = quizQuestions[questionNo].answerD;   //Set answer D        
    } else {
        console.log("    You've reached the end and scored: " + score + " points");
        endGameString = "Well Done! You've Completed the Quiz!"
        setTimeout(endGame, 1000); //call endGame function after 1000 millisends (allows outcome to finish displaying)       
    }    
}

//-------------------------------------------//
//Function to check if user answer is correct//
//-------------------------------------------//
function checkAnswer(){    
    console.log("")
    console.log("> checkAnswer() Called") 
    //If userAnswer matches answer in array, add score, add question number
    if (userAnswer === quizQuestions[questionNo].correct){
        console.log("    User: " + userAnswer + ", Answer: " + quizQuestions[questionNo].correct);
        console.log("    Correct! +1 point no time penalty");
        score++; //add one to score
        console.log ("    Score is now: " + score);
        questionNo++; //add one to question number
        outcomeEl.textContent = "Correct!";

        outcomeEl.style.color = "darkgreen"; //dark green
        outcomeEl.style.background = "lightgreen";
        outcomeEl.style.border= "3px solid darkgreen";
        displayOutcome();
    } else {
        console.log("    User: " + userAnswer + ", Answer: " + quizQuestions[questionNo].correct)
        console.log("    Incorrect! Time penalty");
        time -= 15; //subtract 15 seconds from time
        console.log("    Remaining time: "+ time)
        questionNo++; //add one to question number
        outcomeEl.textContent = "Incorrect!";
        outcomeEl.style.color = "darkred"; //dark red//
        outcomeEl.style.background = "rgb(255, 204,203)"; //"lightred"
        outcomeEl.style.border= "3px solid darkred";
        displayOutcome();
    }
    quizInFlight();    
}

//-----------------------------------------------//
//Short Timer to display outcome of each question//
//-----------------------------------------------//
function displayOutcome() {
    console.log("")
    console.log("> displayOutcome() Called") 
    var outcomeSeconds = 1;
    outcomeEl.style.display = "block";
    var outcomeTimer = setInterval (function() {
        outcomeSeconds--;
        //outcomeEl.textcontent += outcomeSeconds;
        if (outcomeSeconds === 0) {
        outcomeEl.textContent = "";
        outcomeEl.style.display = "none"
        clearInterval(outcomeTimer)
        }
    }, 1000);
}

function gameTimer() {
    console.log("")
    console.log("> gameTimer() Called") 


}
//TO DO Timer function
    //Count down from 75
    // With each refresh, assess if timer runs out,
        //If timer runs out:
            //Set var to "Oh! You've run out of time!"
            // end game



//-------------------------------------------//
//-- Ends the game and show Hiscore fields --//
//-------------------------------------------//

function endGame() {
    console.log("")
    console.log("> endGame() Called") 
    //Hide Answers
    for (i=0; i< answerbtnEl.length; i++) {
        answerbtnEl[i].style.display = "none";
        }
    console.log ("    Hide - answers button")
    //change title 
    cardHeadingEl.textContent = endGameString;  //Set text to endGame String
    //show blurb and update text
    blurbEl.style.display = "block"; //Show blurb
    blurbEl.textContent = "You scored " + score + " points out of " + quizQuestions.length
    console.log ("    Show - Blurb");
    hiScoreFormEl.style.display ="inline-block"; //Show "Enter your Initials"
    hiScoreEl.style.display = "inline-block";  //Show freetext field for initials
    hiScoreBtn.style.display = "inline-block"; //Show "submit" button      
    console.log ("    Show - High score fields and button");
}

//---------------------------------------//
// Listen for Submit Initial and Hiscore //
//---------------------------------------//

hiScoreBtn.addEventListener('click', (event) => {
    console.log("")
    console.log("> hiScoreBtn clicked") 
    event.preventDefault();                     //Prevent refresh with submit button is clicked
//If "initials" field is blank - turn field yellow for 1 second//
    if (hiScoreEl.value === "") {
        console.log("    Error: Initial field blank")        
        var blankInitSeconds = 1;
            hiScoreEl.style.background = "yellow";
                var initialTimer = setInterval (function() {
                    blankInitSeconds--;
                    //outcomeEl.textcontent += outcomeSeconds;
                    if (blankInitSeconds === 0) {
                    hiScoreEl.style.background = "rgb(51, 57, 63)";        
                    clearInterval(initialTimer);
                    }
                }, 1000);
        return;
    }
    var initials = hiScoreEl.value.trim(); //store field value into "initials"
    hiScoreEl.value = ""; //clear iniitals field    
    hiScoreCurrent = {       //store score and initials in one object
        initials: initials,
        score: score     
    }
    console.log("    Initials captured: " + hiScoreCurrent.initials);  //initials in object
    console.log("    Score captured: " + hiScoreCurrent.score);        //score in object
    hiScoreArray.push(hiScoreCurrent); //push hiScoreCurrent object into hiScoreArray object         
    console.log("    Object pushed into Array");
       
    submitStorage();  //submit hiscoreArray for local storage
});

//-------------------------------------------------------------------------------//
// Submit hiScoreArray object array for local storage under key "QuizScoreArray" //
//-------------------------------------------------------------------------------//
function submitStorage() {
    console.log("")
    console.log("> submitStorage() Called") 
    localStorage.setItem("QuizScoreArray", JSON.stringify(hiScoreArray));
    console.log("    Object array stored in local storage")
};


//---------------------------------------------------------------------------------//
// Retrieve hiScoreArray object array for local storage under key "QuizScoreArray" //
//---------------------------------------------------------------------------------//

function retrieveStorage() {
    console.log("")
    console.log("> retriveStorage() Called") 
//Retrieve Array from local storage if doesn't exist then set as blank array
    hiScoreArray = JSON.parse(localStorage.getItem("QuizScoreArray")) ?? []; 
    return;
};

// TO DO
    //Start again
    //View high scores
    //Go back bring the user back to the start


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
    console.log("    userAnswer = " + userAnswer);
    checkAnswer();
});
    //If user clicks answer to A - update "userAnswer" variable to "a" and call "checkAnswer" function
answerBEl.addEventListener("click", () => {
    userAnswer = "b";    
    console.log("    userAnswer = " + userAnswer);
    checkAnswer();
});
    //If user clicks answer to A - update "userAnswer" variable to "a" and call "checkAnswer" function
answerCEl.addEventListener("click", () => {
    userAnswer = "c";
    console.log("    userAnswer = " + userAnswer);
    checkAnswer();
})
    //If user clicks answer to A - update "userAnswer" variable to "a" and call "checkAnswer" function
answerDEl.addEventListener("click", () => {
    userAnswer = "d";
    console.log("    userAnswer = " + userAnswer);
    checkAnswer();
})
