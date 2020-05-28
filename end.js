
const username = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerHTML = mostRecentScore;

username.addEventListener("keyup", () =>{

    saveScoreButton.disabled = !username.value;


})


function saveHighScore (e){

    e.preventDefault();

    const score = {

        points : mostRecentScore,
        name : username.value,
    };

    highScores.push(score);

    // sorting highScores array in decsending order
   highScores.sort( (a,b) => {
       return b.points - a.points;
   })
    // at index five, start cutting off every thing after that
    highScores.splice(5);

    //save highScores in localStorage

    localStorage.setItem("highScores", JSON.stringify(highScores));

    window.location.assign("/");

    

}
