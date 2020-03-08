const odabir = document.getElementById('imgPlayer');
const odabirComp = document.getElementById('imgComputer');
const resultPlayer = document.getElementById('resPlayer');
const resultComp = document.getElementById('resComp');
const poruka = document.getElementById('poruka');
var round = document.getElementById('round');
var content = document.querySelector('.content');
var info = document.querySelector('.pocetna');
var available = true;
var playerCount = 0, compCount = 0, roundCount = 0, player;

function HideShow(){
    info.style.display = "none";
    content.style.display = "block";
}
function Odabir(index) {
    if(available) {
    available = false;
    player = index;
    odabir.src = UpdateImg(index);
    ComputerTurn();
    }
}
function ComputerTurn() {
    odabirComp.style.animationName = "anim";
    poruka.innerHTML = "Waiting for computer..";
    setTimeout(Game, 3000);
}
function Game() {
    let game = Result();
    available = true;

    if(game == null) {
        Tie();
    }
    else if(game) {
        Win();
    }
    else {
        Lost();
    }
    UpdateRound();
}

function Result() {
    let computer = Computer();
    odabirComp.style.animationName = "none";
    odabirComp.src = UpdateImg(computer);
    if(computer == player){
        return null;
    }
    else if(computer == 1){
        if(player == 2)
            return true;
        return false;
    }
    else if(computer == 2){
        if(player == 3)
            return true;
        return false;
    }
    else if(computer == 3){
        if(player == 1)
            return true;
        return false;
    }
}
function Computer() {
    return Math.floor((Math.random() * 3) + 1);
}
function Win() {
    playerCount++;
    poruka.innerHTML = "You won!";
    resultPlayer.innerHTML = "Win: " + playerCount;
}
function Lost() {
    compCount++;
    poruka.innerHTML = "Computer won!";
    resultComp.innerHTML = "Win: " + compCount;
}
function Tie() {
    poruka.innerHTML = "Tie!";
}
function UpdateRound() {
    roundCount++;
    round.innerHTML = "Round: " + roundCount;
}
function UpdateImg(index) {
    return document.querySelector(".odabir img:nth-child("+(index)+")").src;
}
window.onload = () => {
    content.style.display = "none";
}