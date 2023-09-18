var startBtnEl = document.querySelector("#startBtn");               //variable targetting Start Quiz button
var cardHeadingEl = document.querySelector("#questions") //Heading + questions 
var answerAEl = document.querySelector("#answerA") //Answer A
var answerBEl = document.querySelector("#answerB") //Answer B
var answerCEl = document.querySelector("#answerC") //Answer C
var answerDEl = document.querySelector("#answerD") //Answer D
console.log ("test only")
var i = 0 //Variable to determine which question number to show

//Store all the questions here//
var quizQuestions = [
    {
        question: "Question1 - Why is the sky blue?", 
        answerA: "A: Because it has been painted blue",
        answerB: "B: It is a reflection of the sea",
        answerC: "C: Because Red would've been too angry a colour",
        answerD: "D: Why are *you* blue?",
        correct: "a1",
    },
    
    { 
        question: "Question 2",
        answerA: "Yes2",
        answerB: "No2",
        answerC: "Maybe2",
        answerD: "Other2,",
        correct: "b2"
    },

    { 
        question: "Question 3",
        answerA: "Yes3",
        answerB: "No3",
        answerC: "Maybe3",
        answerD: "Other3,",
        correct: "b3"
    }

]
console.log("Quiz Questions" + quizQuestions);
console.log(quizQuestions[0]) //Show 
console.log(quizQuestions[1])
console.log(quizQuestions.length)

function startQuiz () {

//Call timer function - 75 seconds
//Hide "start quiz button"
//change formatting of answer etc (padding, hide/show etc)
//left align etc
//Present question in sequence (counter that triggers on submission)


//Need a counter/check to see if we've reached the end (also need to check timer)
console.log ("Start Button Clicked");
console.log (quizQuestions[0])
cardHeadingEl.textContent = quizQuestions[i].question;  //Set question
answerAEl.textContent = quizQuestions[i].answerA;   //Set answer A
answerBEl.textContent = quizQuestions[i].answerB;   //Set answer B
answerCEl.textContent = quizQuestions[i].answerC;   //Set answer C
answerDEl.textContent = quizQuestions[i].answerD;   //Set answer D

answerAEl.addEventListener("Click", userAnswer = 'a')


return;
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




startBtnEl.addEventListener("click", startQuiz);