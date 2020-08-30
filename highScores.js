const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Display highscores 
for( score of highScores){

    scoreListEl = document.createElement("li");

    const {name, points} = score;

    scoreListEl.innerHTML = `${name} - ${points}`;

    highScoresList.appendChild(scoreListEl);
}