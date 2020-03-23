
const Item= "Objekat";
const taskWrap = document.getElementById('new');
const btnScroll = document.getElementById('btnScroll');
var LIST = [];

taskWrap.addEventListener('click', delOrMark);
//delete or add line-through(checked)
function delOrMark(e) {
    let child = e.target.parentElement;
    if(e.target.className.includes('fa fa-trash')){
        taskWrap.removeChild(child);
        LIST.splice(child.id,1);
        UkloniSve();
        setLocalStorage(Item, LIST);
        getLocalStorage(Item);
    }
    else if(e.target.type == 'checkbox'){
        let checkbox = e.target;
        if(checkbox.checked){
            LIST[child.id].zavrseno = true;
        }
        else{
            LIST[child.id].zavrseno = false;
        }
        setLocalStorage(Item, LIST);
    }
}

function ClearStorage(){
    localStorage.clear();
    LIST=[];
    UkloniSve();
}

function KreirajTask(text, zavrseno=false, id){
    //create elements
    let tekst = document.createElement('p');
    tekst.textContent=text;
    document.getElementById('unos').value='';

    let itemBox = document.createElement('div');
    itemBox.className ='task';
    itemBox.id = id;

    let inputCheck = document.createElement('input');
    inputCheck.type ='checkbox';

    let trash = document.createElement('i');
    trash.className ='fa fa-trash';
   
    if(zavrseno){
       SetLineThrough(inputCheck, tekst);
    }

    itemBox.appendChild(inputCheck);
    itemBox.appendChild(tekst);
    itemBox.appendChild(trash);
    taskWrap.appendChild(itemBox);

}
function SetLineThrough(inputCheck, text){
    text.style.textDecoration="line-through";
    inputCheck.checked=true;
}
function UkloniSve(){
    while(taskWrap.hasChildNodes()){
        taskWrap.removeChild(taskWrap.childNodes[0]);
    }
}
function DodajTask(){
    var inputValue=document.getElementById('unos').value.trim();
    if(inputValue!=""){
        KreirajTask(inputValue, false, LIST.length);
            LIST.push({
                tekst:inputValue,
                zavrseno:false
            });
        setLocalStorage(Item, LIST);
    }
} 

function setLocalStorage(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(item){
    var data= localStorage.getItem(item);
    if(data){
        LIST=JSON.parse(data);
        UcitajTaskove();
    }
}

function UcitajTaskove(){
    for(var i=0; i<LIST.length; i++){
        KreirajTask(LIST[i].tekst, LIST[i].zavrseno,i);
    }
}

window.onload = () =>{
    getLocalStorage(Item);
}

window.onkeydown = e => {
    if(e.key=="Enter"){
        DodajTask();
    }
}

window.onscroll= () =>{
    ScrollFunction();
}

function ScrollFunction(){
    if(document.documentElement.scrollTop > 20){
        btnScroll.style.display="block";
    }
    else{
        btnScroll.style.display="none";
    }
}
