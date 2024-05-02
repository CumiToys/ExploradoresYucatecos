var startGameButton = document.getElementById('startButton');
startGameButton.addEventListener('click', loadGame);

var currentQuestionIndex = 0;
var quizz = [];

async function loadGame() {
    quizz = await loadDataFromFile('questions.json');
    var questionBox = document.getElementById('questionBox');
    var questionBoxContent = document.getElementById('questionBoxContent');

    hide(startGameButton);
    setActionEvents();
    show(questionBox);
    loadQuestion();
    show(questionBoxContent);
}

async function reloadGame() {
    loadQuestion();
    showPopup();
}

function setActionEvents() {
    var radioInputs = document.querySelectorAll('.answerOption');

    radioInputs.forEach(function(radio) {
        radio.addEventListener('change', function() {
            handleOptionChange(this);
        });
    });
}

function handleOptionChange(radio) {
    checkAnswer(radio);
}

function loadQuestion() {
    var questionBoxContent = document.getElementById('questionBoxContent');

    currentQuestionIndex = generateRandomNumber(quizz.length);
    fillQuestionContent(questionBoxContent, currentQuestionIndex);
}

function generateRandomNumber(maxValue) {
    // Genera un número aleatorio del 0 al valor máximo(maxValue - 1).
    return Math.floor(Math.random() * maxValue);
}

function resetResultSettings() {
    var questionBox = document.getElementById('questionBox');
    var radioInputs = document.querySelectorAll('.answerOption');

    setBackgroundColor(questionBox, 'white');
    var questionResult = setQuestionResult('', 'white');
    hide(questionResult);
    enableMany(radioInputs);
}

function fillQuestionContent(content, questionIndex) {
    var question = quizz[questionIndex];
    var questionText = content.querySelector('#questionText');
    var options = content.querySelectorAll('.answerOption');

    questionText.textContent = question.text;
    options.forEach((option, index) => {
        option.checked = false;
        var questionOption = question.options[index];
        option.value = questionOption.value;
        option.nextSibling.nodeValue = questionOption.text; // Modifica el label text sin sobreescribir el radio input anidado.
    });
}

function checkAnswer(selectedOption) {
    var question = quizz[currentQuestionIndex];
    var questionResult;

    lockAnswer();

    if(selectedOption.value == question.rightAnswer){
        setBackgroundColor(selectedOption.parentNode, '#0EB81B');
        setTextColor(selectedOption.parentNode, 'white');
        //questionResult = setQuestionResult(question.rightAnswerOutput, '#18ba69');
    } else {
        setBackgroundColor(selectedOption.parentNode, '#B80E0E');
        setTextColor(selectedOption.parentNode, 'white');
        //questionResult = setQuestionResult(question.wrongAnswerOutput, '#c42b2b');
    }

    //show(questionResult);
}

function setQuestionResult(result, color) {
    var questionResult = document.getElementById('questionResult');

    questionResult.innerHTML = result;
    questionResult.style.color = color;
    return questionResult;
}

function setTextColor(element, color) {
    element.style.color = color;
}

function setBackgroundColor(element, color) {
    element.style.backgroundColor = color;
}

function lockAnswer() {
    var radioInputs = document.querySelectorAll('.answerOption');

    disableMany(radioInputs);
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

async function loadDataFromFile(filename) {
    try {
        const data = await fetch(filename);
        if (!data.ok) {
          throw new Error('File Not Found');
        }
        return await data.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}