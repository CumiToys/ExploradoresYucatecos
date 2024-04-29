var loadGameButton = document.getElementById('startButton');
loadGameButton.addEventListener('click', loadGame);

var quizz = [];

async function loadGame() {
    setActionEvents();
    await loadData();
    displayQuestionBox();
    loadNextQuestion();
    showContent();
}

function setActionEvents() {
    var radioInputs = document.querySelectorAll('.answerOption');
    var nextQuestionButton = document.getElementById('nextQuestionButton'); 

    radioInputs.forEach(function(radio) {
        radio.addEventListener('change', function() {
            handleOptionChange(this);
        });
    });

    nextQuestionButton.addEventListener('click', loadNextQuestion);
}

function displayQuestionBox() {
    var questionBox = document.getElementById('questionBox');
    
    questionBox.classList.remove('hidden');
    questionBox.classList.add('visible');
}

function showContent() {
    var questionBoxContent = document.getElementById('questionBoxContent')

    questionBoxContent.classList.remove('hidden');
    questionBoxContent.classList.add('visible');
}

function loadNextQuestion() {
    var randomNumber = generateRandomNumber(quizz.length);
    loadQuestion(randomNumber);
}

function loadQuestion(questionNumber) {
    var questionBoxContent = document.getElementById('questionBoxContent')
    var answerButton = document.getElementById('answerButton');

    answerButton.disabled = true;
    questionBoxContent.classList.add('fade-away');
    fillContent(questionBoxContent, questionNumber);
    questionBoxContent.classList.add('fade-in');
}

function fillContent(content, questionNumber) {
    var questionNumberBox = document.getElementById('questionNumber');
    var questionText = content.querySelector('#questionText');
    var options = content.querySelectorAll('.answerOption');

    questionNumberBox.textContent = questionNumber + 1;
    
    questionText.textContent = quizz[questionNumber].text;
    options.forEach((option, index) => {
        var questionOption = quizz[questionNumber].options[index];
        option.checked = false;
        option.value = questionOption.value;
        option.nextSibling.nodeValue = questionOption.text;
    });
}

function generateRandomNumber(maxValue) {
    // Genera un número aleatorio del 0 al valor máximo(maxValue - 1).
    return Math.floor(Math.random() * maxValue);
}

function handleOptionChange(radio) {
    answerButton.disabled = false;
    console.log(radio.value);
}

async function loadData() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
          throw new Error('File Not Found');
        }
        quizz = await response.json();
        return quizz;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
}
