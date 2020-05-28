/* 
   HTML objects
*/
const questions = document.getElementById("question");
const choices = document.getElementsByClassName("choice-text");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progress-bar-full");
const game = document.getElementById("game");
const loader = document.getElementById("loader");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questionsArray = [];

fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple")
.then(res =>{
    return res.json();
}).then (loadedQuestions => {
    questionsArray = loadedQuestions.results.map( loadedQuestion =>{
        const formattedQuestion = {
            question : loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) +1 ;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice"+(index +1)] = choice;
        });

        return formattedQuestion;
    });
    
  
    startGame();
})

.catch(err =>{

    console.error(err);
})

// CONSTANTS

const correctBonus = 10;
const maxQuestions = 10;

startGame = () => {

    questionCounter = 0;
    score = 0;

     availableQuestion = [...questionsArray];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}

getNewQuestion = () => {

    if(questionCounter === availableQuestion.length){

        localStorage.setItem("mostRecentScore", score);

            // go to the end page

        return window.location.assign("/end.html");

    }

    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + maxQuestions;

    // Update the progress bar

    const widthValue = (questionCounter / maxQuestions ) * 100;

    progressBarFull.style.width = `${widthValue}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    questions.innerText = currentQuestion.question;

 for(let i = 0; i < choices.length; i++){

    const number = choices[i].dataset['number'];

    choices[i].innerText = currentQuestion['choice'+number];
 }

 availableQuestion.splice(questionIndex,1);

 acceptingAnswers = true;

 for(let i = 0; i < choices.length; i++){

    choices[i].addEventListener('click',event => {

        if(!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = event.target;
        
        const selectedAnswer = selectedChoice.dataset['number'];
        

       
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct"){

            incrementScore(correctBonus);
        }


        selectedChoice.parentElement.classList.add(classToApply);

       setTimeout( () => {

        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();

       }, 1000)
    })
 }
    
}

incrementScore = num =>{
    score+= num;
    scoreText.innerText = score;
}

