const Item = "Tasks";
const taskWrap = document.getElementById('new');
const btnScroll = document.getElementById('btnScroll');
const btnCreate = document.querySelector('.btn-primary');

// list of todos
let LIST = [];

window.addEventListener('load', () => {
    getLocalStorage(Item);
});

window.addEventListener('scroll', () => {
    ScrollFunction();
});

window.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        DodajTask();
    }
});

btnCreate.addEventListener('click', () => {
    DodajTask();
});

taskWrap.addEventListener('click', delOrMark);

function delOrMark(e) {
    let target = e.target;
    let todo = target.parentElement;

    if(target.className.includes('fa fa-trash')) {
        taskWrap.removeChild(todo);
        LIST.splice(todo.id, 1);
    }
    else if(target.type === 'checkbox') {
        let checkbox = e.target;
        let text = checkbox.nextElementSibling;
        if(checkbox.checked) {
            LIST[todo.id].completed = true;
            text.style.textDecoration = "line-through";
        }
        else {
            LIST[todo.id].completed = false;
            text.style.textDecoration = "none";
        }
    }

    UkloniSve();
    setLocalStorage(Item, LIST);
    getLocalStorage(Item);
}

function ClearStorage(){
    localStorage.clear();
    LIST = [];
    UkloniSve();
}

function createTodo(todo){
    // create todo
    let title = document.createElement('p');
    title.textContent = todo.title;
    document.getElementById('unos').value = '';

    let itemBox = document.createElement('div');
    itemBox.className = 'task';
    itemBox.id = todo.id;

    let inputCheck = document.createElement('input');
    inputCheck.type ='checkbox';

    let trash = document.createElement('i');
    trash.className = 'fa fa-trash';
   
    if(todo.completed) {
       title.style.textDecoration = "line-through";
       inputCheck.checked = true;
    }

    itemBox.appendChild(inputCheck);
    itemBox.appendChild(title);
    itemBox.appendChild(trash);
    taskWrap.appendChild(itemBox);
}


function UkloniSve(){
    while(taskWrap.hasChildNodes()){
        taskWrap.removeChild(taskWrap.childNodes[0]);
    }
}

function DodajTask(){
    let inputValue = document.getElementById('unos').value.trim();
    if(inputValue) {
        const newTodo = {
            id: LIST.length,
            title: inputValue,
            completed: false
        };
        LIST.push(newTodo);

        createTodo(newTodo);
        setLocalStorage(Item, LIST);
    }
} 

function setLocalStorage(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(item){
    let data = localStorage.getItem(item);
    data ? LIST = JSON.parse(data): [];
    loadTodos();
}

function loadTodos(){
    LIST.map((todo, id) => {
        todo.id = id;
        createTodo(todo);
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
