var loadGameButton = document.getElementById('generateButton');
loadGameButton.addEventListener('click', loadGame);
var radioInputs = document.querySelectorAll('.answerOption');
var answerButton = document.getElementById('answerButton');
var questionBox = document.getElementById('questionBox');
var questionBoxContent = document.getElementById('questionBoxContent')

function loadGame() {
    generateRandomNumber();
    answerButton.disabled = true;
    questionBox.classList.add('showBox');
    loadGameButton.style.display = 'none';
    questionBoxContent.classList.remove('hidden');
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
