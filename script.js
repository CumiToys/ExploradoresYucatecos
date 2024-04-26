document.getElementById('generateButton').addEventListener('click', generateRandomNumber);

function generateRandomNumber() {
    // Genera un número aleatorio del 1 al 10
    var randomNumber = Math.floor(Math.random() * 10) + 1;

    // Muestra el número generado en el elemento con id "randomNumber"
    document.getElementById('randomNumber').textContent = randomNumber;
}