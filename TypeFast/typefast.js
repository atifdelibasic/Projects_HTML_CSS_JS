let gameStarted = false;
let words = [];
let score = 0;
let interval;
let timer;

let levels = {
    easy:7,
    medium: 5,
    hard:3
};
//choose level
const level = levels.medium;

//DOM elements
let input = document.querySelector("#word-input");
let time = document.querySelector('#time');
let scoreDOM = document.querySelector('#score');
let currentWordDOM = document.querySelector('#current-word');
let seconds = document.querySelector('#seconds');
let answer = document.querySelector('#answer');
let btnReset = document.querySelector('#reset');
let bestScore = document.querySelector('#bestScore');
//events
input.addEventListener('input', CheckAnswer);
document.addEventListener('DOMContentLoaded', LoadAPI);
btnReset.addEventListener('click', resetScore);

currentWordDOM.addEventListener('click', () => {
    input.focus();
    Initialize();
    StartGame();
});

function LoadAPI() {
    bestScore.innerHTML = getLocalStorage();
    //display seconds
    seconds.innerHTML = level;
    //load API
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    fetch(`${proxy}https://api.datamuse.com/words?ml=ringing+in+the+ears`)
    .then((res) => res.json())
    .then(data => {
        words = data;
        console.log(data);
    });
}

//set to default 
function Initialize() {
    score = 0;
    timer = level;
    clearInterval(interval);
    gameStarted = false;
    scoreDOM.innerHTML = 0;
    input.style.border = "none";
    answer.innerHTML = '. . .';
    answer.style.color = "white";
}

function Timer(){
    if(timer <= 0){
        GameOver();
        SetBestScore();
    }
    time.innerHTML = timer--;
}

function GameOver(){
    gameStarted = false;
    clearInterval(interval);

    input.style.border = "none";
    answer.style.color = "red";

    currentWordDOM.innerHTML = 'Play again';
    answer.innerHTML = 'Game over!';
}

function StartGame(){
    NewWord();
    if(!gameStarted) {
        gameStarted = true;
        interval = setInterval(Timer, 1000);
    }
}

function NewWord(){
    timer = level;
    let currentWord = words[Math.floor(Math.random() * (words.length-1))];
    currentWordDOM.innerHTML = currentWord.word;
}

function CheckAnswer(){
    if(CheckWord()){
        NewWord();
        input.value = '';
        scoreDOM.innerHTML = ++score;
    }
}

function CheckWord(){
    if(gameStarted){
        if(input.value.toLowerCase() === currentWordDOM.innerHTML){
            answer.innerHTML = 'Correct!';
            answer.style.color = "lightgreen";
            input.style.border = "3px solid lightgreen";
            return true;
        }
        answer.innerHTML = '. . .';
        input.style.border = "2px solid red";
    }
    return false;
}

function getLocalStorage() {
    return localStorage.getItem('score');
}

function setLocalStorage(item, value = 0) {
    localStorage.setItem(item, value);
    bestScore.innerHTML = getLocalStorage();
}

function SetBestScore(){
    let ls = getLocalStorage();
    if(!ls || score > ls){
        setLocalStorage('score', score);
    }
}

function resetScore(){
    if(confirm("Are you sure?")){
        setLocalStorage('score');
    }
}