var startGameButton = document.getElementById('startButton');
startGameButton.addEventListener('click', loadGame);

const SESSION_KEY = 'quizzData';
var questionAnswered = false;
var currentQuestionIndex = 0;
var isGameOver = false;

async function loadGame() {
    setupReloadButton();

    if(!sessionHasKey(SESSION_KEY)) {
        saveSessionData(SESSION_KEY, await loadDataFromFile('questions.json'));
    }

    var questionBox = document.getElementById('questionBox');
    var questionBoxContent = document.getElementById('questionBoxContent');

    setActionEvents();
    show(questionBox);
    loadNextQuestion();
    show(questionBoxContent);
}

async function reloadGame() {
    if (isGameOver) {
        setupNormalGameLayout();
        isGameOver = false;
    }

    saveSessionData(SESSION_KEY, await loadDataFromFile('questions.json'));
    loadNextQuestion();
    showPopup();
}

function gameOver() {
    setupGameOverLayout();
    isGameOver = true;
}

function setupGameOverLayout() {
    var questionBoxContent = document.getElementById('questionBoxContent');
    var gameOverText = document.createElement('h1');
    gameOverText.textContent = '¡Fin del juego!';
    gameOverText.id = 'gameOverText';
    var reloadButton = document.createElement('button');
    reloadButton.className = 'button';
    reloadButton.id = 'reloadButton';
    reloadButton.textContent = 'REINICIAR JUEGO';

    reloadButton.addEventListener('click', reloadGame);

    questionBoxContent.childNodes.forEach(child => {
        if(child.nodeType === 1) {
            hide(child);
        }
    });

    questionBoxContent.appendChild(gameOverText);
    questionBoxContent.appendChild(reloadButton);
}

function setupNormalGameLayout() {
    var questionBoxContent = document.getElementById('questionBoxContent');
    var gameOverText = document.getElementById('gameOverText');
    var reloadButton = document.getElementById('reloadButton');

    questionBoxContent.removeChild(reloadButton);
    questionBoxContent.removeChild(gameOverText);

        questionBoxContent.childNodes.forEach(child => {
        if(child.nodeType === 1) {
            show(child);
        }
    });
}

function setupReloadButton() {
    startGameButton.removeEventListener('click', loadGame);
    startGameButton.addEventListener('click', reloadGame);

    startGameButton.textContent = 'REINICIAR JUEGO';
}

function setActionEvents() {
    var questionBox = document.getElementById('questionBox');
    var radioInputs = document.querySelectorAll('.answerOption');
    var nextQuestionButton = document.getElementById('nextQuestionButton');
    var answerButton = document.getElementById('answerButton');

    questionBox.addEventListener('animationend', function() {
        questionBox.classList.remove('animation');
        questionBox.style.backgroundImage = 'none';
    });

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
    var questionBoxContent = document.getElementById('questionBoxContent');
    var answerButton = document.getElementById('answerButton');
    
    if (questionAnswered) {
        resetResultSettings();
        questionAnswered = false;
    }
    
    if (quizz.length > 0) {
        currentQuestionIndex = generateRandomNumber(quizz.length);
        fillQuestionContent(questionBoxContent, currentQuestionIndex);
        disable(answerButton);
    } else {
        gameOver();
    }
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
    var quizz = getSessionData(SESSION_KEY);
    var question = quizz[questionIndex];
    var questionNumberBox = document.getElementById('questionNumber');
    var questionText = content.querySelector('#questionText');
    var options = content.querySelectorAll('.answerOption');

    questionNumberBox.textContent = question.number;
    questionText.textContent = `${question.number}. ${question.text}`;
    options.forEach((option, index) => {
        option.checked = false;
        var questionOption = question.options[index];
        option.value = questionOption.value;
        option.nextSibling.nodeValue = questionOption.text; // Modifica el label text sin sobreescribir el radio input anidado.
    });
}

function checkAnswer() {
    var quizz = getSessionData(SESSION_KEY);
    var questionBox = document.getElementById('questionBox');
    var selectedOption = document.querySelector('input[class="answerOption"]:checked');
    var question = quizz[currentQuestionIndex];
    var questionResult;

    questionAnswered = true;
    lockAnswer();

    if(selectedOption.value == question.rightAnswer){
        setBackgroundColor(questionBox, '#b0f9de');
        questionResult = setQuestionResult(question.rightAnswerOutput, '#18ba69');
        quizz.splice(currentQuestionIndex, 1);        // Elimina la pregunta del array.
        saveSessionData(SESSION_KEY, quizz);
    } else {
        setBackgroundColor(questionBox, '#f3aaaa');
        questionResult = setQuestionResult(question.wrongAnswerOutput, '#c42b2b');
    }

    show(questionResult);
}

function setQuestionResult(result, color) {
    var questionResult = document.getElementById('questionResult');

    questionResult.innerHTML = result;
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

function saveSessionData(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

function getSessionData(key) {
   return JSON.parse(sessionStorage.getItem(key));
}

function clearSessionData() {
    sessionStorage.clear();
}

function sessionHasKey(key) {
    return sessionStorage.getItem(key) !== null;
}

function showPopup() {
    var popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";
    
    popupContainer.innerHTML = "<p>Juego reiniciado exitósamente</p>";

    document.body.appendChild(popupContainer);

    function showPopup() {
        popupContainer.classList.add("fade-in");
        popupContainer.style.display = "block";
    }

    function removePopup() {
        document.body.removeChild(popupContainer);
    }

    showPopup();

    setTimeout(removePopup, 5000);
}