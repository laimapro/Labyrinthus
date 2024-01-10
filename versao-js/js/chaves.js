var resultados = [];
var primeirosPassosElement = document.getElementById('PrimeiroPasso');
var velocidadePadrao = 1.8; // Velocidade padrão
var synth = window.speechSynthesis; // Mover a variável synth para fora da função falarMensagem

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') { // Enter ou Barra de Espaço
        if (synth.speaking || synth.pending || synth.paused) {
            // Se estiver falando, pausado ou com síntese pendente, interrompe
            synth.cancel();
        }
        playSound();
        sortearNumero();
    }
});

function sortearNumero() {
    var btnElement = document.getElementById('PrimeiroPassoBtn');

    if (resultados.length < 3) {
        var numeroSorteado = Math.floor(Math.random() * 6) + 1;

        resultados.push(numeroSorteado);

        mostrarAlertaCustomizado("Chave: " + numeroSorteado);

        console.log("Chaves: " + resultados.join(', '));

        // Salvando no localStorage
        localStorage.setItem('chaves', JSON.stringify(resultados));

    } 
    
    if(resultados.length == 3) {
        mostrarAlertaCustomizado("Suas chaves especiais são: " + resultados +". Agora você já está pronto para entrar no Labyrinthus.");
        primeirosPassosElement.style.display = 'none';
        btnElement.style.display = 'none'; 

        setTimeout(function() {
            window.location.href = 'entrada.html';
        }, 9000); 
    }
}

function mostrarAlertaCustomizado(mensagem) {
    var alertaPersonalizado = document.createElement('div');
    alertaPersonalizado.className = 'alerta-customizado';
    alertaPersonalizado.innerHTML = mensagem;
    document.body.appendChild(alertaPersonalizado);

    // Síntese de Voz
    falarMensagem(mensagem);
}

function falarMensagem(mensagem) {
    var utterThis = new SpeechSynthesisUtterance(mensagem);
    utterThis.rate = velocidadePadrao; // Define a velocidade padrão
    synth.speak(utterThis);
}

function playSound() {
    var audio = document.getElementById("rollSound");
    audio.play();
}
