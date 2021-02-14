// handle modal

const modalBtn = document.getElementById("modal-btn");
const rulesBtn = document.getElementById("rules-btn");
const modal = document.getElementById("modal");
const container = document.getElementsByClassName("container")[0];
const gameWrapper = document.getElementsByClassName("game-wrapper")[0];
const resultsWrapper = document.getElementsByClassName("results-wrapper")[0];

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

let userChoice, computerChoice;
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

rock.addEventListener("click", () => {
    userChoice = "rock";
    generateComputerChoice();
    determineTheWinner();
    changeScene();
});

paper.addEventListener("click", () => {
    userChoice = "paper";
    generateComputerChoice();
    determineTheWinner();
    changeScene();
});

scissors.addEventListener("click", () => {
    userChoice = "scissors";
    generateComputerChoice();
    determineTheWinner();
    changeScene();
});



const generateComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch(randomNumber) {
        case 1:
            computerChoice = "rock";
            break;
        case 2:
            computerChoice = "paper";
            break;
        case 3:
            computerChoice = "scissors";
            break;
        default:
            console.log("Error");
    }
    console.log("Computer choice is " + computerChoice);
}

const determineTheWinner = () => {
    if (userChoice == computerChoice) console.log("Tie");
    else if (userChoice == "rock"  && computerChoice == "paper") console.log("Paper beats rock. Computer wins.");
    else if (userChoice == "rock"  && computerChoice == "scissors") console.log("Rock beats scissors. User wins.");
    else if (userChoice == "paper"  && computerChoice == "rock") console.log("Paper beats rock. User wins.");
    else if (userChoice == "paper"  && computerChoice == "scissors") console.log("Scissors beats paper. Computer wins.");
    else if (userChoice == "scissors"  && computerChoice == "paper") console.log("Scissors beats paper. User wins.");
    else if (userChoice == "scissors"  && computerChoice == "rock") console.log("Rock beats scissors. Computer wins.");
}

const changeScene = () => {
    gameWrapper.style.display = "none";
    resultsWrapper.style.display = "flex";
}