// handle modal

const modalBtn = document.getElementById("modal-btn");
const rulesBtn = document.getElementById("rules-btn");
const modal = document.getElementById("modal");

const closeModal = () => {
    modal.classList.remove("modal-active");
    container.classList.remove("container-active");
}

const openModal = () => {
    modal.classList.add("modal-active");
    container.classList.add("container-active");
}

modalBtn.addEventListener("click", closeModal);
rulesBtn.addEventListener("click", openModal);


// game code


// fetch dom elements
const container = document.getElementsByClassName("container")[0];
const gameWrapper = document.getElementsByClassName("game-wrapper")[0];
const resultsWrapper = document.getElementsByClassName("results-wrapper")[0];
const userImg = document.getElementById("user-image");
const houseImg = document.getElementById("house-image");
const resultInfo = document.getElementById("result__info");
const scoreInfo = document.getElementById("scoreboard__points");
const playAgainBtn = document.getElementById("result__btn");
const result = document.getElementById("result");

// handle play again button

const playAgain = () => {
    gameWrapper.classList.add("game-wrapper-active");
    resultsWrapper.classList.remove("results-wrapper-active");
    result.classList.remove("result-active")
    resultsWrapper.style.display = "none";
    // gameWrapper.style.display = "flex";
    document.getElementById("user-choice").classList.remove("results-wrapper__choice-active");
    document.getElementById("house-choice").classList.remove("results-wrapper__choice-active");
}


playAgainBtn.addEventListener("click", playAgain);

// make sure that results are not visible
resultsWrapper.style.display = "none";



let userChoice, houseChoice, userChoiceNumber, houseChoiceNumber, resultInfoContent;

// Get score from LocalStorage or change it to 0

let score = localStorage.getItem('score') || 0;
window.addEventListener('load', () => {
    localStorage.setItem('score', score);
    scoreInfo.innerHTML = score;
});

// possible icons

const choices = [
    {name:"rock", image:"images/icon-rock.svg", borderColor:"hsl(349, 71%, 52%)"},
    {name:"paper", image:"images/icon-paper.svg", borderColor:"hsl(230, 89%, 62%)"},
    {name:"scissors", image:"images/icon-scissors.svg", borderColor:"hsl(39, 89%, 49%)"},
    {name:"lizard", image:"images/icon-lizard.svg", borderColor:"hsl(261, 73%, 60%)"},
    {name:"spock", image:"images/icon-spock.svg", borderColor:"hsl(189, 59%, 53%)"},
];

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const lizard = document.getElementById("lizard");
const spock = document.getElementById("spock");


// trigger when user chooses an icon

rock.addEventListener("click", () => {
    userChoiceNumber = 0;
    generateHouseChoice();
});

paper.addEventListener("click", () => {
    userChoiceNumber = 1;
    generateHouseChoice();
});

scissors.addEventListener("click", () => {
    userChoiceNumber = 2;
    generateHouseChoice();
});

lizard.addEventListener("click", () => {
    userChoiceNumber = 3;
    generateHouseChoice();
});

spock.addEventListener("click", () => {
    userChoiceNumber = 4;
    generateHouseChoice();
});

const generateHouseChoice = () => {
    houseChoiceNumber = Math.floor(Math.random() * 5);
    houseChoice = choices[houseChoiceNumber].name

    // when we already know user and computer choice we can determine who the winner is
    determineTheWinner();
}

const determineTheWinner = () => {
    userChoice = choices[userChoiceNumber].name;
    if (userChoice == houseChoice) resultInfoContent = "Tie";
    else if (
        (userChoice == "scissors"  && houseChoice == "paper") ||
        (userChoice == "paper"  && houseChoice == "rock") ||
        (userChoice == "rock"  && houseChoice == "lizard") ||
        (userChoice == "lizard"  && houseChoice == "spock") ||
        (userChoice == "spock"  && houseChoice == "scissors") ||
        (userChoice == "scissors"  && houseChoice == "lizard") ||
        (userChoice == "paper"  && houseChoice == "spock") ||
        (userChoice == "rock"  && houseChoice == "scissors") ||
        (userChoice == "lizard"  && houseChoice == "paper") ||
        (userChoice == "spock"  && houseChoice == "rock") 
        ) {
        resultInfoContent = "You win";
        score++;
        bouncePoints("green");
    }
    else {
        resultInfoContent = "You lose";
        score--;
        bouncePoints("red");
    }

    // when we know who the winner is we can show results to our user
    showResults();
}

const showResults = () => {

    // make sure we see the results
    resultsWrapper.style.display = window.innerWidth > 700 ? "flex" : "grid";

    // change the scene from game to results
    gameWrapper.classList.remove("game-wrapper-active");
    resultsWrapper.classList.add("results-wrapper-active");


    // create icons and display result
    setTimeout(function () {
        userImg.src = choices[userChoiceNumber].image;
        userImg.parentElement.style.borderColor = choices[userChoiceNumber].borderColor;
        document.getElementById("user-choice").classList.add("results-wrapper__choice-active");
    }, 500);
    setTimeout(function () {
        houseImg.src = choices[houseChoiceNumber].image;
        houseImg.parentElement.style.borderColor = choices[houseChoiceNumber].borderColor;
        document.getElementById("house-choice").classList.add("results-wrapper__choice-active");
    }, 1500);
    setTimeout(function () {
        result.classList.add("result-active")
        resultInfo.innerHTML = resultInfoContent;
        scoreInfo.innerHTML = score;
        localStorage.setItem('score', score);
    }, 2000);
}


const bouncePoints = (color) => {
    setTimeout(function() {
        scoreInfo.classList.add("bounce");
        resultInfo.classList.add("bounce");
        scoreInfo.style.color = color;
        resultInfo.style.color = color;
    }, 2000); 
    setTimeout(function() {
        scoreInfo.style.color = "hsl(229, 25%, 31%)";
        resultInfo.style.color = "white";
        scoreInfo.classList.remove("bounce");
        resultInfo.classList.remove("bounce");
    }, 3250); 
}

// fix errors with resizing
window.addEventListener('resize', () => {
    resultsWrapper.style.display = window.innerWidth > 700 ? "flex" : "grid";

    // make sure that we display only one container
    if (gameWrapper.classList.contains("game-wrapper-active")) {
        resultsWrapper.style.display = "none";
    }
    // else if (resultsWrapper.classList.contains("results-wrapper-active")) {
    //     gameWrapper.style.display = "none";
    // }
})