// handle modal

const modalBtn = document.getElementById("modal-btn");
const rulesBtn = document.getElementById("rules-btn");
const modal = document.getElementById("modal");
const container = document.getElementsByClassName("container")[0];
const gameWrapper = document.getElementsByClassName("game-wrapper")[0];
const resultsWrapper = document.getElementsByClassName("results-wrapper")[0];
const userImg = document.getElementById("user-image");
const houseImg = document.getElementById("house-image");
const resultInfo = document.getElementById("result__info");

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

let userChoice, houseChoice, userChoiceNumber, houseChoiceNumber, resultInfoContent;

const choices = [
    {name:"rock", image:"images/icon-rock.svg", borderColor:"rgb(221, 60, 91)"},
    {name:"paper", image:"images/icon-paper.svg", borderColor:"rgb(80, 108, 244)"},
    {name:"scissors", image:"images/icon-scissors.svg", borderColor:"rgb(236, 159, 17)"},
];

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

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


const generateHouseChoice = () => {
    houseChoiceNumber = Math.floor(Math.random() * 3);
    houseChoice = choices[houseChoiceNumber].name
    determineTheWinner();
}

const determineTheWinner = () => {
    userChoice = choices[userChoiceNumber].name;
    console.log("Choice is " + userChoiceNumber);
    console.log("house choice is " + houseChoice);
    console.log("User choice is " + userChoice);
    if (userChoice == houseChoice) resultInfoContent = ("Tie");
    else if (userChoice == "rock"  && houseChoice == "paper") resultInfoContent = ("Paper beats rock. House wins.");
    else if (userChoice == "rock"  && houseChoice == "scissors") resultInfoContent = ("Rock beats scissors. User wins.");
    else if (userChoice == "paper"  && houseChoice == "rock") resultInfoContent = ("Paper beats rock. User wins.");
    else if (userChoice == "paper"  && houseChoice == "scissors") resultInfoContent = ("Scissors beats paper. House wins.");
    else if (userChoice == "scissors"  && houseChoice == "paper") resultInfoContent = ("Scissors beats paper. User wins.");
    else if (userChoice == "scissors"  && houseChoice == "rock") resultInfoContent = ("Rock beats scissors. House wins.");
    showResults();
}

const showResults = () => {
    gameWrapper.style.display = "none";
    resultsWrapper.style.display = "flex";
    userImg.src = choices[userChoiceNumber].image;
    userImg.parentElement.style.borderColor = choices[userChoiceNumber].borderColor;
    houseImg.src = choices[houseChoiceNumber].image;
    houseImg.parentElement.style.borderColor = choices[houseChoiceNumber].borderColor;
    resultInfo.innerHTML = resultInfoContent;
}