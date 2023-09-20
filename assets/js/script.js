var startBtnEl = document.querySelector("#startBtn");               //variable targetting Start Quiz button
var cardHeadingEl = document.querySelector("#banner");              //Heading + questions 
var answerAEl = document.querySelector("#answerA");                 //Answer A
var answerBEl = document.querySelector("#answerB");                 //Answer B
var answerCEl = document.querySelector("#answerC");                 //Answer C
var answerDEl = document.querySelector("#answerD");                 //Answer D
var outcomeEl = document.querySelector("#outcome");                 //target element that displays correct/incorrect
var answerbtnEl = document.querySelectorAll(".answerbtn");          //Capture all answer buttons
var blurbEl = document.querySelector("#blurb");                     //blurb on opening screen
var questionNo = 0;                                                 //Variable to determine which question number to show
var userAnswer;                                                     //variable to capture user response to questions to assess if correct
var score = 0;                                                      //user score
var timerEl = document.querySelector("#timer")                      //variable targetting timer element
var gameSeconds = 0;                                                //variable to store time remaining
var endGameString;                                                  //String to display when game ends (time out or finish questions)
var hiScoreEl = document.querySelector("#hiscore-initial");         //variable targetting initials field
var hiScoreBtn = document.querySelector("#hiscoreBtn");             //variable targetting initials and score submit button
var hiScoreFormEl = document.querySelector("#hiscore-form");        //variable targeeting label for initials field
var hiScoreArray = [];                                              //Array to store hiScoreObject (initials and score)
var hiScoreCurrent = {};                                            //Object to store initials and score
var gameHasEnded = "N" ;                                            //variable that gameTimer() checks to determine if the game has already ended and the timer should stop <---- NOT USED
var gameTimeCounter;                                                //variable to iteratively count down gamerSeconds
var hiscoreulEl = document.querySelector("#highscore-ul");          //varlable target unordered list element to populate high scores
var reloadBtnEl = document.querySelector("#reloadBtn");             //Variable targetting the reload button that appears on High score screen
var clearHiScoreBtnEl = document.querySelector("#clearHiScoreBtn"); //Variable targetting the "Clear High score" button that appears on High score screen
var hiScoreLinkEl = document.querySelector("#hiscorelink");         //variable targetting the "View High Scores" element in header

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
    clearHiScoreBtnEl.style.display = "none";                   //Hide the clear high score button
    console.log ("    Hide - Clear High score button");
    reloadBtnEl.style.display = "none";                         //Hide the Reload button
    console.log ("    Hide - Reload button");
    hiScoreLinkEl.style.visibility  = "hidden";                 //Hide View High score link
    console.log ("    Hide - View High Scores link");
    for (i=0; i< answerbtnEl.length; i++) {                     //Show answer buttons (answerbtnEl)
        answerbtnEl[i].style.display = "block";
    }
    console.log ("    Show - Answers buttons") 
    retrieveStorage()                                           //retrieve hiScoreArray from local storage
    console.log("    hiScoreArray = " + hiScoreArray)
    gameTimer();
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
        answerAEl.textContent = quizQuestions[questionNo].answerA;       //Set answer A
        answerBEl.textContent = quizQuestions[questionNo].answerB;       //Set answer B
        answerCEl.textContent = quizQuestions[questionNo].answerC;       //Set answer C
        answerDEl.textContent = quizQuestions[questionNo].answerD;       //Set answer D        
    } else {
        console.log("    You've reached the end and scored: " + score + " points");
        endGameString = "Well Done! You've Completed the Quiz!"
        setTimeout(endGame, 1000); //call endGame function after 1000 millisends delay (allows outcome to finish displaying)       
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
        score++;                                    //add one to score
        console.log("    Correct! User: " + userAnswer + ", Answer: " + quizQuestions[questionNo].correct + "+1 point.");                                            
        console.log("    Score is now: " + score);
        questionNo++;                               //add one to question number
        outcomeEl.textContent = "Correct!";
        outcomeEl.style.color = "darkgreen";        
        outcomeEl.style.background = "lightgreen";
        outcomeEl.style.border= "3px solid darkgreen";
        displayOutcome();
    } else {
        gameSeconds -= 15;                          //subtract 15 seconds from time
        console.log("    Incorrect! User: " + userAnswer + ", Answer: " + quizQuestions[questionNo].correct + "-15 seconds.")        
        console.log("    Remaining time: "+ gameSeconds)
        questionNo++;                               //add one to question number
        outcomeEl.textContent = "Incorrect!";
        outcomeEl.style.color = "darkred"; 
        outcomeEl.style.background = "rgb(255, 204,203)"; 
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
        if (outcomeSeconds === 0) {
            outcomeEl.textContent = "";
            outcomeEl.style.display = "none";       
            clearInterval(outcomeTimer)
        }
    }, 1000);
}

