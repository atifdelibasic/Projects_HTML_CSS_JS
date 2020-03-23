const btnHigher = document.getElementById('higher');
const btnLower = document.getElementById('lower');
const btnYes = document.getElementById('yes');
const btnNewGame = document.getElementById("NewGame");
var txt = document.getElementById('txt');
var count = document.getElementById('count');
var brojac, l, r, mid;
var arr = [];

function FillArray() {
    for(var i = 0; i <= 1000; i++){
        arr.push(i);
    }
}
function Check(num) {
    
    if(num == 1){
        l = mid + 1;
    }
    else if(num == 2){
        r = mid - 1;
    }
    mid = Math.floor( l + (r - l) / 2);
    if((r-l) == 1){
        btnLower.hidden = true;
    }
    if(num == 0 || ++brojac == 10) {
        txt.innerText = `Your number is ${arr[mid]}.`;
        count.innerText = `Count: ${brojac}`;
        DisableEnable(true);
    }
    else{
        GuessText();
    }
}
function DisableEnable(enable) {
        btnLower.hidden = btnHigher.hidden = btnYes.hidden = enable;
        btnNewGame.hidden = !enable;
}
window.onload = () => {
    FillArray();
    DisableEnable(true);
}
function NewGame() {
    brojac = 0 ;
    l = 0;
    r = 1000;
    mid = 500;
    DisableEnable(false);
    Check();
}
function GuessText(){
    txt.innerHTML = `Is your number ${arr[mid]} ?`;;
    count.innerHTML = `Count: ${brojac}`;
}