var loadGameButton = document.getElementById('generateButton');
loadGameButton.addEventListener('click', loadGame);
var radioInputs = document.querySelectorAll('.answerOption');
var answerButton = document.getElementById('answerButton');
var questionNumberBox = document.getElementById('questionNumberBox');
var questionBox = document.getElementById('questionBox');
var questionBoxContent = document.getElementById('questionBoxContent')

function loadGame() {
    generateRandomNumber();
    answerButton.disabled = true;
    questionBox.classList.remove('hidden');
    questionBox.classList.add('visible');
    questionBoxContent.classList.remove('hidden');
    questionBoxContent.classList.add('visible');
}

function generateRandomNumber() {
    // Genera un número aleatorio del 1 al 10
    var randomNumber = Math.floor(Math.random() * 10) + 1;

    // Muestra el número generado en el elemento con id "randomNumber"
    document.getElementById('randomNumber').textContent = randomNumber;
}

radioInputs.forEach(function(radio) {
    radio.addEventListener('change', function() {
        handleOptionChange(this);
    });
});

function handleOptionChange(radio) {
    answerButton.disabled = false;
}
