// Função para ler em voz alta
function lerEmVozAlta(texto) {
    const synth = window.speechSynthesis;
    const voz = new SpeechSynthesisUtterance(texto);

    voz.rate = 1.8;

    // Adicionar uma propriedade ao objeto para controlar se a fala está em andamento
    voz.playing = true;

    voz.onend = function () {
        voz.playing = false;
    };

    synth.speak(voz);
}

var audioNaoEntra = document.getElementById("naoEntra");

// Adicionar uma variável para controlar o áudio de rolar
var audioRoll = document.getElementById("rollSound");

function iniciarLeitura() {
    const textoParaLer = document.querySelector('h3').textContent;
    lerEmVozAlta(textoParaLer);
}

function rolarDado() {
    const numeroAleatorio = Math.floor(Math.random() * 6) + 1;
    const resultadoElement = document.getElementById('resultado');

    // Usar a API SpeechSynthesis para interromper a fala ativa
    window.speechSynthesis.cancel();

    if (numeroAleatorio === 1 || numeroAleatorio === 6) {
        resultadoElement.innerText = `Você tirou ${numeroAleatorio}`;

        // Armazenar o número gerado no localStorage
        localStorage.setItem('entrada', numeroAleatorio);

        // Chamar a função para usar e exibir o último resultado
        usarUltimoResultado();

        setTimeout(function () {
            window.location.href = 'game.html';
        }, 1000);

    } else {
        resultadoElement.innerText = `Você tirou ${numeroAleatorio}, você não pode entrar no Labyrinthus. Jogue o dado novamente.`;
        audioNaoEntra.play();
    }

    // Interromper o áudio de rolar, se estiver tocando
    if (!audioRoll.paused) {
        audioRoll.pause();
        audioRoll.currentTime = 0;
    }

    // Ler em voz alta
    lerEmVozAlta(resultadoElement.innerText);
}

function playSound() {
    // Interromper o áudio de rolar, se estiver tocando
    if (!audioRoll.paused) {
        audioRoll.pause();
        audioRoll.currentTime = 0;
    }

    audioRoll.play();
}

// Exemplo de como usar e exibir o último resultado do dado armazenado no localStorage
function usarUltimoResultado() {
    const entrada = localStorage.getItem('entrada');

    if (entrada && (entrada === '1' || entrada === '6')) {
        console.log('O último resultado do dado armazenado foi:', entrada);

    } else {
        console.log('O último resultado do dado armazenado não foi 1 ou 6.');
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') { // Enter ou Barra de Espaço
        playSound();
        rolarDado();
    }
});
// Função para ler em voz alta
function lerEmVozAlta(texto) {
    const synth = window.speechSynthesis;
    const voz = new SpeechSynthesisUtterance(texto);

    voz.rate = 1.8;

    // Adicionar uma propriedade ao objeto para controlar se a fala está em andamento
    voz.playing = true;

    voz.onend = function () {
        voz.playing = false;
    };

    synth.speak(voz);
}

var audioNaoEntra = document.getElementById("naoEntra");

// Adicionar uma variável para controlar o áudio de rolar
var audioRoll = document.getElementById("rollSound");

function iniciarLeitura() {
    const textoParaLer = document.querySelector('h3').textContent;
    lerEmVozAlta(textoParaLer);
}

function rolarDado() {
    const numeroAleatorio = Math.floor(Math.random() * 6) + 1;
    const resultadoElement = document.getElementById('resultado');

    // Usar a API SpeechSynthesis para interromper a fala ativa
    window.speechSynthesis.cancel();

    if (numeroAleatorio === 1 || numeroAleatorio === 6) {
        resultadoElement.innerText = `Você tirou ${numeroAleatorio}`;

        // Armazenar o número gerado no localStorage
        localStorage.setItem('entrada', numeroAleatorio);

        // Chamar a função para usar e exibir o último resultado
        usarUltimoResultado();

        setTimeout(function () {
            window.location.href = 'game.html';
        }, 1000);

    } else {
        resultadoElement.innerText = `Você tirou ${numeroAleatorio}, você não pode entrar no Labyrinthus. Jogue o dado novamente.`;
        audioNaoEntra.play();
    }

    // Interromper o áudio de rolar, se estiver tocando
    if (!audioRoll.paused) {
        audioRoll.pause();
        audioRoll.currentTime = 0;
    }

    // Ler em voz alta
    lerEmVozAlta(resultadoElement.innerText);
}

function playSound() {
    // Interromper o áudio de rolar, se estiver tocando
    if (!audioRoll.paused) {
        audioRoll.pause();
        audioRoll.currentTime = 0;
    }

    audioRoll.play();
}

// Exemplo de como usar e exibir o último resultado do dado armazenado no localStorage
function usarUltimoResultado() {
    const entrada = localStorage.getItem('entrada');

    if (entrada && (entrada === '1' || entrada === '6')) {
        console.log('O último resultado do dado armazenado foi:', entrada);

    } else {
        console.log('O último resultado do dado armazenado não foi 1 ou 6.');
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') { // Enter ou Barra de Espaço
        playSound();
        rolarDado();
    }
});
