
const Item= "Objekat";
const taskWrap=document.getElementById('new');
const btnScroll=document.getElementById('btnScroll');
var LIST=[];

function ClearStorage(){
    LIST=[];
    localStorage.clear();
    UkloniSve();
}
function KreirajTask(text, line=false, id){
    var tekst= document.createElement('p');
    tekst.innerHTML=text;

    let itemBox= document.createElement('div');
    itemBox.className='task';

    let inputCheck=document.createElement('input');
    inputCheck.type='checkbox';

    let trash=document.createElement('i');
    trash.className='fa fa-trash';
   
    if(line){
       SetLineThrough(inputCheck, tekst);
    }
    itemBox.id=id;
    //adding events 
    trash.addEventListener('click', function(){
        LIST.splice(itemBox.id,1);
        setLocalStorage(Item, LIST);
        UkloniSve();
        getLocalStorage(Item);
    });

    inputCheck.addEventListener('click', function(){
        if(this.checked){
            tekst.style.textDecoration= "line-through";
            
            LIST[itemBox.id]={
                tekst:tekst.innerHTML,
                line:true
            }
        }
        else{
            LIST[itemBox.id]={
                tekst:tekst.innerHTML,
                line:false
            }
            tekst.style.textDecoration="none";
        }
        setLocalStorage(Item, LIST);
    });

    itemBox.appendChild(inputCheck);
    itemBox.appendChild(tekst);
    itemBox.appendChild(trash);
    taskWrap.appendChild(itemBox);

    document.getElementById('unos').value="";
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
                line:false
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
        KreirajTask(LIST[i].tekst, LIST[i].line,i);
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
window.onscroll= () =>{ScrollFunction();}

function ScrollFunction(){
    if(document.documentElement.scrollTop>20){
        btnScroll.style.display="block";
    }
    else{
        btnScroll.style.display="none";
    }
}

function goToTop(){
  document.documentElement.scrollTop = 0; 

}