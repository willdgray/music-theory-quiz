//selcting all required elements
const start_btn = document.querySelector('.start-btn button');
const instructions_box = document.querySelector('.instructions-box');
const exit_btn = instructions_box.querySelector('.buttons .quit');
const continue_btn = instructions_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz-box');
const result_box = document.querySelector('.result-box');
const option_list = document.querySelector('.option-list');
const time_line = document.querySelector('header .time-line');
const timeText = document.querySelector('.timer .time-text');
const timCount = document.querySelector('.timer .timer-sec');

//if startQuiz button clicked
start_btn.onclick = () => {
    instructions_box.classList.add("activeInfo"); //show info box    
}

exit_btn.onclick = () => {
    instructions_box.classList.remove("activeInfo"); //hide info box
}

//if continueQuiz button clicked
continue_btn.onclick = () => {
    instructions_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let timeValue = 15;
let que_count = 0;
let que_numb = 10;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remore("activeResult");
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine)
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

quit_quiz.onclick = ()=> {
    window.location.reload();
}

const next_btn = document.querySelector("footer .next-button");
const bottom_ques_counter = document.querySelector("footer .total-score");

next_btn.onclick = ()=> {
    if (que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine)
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuestions(index){
    const que_text = document.querySelector(".question-text");

    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"<span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"<span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"<span>' + questions[index].options[3] + '</span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}   

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"<i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if(userAns == correcAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.inserAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers =" + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.inserAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");
    }

    for(i=0; i < allOptions; i++) {
        if(option_list.children[i].textContent == correcAns){
            option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            console.log("Auto selected correct answer.");
        }
    }

    for(i=0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.classList.add("show");   
}

function showResult() {
    instructions_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".quiz-score");
    if(userScore > 7) {
        let scoreTag = '<span> and congrats!, You got <p>' + userScore + '</p> out of <p>' + question.length
        scoreText.innerHTML = scoreTag;
    } else if(userScore < 6) {
        let scoreTag = '<span>and nice yout got <p>' + userScore + '</p> out of <p>' + question.length
    } else {
        let scoreTag = '<span> and sorry you got only <p>' + userScore + '</p> out of <p>' + question.length
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
        for(i=0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcontag);
                console.log("Time Off: Auto select correct answer.")
            }
        }
        for(i=0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
        }
        next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time +=1;
        time_line.style.width = time + "px";
        if(time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    let totalQueCountTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCountTag;
}