function gameTimer() {
    console.log("")
    console.log("> gameTimer() Called") 
    gameSeconds = 30;                                                   //set timer to 75 seconds (FIX THIS AT THE END)
    timerEl.textContent = gameSeconds + " seconds remaining";
    console.log("    gameSeconds set to " + gameSeconds + " seconds!!")
    gameTimeCounter = setInterval (function() {
        gameSeconds--;
        timerEl.textContent = gameSeconds + " seconds remaining";
        if (gameSeconds <= 0) {
            console.log("    You've run out of time with " + score + " points");
            endGameString = "You've run out of time!"                   //text to display if user runs out of time  
            clearInterval(gameTimeCounter)     
            endGame();                
        }
    }, 1000);
    return;
};

//-------------------------------------------//
//-- Ends the game and show Hiscore fields --//
//-------------------------------------------//

function endGame() {
    console.log("")
    console.log("> endGame() Called")        
    clearInterval(gameTimeCounter);                                     //Stop the gameTimeCounter 
    console.log ("    Timer stopped with " + gameSeconds + " seconds remaining")
    //Hide Answer buttons
    for (i=0; i< answerbtnEl.length; i++) {
        answerbtnEl[i].style.display = "none";
        }
    console.log ("    Hide - answers button")    
    cardHeadingEl.textContent = endGameString;      //Set text to endGame String
    blurbEl.style.display = "block";                //Show blurb
    blurbEl.textContent = "You scored " + score + " points out of " + quizQuestions.length //update blurb text
    console.log ("    Show - Blurb");
    hiScoreFormEl.style.display ="inline-block";    //Show "Enter your Initials"
    hiScoreEl.style.display = "inline-block";       //Show freetext field for initials
    hiScoreBtn.style.display = "inline-block";      //Show "submit" button      
    console.log ("    Show - High score fields and button");
}

//----------------------------------------------//
// Listen for Submit Initial and Hiscore Button //
//----------------------------------------------//

hiScoreBtn.addEventListener('click', (event) => {
    console.log("")
    console.log("> hiScoreBtn clicked") 
    event.preventDefault();                                         //Prevent refresh with submit button is clicked
//If "initials" field is blank - turn field yellow for 1 second//
    if (hiScoreEl.value === "") {
        console.log("    Error: Initial field blank")        
        var blankInitSeconds = 1;
            hiScoreEl.style.background = "yellow";                  //turn field yellow
            var initialTimer = setInterval (function() {            //1 second timer
                blankInitSeconds--;                    
                if (blankInitSeconds === 0) {
                    hiScoreEl.style.background = "rgb(51, 57, 63)"; //turn field colour back
                    clearInterval(initialTimer);
                }
            }, 1000);
        return;
    }
    var initials = hiScoreEl.value.trim();  //store field value into "initials"
    hiScoreEl.value = "";                   //clear iniitals field    
    hiScoreCurrent = {                      //store score and initials in one object
        initials: initials,
        score: score     
        }
    console.log("    Initials captured: " + hiScoreCurrent.initials);   //initials in object
    console.log("    Score captured: " + hiScoreCurrent.score);         //score in object
    hiScoreArray.push(hiScoreCurrent);                                  //push hiScoreCurrent object into hiScoreArray object         
    console.log("    Object pushed into Array");    
    submitStorage();                                                    //submit hiscoreArray for local storage
    viewHighScore();                                                    //Launch viewHighScore() //denies user the opportunity to enter multiple entries
});

