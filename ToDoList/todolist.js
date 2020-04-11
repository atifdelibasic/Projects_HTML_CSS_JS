
const Item = "Tasks";
const taskWrap = document.getElementById('new');
const btnScroll = document.getElementById('btnScroll');
let LIST = [];

window.addEventListener('load', () => {
    getLocalStorage(Item);
})

window.addEventListener('keydown', (e) => {
    if(e.key == "Enter"){
        DodajTask();
    }
})

window.addEventListener('scroll', () => {
    ScrollFunction();
})

taskWrap.addEventListener('click', delOrMark);
// delete or add line-through(checked)
function delOrMark(e) {
    let parent = e.target.parentElement;
    if(e.target.className.includes('fa fa-trash')){
        taskWrap.removeChild(parent);
        LIST.splice(parent.id,1);
        UkloniSve();
        setLocalStorage(Item, LIST);
        getLocalStorage(Item);
    }
    else if(e.target.type == 'checkbox'){
        let checkbox = e.target;
        let text = checkbox.nextElementSibling;
        if(checkbox.checked){
            console.log('cekirano');
            LIST[parent.id].zavrseno = true;
            text.style.textDecoration = "line-through";
        }
        else{
            console.log('uncekirano');
            LIST[parent.id].zavrseno = false;
            text.style.textDecoration = "none";
        }
        setLocalStorage(Item, LIST);
    }
}

function ClearStorage(){
    localStorage.clear();
    LIST = [];
    UkloniSve();
}

function KreirajTask(task){
    // create task
    let tekst = document.createElement('p');
    tekst.textContent = task.tekst;
    document.getElementById('unos').value = '';

    let itemBox = document.createElement('div');
    itemBox.className = 'task';
    itemBox.id = task.id;

    let inputCheck = document.createElement('input');
    inputCheck.type ='checkbox';

    let trash = document.createElement('i');
    trash.className = 'fa fa-trash';
   
    if(task.zavrseno){
       SetLineThrough(inputCheck, tekst);
    }

    itemBox.appendChild(inputCheck);
    itemBox.appendChild(tekst);
    itemBox.appendChild(trash);
    taskWrap.appendChild(itemBox);
}

function SetLineThrough(inputCheck, text){
    text.style.textDecoration = "line-through";
    inputCheck.checked = true;
}

function UkloniSve(){
    while(taskWrap.hasChildNodes()){
        taskWrap.removeChild(taskWrap.childNodes[0]);
    }
}

function DodajTask(){
    let inputValue = document.getElementById('unos').value.trim();
    if(inputValue!=''){
        // KreirajTask(inputValue, false, LIST.length);
            LIST.push({
                tekst:inputValue,
                zavrseno:false,
                id:LIST.length
            });
            KreirajTask(LIST[LIST.length-1]);
        setLocalStorage(Item, LIST);
    }
} 

function setLocalStorage(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(item){
    var data = localStorage.getItem(item);
    if(data){
        LIST = JSON.parse(data);
        UcitajTaskove();
    }
}

function UcitajTaskove(){
    LIST.forEach((task, index) => {
        task.id = index;
        KreirajTask(task);
    });
}

function ScrollFunction(){
    if(document.documentElement.scrollTop > 20){
        btnScroll.style.display = "block";
    }
    else{
        btnScroll.style.display = "none";
    }
}
