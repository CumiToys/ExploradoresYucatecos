document.getElementById('generateButton').addEventListener('click', generateRandomNumber);

function generateRandomNumber() {
    // Genera un número aleatorio del 1 al 10
    var randomNumber = Math.floor(Math.random() * 10) + 1;

    // Muestra el número generado en el elemento con id "randomNumber"
    document.getElementById('randomNumber').textContent = randomNumber;

    // Asigna un texto asociado al número
    var text = "";
    switch (randomNumber) {
        case 1:
            text = "Texto asociado al número 1";
            break;
        case 2:
            text = "Texto asociado al número 2";
            break;
        case 3:
            text = "Texto asociado al número 3";
            break;
        case 4:
            text = "Texto asociado al número 4";
            break;
        case 5:
            text = "Texto asociado al número 5";
            break;
        case 6:
            text = "Texto asociado al número 6";
            break;
        case 7:
            text = "Texto asociado al número 7";
            break;
        case 8:
            text = "Texto asociado al número 8";
            break;
        case 9:
            text = "Texto asociado al número 9";
            break;
        case 10:
            text = "Texto asociado al número 10";
            break;
    }
    document.getElementById('randomText').textContent = text;
}