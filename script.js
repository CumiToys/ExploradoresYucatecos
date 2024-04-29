var loadGameButton = document.getElementById('startButton');
loadGameButton.addEventListener('click', loadGame);

const SESSION_KEY = 'quizzData';
var questionAnswered = false;
var currentQuestionIndex = 0;

async function loadGame() {
    if(!sessionHasKey(SESSION_KEY)) {
        saveSessionData(await loadDataFromFile());
    }

    var questionBox = document.getElementById('questionBox');
    var questionBoxContent = document.getElementById('questionBoxContent');

    setActionEvents();
    show(questionBox);
    loadNextQuestion();
    show(questionBoxContent);
}

function setActionEvents() {
    var radioInputs = document.querySelectorAll('.answerOption');
    var nextQuestionButton = document.getElementById('nextQuestionButton');
    var answerButton = document.getElementById('answerButton');

    radioInputs.forEach(function(radio) {
        radio.addEventListener('change', function() {
            handleOptionChange(this);
        });
    });

    nextQuestionButton.addEventListener('click', loadNextQuestion);
    answerButton.addEventListener('click', checkAnswer);
}

function loadNextQuestion() {
    var quizz = getSessionData(SESSION_KEY);
    var questionBoxContent = document.getElementById('questionBoxContent')
    
    if (questionAnswered) {
        resetSettings();
        questionAnswered = false;
    }
    
    if (quizz.length > 0) {
        var randomNumber = generateRandomNumber(quizz.length);
        fillQuestionContent(questionBoxContent, randomNumber);
    } else {
        console.log('game over!');
    }
}

function resetSettings() {
    var questionBox = document.getElementById('questionBox');
    var radioInputs = document.querySelectorAll('.answerOption');
    var answerButton = document.getElementById('answerButton');

    var questionResult = setQuestionResult('', 'white');
    hide(questionResult);
    setBackgroundColor(questionBox, 'white');
    enableMany(radioInputs);
    disable(answerButton);
}

function fillQuestionContent(content, questionNumber) {
    var quizz = getSessionData(SESSION_KEY);
    var portraitBox = document.getElementById('questionNumber');
    var questionText = content.querySelector('#questionText');
    var options = content.querySelectorAll('.answerOption');

    portraitBox.textContent = questionNumber + 1;
    
    questionText.textContent = quizz[questionNumber].text;
    options.forEach((option, index) => {
        var questionOption = quizz[questionNumber].options[index];
        option.checked = false;
        option.value = questionOption.value;
        option.nextSibling.nodeValue = questionOption.text;
    });
}

function checkAnswer() {
    var quizz = getSessionData(SESSION_KEY);
    var questionBox = document.getElementById('questionBox');
    var selectedOption = document.querySelector('input[class="answerOption"]:checked');
    var questionNumber = document.getElementById('questionNumber').textContent;
    var question = quizz[questionNumber - 1];
    var questionResult;

    questionAnswered = true;
    lockAnswer();

    if(selectedOption.value == question.rightAnswer){
        setBackgroundColor(questionBox, '#b0f9de');
        questionResult = setQuestionResult(question.rightAnswerOutput, '#18ba69');
        quizz.splice(questionNumber - 1, 1);
        saveSessionData(quizz);
    } else {
        setBackgroundColor(questionBox, '#f3aaaa');
        questionResult = setQuestionResult(question.wrongAnswerOutput, '#c42b2b');
    }

    show(questionResult);
}

function setQuestionResult(result, color) {
    var questionResult = document.getElementById('questionResult');

    questionResult.textContent = result;
    questionResult.style.color = color;
    return questionResult;
}

function setBackgroundColor(element, color) {
    element.style.backgroundColor = color;
}

function lockAnswer() {
    var radioInputs = document.querySelectorAll('.answerOption');
    var answerButton = document.getElementById('answerButton');

    disableMany(radioInputs);
    disable(answerButton);
}

function generateRandomNumber(maxValue) {
    // Genera un número aleatorio del 0 al valor máximo(maxValue - 1).
    return Math.floor(Math.random() * maxValue);
}

function handleOptionChange(radio) {
    answerButton.disabled = false;
}

function hide(element) {
    element.classList.remove('visible');
    element.classList.add('hidden');
}

function show(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function disable(element) {
    element.disabled = true;
}

function disableMany(elements) {
    elements.forEach(element => {
        disable(element);
    });
}

function enable(element) {
    element.disabled = false;
}

function enableMany(elements) {
    elements.forEach(element => {
        enable(element);
    });
}

async function loadDataFromFile() {
    try {
        const data = await fetch('questions.json');
        if (!data.ok) {
          throw new Error('File Not Found');
        }
        return await data.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

function saveSessionData(data) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function getSessionData(data) {
   return JSON.parse(sessionStorage.getItem(SESSION_KEY));
}

function clearSessionData(data) {
    sessionStorage.clear();
}

function sessionHasKey(key) {
    return sessionStorage.getItem(key) !== null;
}