//-------------------------------------------------------------------------------//
// Submit hiScoreArray object array for local storage under key "QuizScoreArray" //
//-------------------------------------------------------------------------------//
function submitStorage() {
    console.log("")
    console.log("> submitStorage() Called") 
    localStorage.setItem("QuizScoreArray", JSON.stringify(hiScoreArray));
    console.log("    Object array stored in local storage");
    console.log("    hiScoreArray.length: " + hiScoreArray.length)
    return;
};

//---------------------------------------------------------------------------------//
// Retrieve hiScoreArray object array for local storage under key "QuizScoreArray" //
//---------------------------------------------------------------------------------//

function retrieveStorage() {
    console.log("")
    console.log("> retrieveStorage() Called") 
//Retrieve Array from local storage if doesn't exist then set as blank array
    hiScoreArray = JSON.parse(localStorage.getItem("QuizScoreArray")) ?? []; 
    console.log("    hiScoreArray.length: " + hiScoreArray.length)
    return;
};

//-----------------------------------------//
//-- Display High Scores for user to see --//
//-----------------------------------------//

function viewHighScore() {
    console.log("")
    console.log("> viewHighScore() Called") 
    hiscoreulEl.innerHTML = ""                               //clear Unordered list
    console.log(hiScoreArray)
    console.log("    hiScoreArray.length: " + hiScoreArray.length)    
    cardHeadingEl.textContent = "High scores - Hall of Fame" //change title to High Score
    console.log("    Update - Banner to 'High Score!'")
    startBtnEl.style.display = "none";                          //Hide the start button
    console.log ("    Hide - Start Quiz Button");
    blurbEl.style.display = "none";                          //Hide blurb 
    console.log("    Hide - Blurb");
    hiScoreFormEl.style.display ="none";                     //Hide "Enter your Initials"
    hiScoreEl.style.display = "none";                        //Hide freetext field for initials
    hiScoreBtn.style.display = "none";                       //Hide "submit" button      
    console.log("    Hide - High score fields and button");
    
    for (var i = 0; i < hiScoreArray.length; i++) {
        var li = document.createElement ("li")               //loop through and create new element "li" for each object array
        li.className = "li";
        li.textContent = "Initials: " + hiScoreArray[i].initials + ", Score: " + hiScoreArray[i].score;     //set textContent of initial and score for new li element
       //li.setAttribute("data-index", i);                   //setAttribute "data-index" to the variable number (i) - Don't think I need this line
        hiscoreulEl.appendChild(li);                         //append new li element to unordered list
    }
    
    clearHiScoreBtnEl.style.display = "inline";             //Show the clear high score button
    console.log ("    Show - Clear High score button");
    reloadBtnEl.style.display = "inline";                   //Show the Reload Button 
    console.log ("    Show - Reload button");
    return;  
};


/*

blurbEl.style.display = "none";                             //Hide the blurb
console.log ("    Hide - Blurb");

*/

//---------------------------------------------------------------------//
//Listener to clear high scores when user clicks on "clearHiScoreBtnEl"//
//---------------------------------------------------------------------//
clearHiScoreBtnEl.addEventListener("click", () => {    
    console.log("    clearHiScoreBtnEl clicked");   
    hiScoreArray = [];   // Clear the array    
    submitStorage();     // Submit the empty array to local storage
    retrieveStorage();   // Retrieve the empty array from local storage
    viewHighScore();     // Republish highscores
})

//-------------------------------------------------------------//
//Listener to reload the game when user clicks on "reloadBtnEl"//
//-------------------------------------------------------------//
reloadBtnEl.addEventListener("click", () => {
    console.log("    reloadBtnEl clicked");   
    location.reload();    
})

//-------------------------------------------------------------------------------//
//Listener to show high score when use clicks on View High Scores link in header"//
//-------------------------------------------------------------------------------//
hiScoreLinkEl.addEventListener("click", ()=> {
    console.log("    hiScoreLinkEl clicked");   
     //submitStorage();
    console.log(hiScoreArray)
    console.log("    hiScoreArray.length: " + hiScoreArray.length)    
    retrieveStorage();
    viewHighScore();
});


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
