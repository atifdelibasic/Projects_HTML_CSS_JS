let qa_list = [];
let correctCount = 0, counter = -1;
let correctI;
let enableAnswer;
let cilckedEl;
let val=0; 

//DOM elements
let answer_section = document.querySelectorAll('.answer-section');
let question_section = document.querySelector('.question-section');
let answer_div = document.querySelectorAll('.answer');
let btnNext = document.querySelector('.btn-next');
let submit = document.querySelector('.btn-submit');
let warning = document.querySelector('.warning');
let btnStart = document.querySelector('.btnStart');
let qaSection = document.querySelector('.qa-section');
let startSection = document.querySelector('.start-game-section');

window.addEventListener('load', () => {
    loadCategories();
    AddClickEvents();
});

function loadCategories(){
    var category = document.querySelector('#category')
    let api = `https://opentdb.com/api_category.php`;
    LoadAPI(api)
    .then(result => {
        result.trivia_categories.forEach(el => {
            let option = document.createElement('option');
            option.value = el.id;
            option.textContent = el.name;
            category.appendChild(option);
        })
    })
    .catch(err => console.log('error'))
}

function AddClickEvents() {
    answer_section.forEach(item => {
        item.addEventListener('click', AnswerClick);            
    })
}

btnStart.addEventListener('click', ValidateForm);

function ValidateForm(e) {
    e.preventDefault();
    let amount = document.querySelector('#amount');
    let min = parseInt(amount.min), 
    max = parseInt(amount.max);
    val = parseInt(amount.value);
    let message = `Pick a number beetwen ${min} and ${max}`;
    if(val < min || val > max) {
       alert(message);
    }
    else {
        Game.startGame();
    }
}

function createApi() {
    let apiTrivia = `https://opentdb.com/api.php?`;
    let select = document.querySelectorAll('select');
    let amount = document.querySelector('#amount');
    let string='';
    string += `amount=${amount.value}`;
    select.forEach(el => {
        if(!el.value.includes('any')) {
            string += `&${el.id}=${el.value}`;
        }
    })
    apiTrivia += string;
    return apiTrivia;
}

 function LoadAPI(api) {
    var proxy = `http://cors-anywhere.herokuapp.com/`;
    var url = `${proxy}${api}`;
    return fetch(url)
    .then(res => res.json())
    .then(data => (data))
}

submit.addEventListener('click', () => {
    if(enableAnswer) { 
        if(typeof(clickedEl) !== 'undefined') {
            Game.CheckAnswer(clickedEl);
            enableAnswer = false;
            btnNext.style.visibility = "visible";
        }
        else {
            warning.style.visibility = "visible";
            setTimeout(() => {
                warning.style.visibility = "hidden";
            }, 3000);
        }
    }
})

btnNext.addEventListener('click', () => {
        btnNext.style.visibility = "hidden";
        UI.resetBackCol();
        Game.LoadNextQuestion();
        clickedEl = undefined;
});

function AnswerClick (e) {
    if(enableAnswer) {
        UI.resetBackCol();
        clickedEl = e.target;
        clickedEl.style.background = "rgb(95, 121, 160)";
        clickedEl.style.color = "#fff";
    }
}

// User interface class
class UI {
    static resetBackCol() {
        answer_section.forEach(el => {
            el.style.background = "#fff";
            el.style.color = "#000";
        })
    }
    static LoadQuestionUI() {
        question_section.innerHTML = qa_list[counter].question;
    }

    static LoadAnswersUI() {
        if(qa_list[counter].type === "boolean") {
            this.EnableDisable('none');
        }
        else {
            this.EnableDisable('flex');
        }
        this.MultipleChoice();
    }

    static MultipleChoice() {
        //add all answers 
        let answers = qa_list[counter].incorrect_answers.slice();
        answers.push(qa_list[counter].correct_answer);
        //sort randomly 
        answers.sort((a,b) => 0.5 - Math.random());
        //add answers
        answers.forEach((element,index) => {
            answer_section[index].innerHTML = element;
          
            if(qa_list[counter].correct_answer == element) {
                correctI = index;
            }
        });
    }

    static EnableDisable(prop) {
        answer_div[2].style.display = prop;
        answer_div[3].style.display = prop;
    }
}

class Game {
    static startGame() {
        let apiTrivia = createApi();
        
        LoadAPI(apiTrivia)
        .then(data => {
            // initialize list
            qa_list = data.results;
            if(qa_list.length == val) {
                Game.LoadNextQuestion();
                // hide settings page  
                startSection.style.display = "none";
                qaSection.style.display ="flex";
            }
            else {
                alert('Not enough questions to start the quiz, try with different setup. Blame the API :)');
            }
        });
    }

    static CheckAnswer(item) {
        if(qa_list[counter].correct_answer != item.textContent) {
            item.style.background = "red";
        }
        else {
            correctCount++;
        }
        answer_section[correctI].style.background ="lightgreen";
    }

    static LoadNextQuestion() {
        enableAnswer = true;
        counter++;
        if(counter < qa_list.length) {
            UI.LoadQuestionUI();
            UI.LoadAnswersUI();
        }
        else {
            this.GameOver();
            this.ResetGame();
        }
    }

    static ResetGame() {
        counter = 0;
        correctCount = 0;
        qa_list = [];
    }

    static GameOver() {
        let menu = document.querySelector('.guessed');
        qaSection.style.display ="none";
        menu.style.display = "flex";
        menu.firstElementChild.innerHTML = 
        `Answered correctly: ${correctCount}/${document.querySelector('#amount').value}`;
        menu.onclick = () => {
            menu.style.display ="none";
            startSection.style.display="flex";
        }
    }
}
