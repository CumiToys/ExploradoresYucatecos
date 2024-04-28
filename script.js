var loadGameButton = document.getElementById('startButton');
loadGameButton.addEventListener('click', loadGame);

var quizz = [];
var number = 0;

async function loadGame() {
    setActionEvents();
    await loadData();
    randomNumber = generateRandomNumber(quizz.length);
    displayQuestionBox();
    showContent();
    loadQuestion(randomNumber);
}

function setActionEvents() {
    var radioInputs = document.querySelectorAll('.answerOption');

    radioInputs.forEach(function(radio) {
        radio.addEventListener('change', function() {
            handleOptionChange(this);
        });
    });
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

function loadQuestion(questionNumber) {
    var questionBoxContent = document.getElementById('questionBoxContent')
    var answerButton = document.getElementById('answerButton');

    questionBoxContent.classList.add('fade-away');
    fillContent(questionBoxContent, questionNumber);
    answerButton.disabled = true;
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
