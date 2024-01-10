(function () {
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    var audioParede = new Audio('../som/parede.wav');
    var audioParedeDireita = new Audio('../som/parededireita.wav');
    var audioParedeEsquerda = new Audio('../som/paredeesquerda.wav');
    var audioParedeInferior = new Audio('../som/paredeinferior.wav');
    var audioCheckpoint = new Audio('../som/checkpoint.wav');
    var audioArmadilha = new Audio('../som/armadilha.wav');
    var audioArmadilha2 = new Audio('../som/armadilha2.wav');
    var audioArmadilha3 = new Audio('../som/armadilha3.wav');
    var audioTeleport = new Audio('../som/teleport.wav');
    var audioPlayer = new Audio('../som/andar.wav');
    var audioDado = new Audio('../som/roll.wav');
    var audioSaida = new Audio('../som/saída.wav');
    var audioDuelo = new Audio('../som/duelo.wav');
    var audioRerrolagem= new Audio('../som/rerrolagem.wav');
    var audioPassagem = new Audio('../som/passagem.wav');
    const entrada = localStorage.getItem('entrada');




    

    function atualizarDiv() {
        var chaves = localStorage.getItem('chaves');
        if (chaves) {
            var divContainer = document.getElementById('itensContainer');

            divContainer.textContent = chaves;
            
        } else {
            console.log('Nenhum valor encontrado no localStorage.');
        }
    }

    atualizarDiv();

    window.addEventListener('storage', function (event) {
        if (event.key === 'chaves') {
            atualizarDiv();
        }
    });


    var audioBackground = new Audio('../som/bg.wav');
    audioBackground.loop = true;
    audioBackground.volume = 0.5; //inicia com 50% do som padrao
    audioBackground.play();
    
    window.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            gerarNumero();
        } else if (e.ctrlKey && e.shiftKey) {
            if (e.code === "Comma") { // Ctrl + Shift + ,
                adjustVolume(-0.1);
            } else if (e.code === "Period") { // Ctrl + Shift + .
                adjustVolume(0.1);
            }
        }
    });
    
    


    function adjustVolume(change) {
        audioBackground.volume = Math.max(0, Math.min(1, audioBackground.volume + change));
        console.log("Volume ajustado para: " + (audioBackground.volume * 100) + "%");
    }
    window.onload = function(){
        
        if (entrada === '1'){
            console.log(entrada);
            speak('Você está no ínicio do Labirinto 1, jogue o dado para andar.');
        }else{
            console.log(entrada);
            speak('Você está no ínicio do Labirinto 1, jogue o dado para andar.');
        }
    }
   

    
    // Tamanho da tela
    var canvasWidth = cnv.width;
    var canvasHeight = cnv.height;

    // Posição inicial da câmera
    var camera = {
        x: 0,
        y: 0
    };

    function updateCamera() {
        // Atualiza a posição da câmera com base na posição do jogador
        camera.x = player.x - canvasWidth / 2;
        camera.y = player.y - canvasHeight / 2;

        // Garante que a câmera não ultrapasse os limites do labirinto
        camera.x = Math.max(0, Math.min(camera.x, (numeroDeColunas * tileSize) - canvasWidth));
        camera.y = Math.max(0, Math.min(camera.y, (numeroDeLinhas * tileSize) - canvasHeight));
    }

   
    
    var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    var tileSize = 250; //tamanho da tela / visao  250

    var synth = window.speechSynthesis;

    
    var numeroPassos = 0;

    var ultimasPosicoes = [];


    window.gerarNumero = function () {

        if(numeroPassos === 0) {
            audioDado.play();

            setTimeout(function () {
                // Gera um número aleatório entre 1 e 6
                numeroPassos = Math.floor(Math.random() * 6) + 1;
                if(numeroPassos === 1){
                    speak('Ande '+ numeroPassos + ' Posição');
                }else{
                    speak('Ande '+ numeroPassos + ' Posições');
                }
                
                console.log("Número gerado: " + numeroPassos);
            }, 500); 

        }else{
            speak('Você ainda tem '+ numeroPassos + 'posições');
        }
    
    };

    

    function speak(text) {
        if (text !== '') {
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = function(event) {
             //   console.log('SpeechSynthesisUtterance.onend');
            }
            utterance.onerror = function(event) {
                console.error('SpeechSynthesisUtterance.onerror');
            }
            utterance.rate = 1.8; // Velocidade de fala
            synth.speak(utterance);
        }
    }
    
    if(entrada === '1'){
        var player = {
            x: 1 * tileSize + 2, //coluna
            y: 16 * tileSize + 2, //linha
            width: 28,
            height: 28,
        };
        
        
    }

    if(entrada === '6'){
        var player = {
            x: 1 * tileSize + 2, //coluna
            y: 16 * tileSize + 2, //linha
            width: 28,
            height: 28,
        };
       
    }
    
    var labAtual = 2;

    var numlabirinto = [labAtual, 10, 11,12, 13, 14, 15, 16];  // Valores permitidos para o jogador se movimentar

        /*
        -----------------
        Parede = 1
        Checkpoint = 10
        Armadilha1 = 11
        Armadilha2 = 13
        Armadilha3 = 14
        Teleport = 12
        Duelo = 15
        Rerrolagem = 16
        -----------------
        Labirinto 1 = 2
        Labirinto 2 = 3
        Labirinto 3 = 4
        Labirinto 4 = 5
        Labirinto 5 = 6
        Labirinto 6 = 7
        Labirinto 7 = 8
        ------------------
    */
   

        var maze = [
            [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
            [ 1, 10, 11,  7,  7,  7,  7,  7,  7,  7,  7,  7,  1],
            [ 1,  7,  1,  1,  1,  1,  1,  1,  1,  1,  1,  7,  1],
            [ 1,  7,  1,  8,  8,  8,  8,  8,  8,  8, 10, 10,  1],
            [ 1,  7,  1, 15,  1,  1,  1,  1,  1,  1,  1,  7,  1],
            [ 1,  7,  1,  1,  1,  5,  1,  4,  1, 15,  1,  7,  1],
            [ 1,  7,  1,  6,  1, 15,  1, 12,  1,  3,  1, 16,  1],
            [ 1, 10,  6, 10,  5, 10,  1, 13,  1, 10,  3, 10,  1],
            [ 1, 12,  1, 11,  1,  5,  1,  4,  1, 14,  1,  1,  1],
            [ 1,  7,  1,  1,  1, 10,  4, 10,  1,  3,  1, 15,  1],
            [ 1, 14,  1,  3,  1,  5,  1, 15,  1,  3,  2, 10,  1],
            [ 1, 10,  3, 10,  1, 12,  1, 10,  3, 10,  1, 14,  1],
            [ 1,  7,  1,  3,  1,  5,  1, 16,  1,  3,  1,  2,  1],
            [ 1, 13,  1,  3,  1,  1,  1,  1,  1,  3,  1,  2,  1],
            [ 1,  7,  1,  3, 14,  3,  3,  3,  3, 15,  1,  2,  1],
            [ 1, 70,  1,  1,  1,  1,  1,  1,  1,  1,  1, 12,  1],
            [ 1,  2,  2,  2,  2,  2,  2,  2, 14,  2,  2, 10,  1],
            [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
        ];
        

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    function keydownHandler(e) {
        var key = e.keyCode;
        switch (key) {
            case LEFT:
                moveLeft();
                break;
            case UP:
                moveUp();
                break;
            case RIGHT:
                moveRight();
                break;
            case DOWN:
                moveDown();
                break;
        }
    }

    
    function canMoveTo(row, column) {
        // Verifica se a posição é válida e se o valor é permitido
        return row >= 0 && row < maze.length &&
               column >= 0 && column < maze[0].length &&
               (numlabirinto.includes(maze[row][column]) || maze[row][column] === labAtual);
    }
    


    function moveLeft() {
        var playerColumn = Math.floor(player.x / tileSize);
        if (canMoveTo(Math.floor(player.y / tileSize), playerColumn - 1) && numeroPassos > 0) {
            player.x = (playerColumn - 1) * tileSize + 2;
            logPlayerPosition();
            audioPlayer.play();
            numeroPassos--;
            checkForSaida();
            atualizarDiv();

            if(numeroPassos === 0){
                checkEspeciais();

            }
            //console.log(numeroPassos);

            ultimasPosicoes.push({ coluna: Math.floor(player.x / tileSize), linha: Math.floor(player.y / tileSize) });
        if (ultimasPosicoes.length > 3) {
            ultimasPosicoes.shift(); // Remove a posição mais antiga
        }

        } else {
            handleCollision("esquerda");
        }
    }

    function moveUp() {
        var playerRow = Math.floor(player.y / tileSize);
        if (canMoveTo(playerRow - 1, Math.floor(player.x / tileSize)) && numeroPassos > 0) {
            player.y = (playerRow - 1) * tileSize + 2;
            logPlayerPosition();
            audioPlayer.play();
            numeroPassos--;
            checkForSaida();
            atualizarDiv();

            if(numeroPassos === 0){
                checkEspeciais();

            }
            //console.log(numeroPassos);

            ultimasPosicoes.push({ coluna: Math.floor(player.x / tileSize), linha: Math.floor(player.y / tileSize) });
            if (ultimasPosicoes.length > 3) {
                ultimasPosicoes.shift(); // Remove a posição mais antiga
            }

        } else {
            handleCollision("superior");
        }
    }

    function moveRight() {
        var playerColumn = Math.floor(player.x / tileSize);
        if (canMoveTo(Math.floor(player.y / tileSize), playerColumn + 1) && numeroPassos > 0) {
            player.x = (playerColumn + 1) * tileSize + 2;
            logPlayerPosition();
            audioPlayer.play();
            numeroPassos--;
            checkForSaida();
            atualizarDiv();

            if(numeroPassos === 0){
                checkEspeciais();

            }
            //console.log(numeroPassos);

            ultimasPosicoes.push({ coluna: Math.floor(player.x / tileSize), linha: Math.floor(player.y / tileSize) });
            if (ultimasPosicoes.length > 3) {
                ultimasPosicoes.shift(); // Remove a posição mais antiga
            }
        } else {
            handleCollision("direita");
        }
    }

    function moveDown() {
        var playerRow = Math.floor(player.y / tileSize);
        if (canMoveTo(playerRow + 1, Math.floor(player.x / tileSize)) && numeroPassos > 0) {
            player.y = (playerRow + 1) * tileSize + 2;
            
            logPlayerPosition();
            audioPlayer.play();
            numeroPassos--;
            checkForSaida();
            atualizarDiv();

            if(numeroPassos === 0){
                checkEspeciais();

            }
            console.log(numeroPassos);

            ultimasPosicoes.push({ coluna: Math.floor(player.x / tileSize), linha: Math.floor(player.y / tileSize) });
            if (ultimasPosicoes.length > 3) {
                ultimasPosicoes.shift(); // Remove a posição mais antiga
            }

        } else {
            handleCollision("inferior");
        }
    }


    //FUNCOES ESPECIAIS

    function checkEspeciais(){
        numlabirinto.push(70);
        checkForCheckpoint();
        checkForArmadilha1();
        checkForArmadilha2();
        checkForArmadilha3();
        checkFortTeleport();
        checkForSaida();
        checkForDuelo();
        checkRerrolagem();
    }

    function checkRerrolagem() {
        // Dar premiação de 2 dados
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (maze[playerRow][playerColumn] === 16) {
            console.log('Rerrolagem!');
            audioRerrolagem.play();
            speak('Rerrolagem!');
    
            setTimeout(function () {
                audioDado.play();
                gerarNumero();
            }, 2000); 
        }
    }
    
    




    function checkForSaida() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);

        if (maze[playerRow][playerColumn] === 70) {
            console.log('Saída!');
            audioSaida.play();
            
            speak('Parabéns!, você saiu do Labyrinthus');

            setTimeout(function () {
                window.location.href = 'chaves.html';
            }, 1000);
    
        }
    }

    var checkpointsVisitados = {};


    function checkForCheckpoint() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
        var checkpointKey = 'r' + playerRow + 'c' + playerColumn; // Chave única para cada checkpoint
    
        if (maze[playerRow][playerColumn] === 10) {
            if (!checkpointsVisitados[checkpointKey]) {
                var checkpointMessage = 'Checkpoint! labirinto ' + (labAtual - 1) + '!';
                speak(checkpointMessage);
                console.log(checkpointMessage);
                audioCheckpoint.play();
                setTimeout(function(){
                    sorteioCheckpoint();
                }, 2000);
    
                checkpointsVisitados[checkpointKey] = true; // Marca o checkpoint como visitado
            } else {
                var checkpointMessage = 'Checkpoint! labirinto ' + (labAtual - 1) + '!';
                speak(checkpointMessage);
                audioCheckpoint.play();
                console.log('Checkpoint já visitado.');
            }
        }
    }
    
    

    function sorteioCheckpoint(){

        var sorteadoCheckpoint = Math.floor(Math.random() * 5) + 1;
        audioDado.play();

        speak('Você ganhou uma chave ' + sorteadoCheckpoint);
        const arrayDoLocalStorage = JSON.parse(localStorage.getItem('chaves')) || [];


        const novosItens = [sorteadoCheckpoint];
        const arrayAtualizado = arrayDoLocalStorage.concat(novosItens);
    
        localStorage.setItem('chaves', JSON.stringify(arrayAtualizado));
    }



    function checkForDuelo() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);

        if (maze[playerRow][playerColumn] === 15) {
            console.log('Duelo!');
            speak('Duelo!');
            audioDuelo.play();
        }
    }

    function checkFortTeleport() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (maze[playerRow][playerColumn] === 12) {
            console.log('Teleport!');
            speak('Teleport!');
            audioTeleport.play();
    
            labAtual++;
    
            if (!numlabirinto.includes(labAtual)) {
                numlabirinto.push(labAtual);
            }
    
            // Define posições válidas para cada labirinto
            var posicoesValidas = {
                3: [{x: 9, y: 5},{x: 9, y: 6},{x: 9, y: 7},{x: 9, y: 8},{x: 9, y: 9},{x: 9, y: 10},{x: 9, y: 11},{x: 9, y: 12}, {x: 9, y: 13}, {x: 9, y: 14},{x: 8, y: 14},{x: 7, y: 14},{x: 6, y: 14},{x: 5, y: 14},{x: 4, y: 14},{x: 3, y: 14},{x: 3, y: 14},{x: 3, y: 13}, {x: 3, y: 12}, {x: 3, y: 11},{x: 3, y: 10}],
                4:[{x: 7, y: 11}, {x: 7, y: 12}, {x: 7, y: 10}, {x: 7, y: 9}, {x: 7, y: 8}, {x: 7, y: 7}, {x: 7, y: 6}, {x: 7, y: 5},],
                5:[{x: 5, y: 9}, {x: 5, y: 8}, {x: 5, y: 7}, {x: 5, y: 6}, {x: 5, y: 5}, {x: 5, y: 10}, {x: 5, y: 11}, {x: 5, y: 12},],
                6: [{x: 3, y: 7}, {x: 3, y: 6}, {x: 3, y: 8},],
                7:[{x: 11, y: 7}, {x: 11, y: 6}, {x: 11, y: 5}, {x: 11, y: 4}, {x: 11, y: 3}, {x: 11, y: 2}, {x: 11, y: 1}, {x: 10, y: 1}, {x: 9, y: 1}, {x: 8, y: 1}, {x: 7, y: 1}, {x: 6, y: 1}, {x: 5, y: 1}, {x: 4, y: 1}, {x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4},{x: 1, y: 5}, {x: 1, y: 6}, {x: 1, y: 7}, {x: 1, y: 8}, {x: 1, y: 9}, {x: 1, y: 10},{x: 1, y: 11}, {x: 1, y: 12}, {x: 1, y: 13},{x: 1, y: 14}],
              
                8: [{x: 10, y:3}, {x: 9, y: 3}, {x: 8, y:3}, {x:7, y:3}, {x: 6, y: 3}, {x: 5, y:3}, {x: 4, y:3}, {x: 3, y:3}, {x: 3, y:4}],
              

            };
    
            if (posicoesValidas[labAtual]) {
                var posicaoAleatoria = posicoesValidas[labAtual][Math.floor(Math.random() * posicoesValidas[labAtual].length)];
                player.x = posicaoAleatoria.x * tileSize + 2;
                player.y = posicaoAleatoria.y * tileSize + 2;
                numlabirinto.push(70);
            } else {
                console.log("Labirinto desconhecido ou sem posições válidas definidas");
            }
    
            speak('Transportado para Labirinto ' + (labAtual-1) + '.');
            console.log("Labirinto atualizado para o labirinto " + (labAtual-1) + "!");
        }
    }
    
    

    function checkForArmadilha1() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);

        if (maze[playerRow][playerColumn] === 11) {
            console.log('Armadilha1!');
            speak('Armadilha!');
            audioArmadilha.play();

            labAtual--;
    
            if (!numlabirinto.includes(labAtual)) {
                numlabirinto.push(labAtual);
            }
    
            // Define posições válidas para cada labirinto
            var posicoesValidas = {
                3: [{x: 9, y: 5},{x: 9, y: 6},{x: 9, y: 7},{x: 9, y: 8},{x: 9, y: 9},{x: 9, y: 10},{x: 9, y: 11},{x: 9, y: 12}, {x: 9, y: 13}, {x: 9, y: 14},{x: 8, y: 14},{x: 7, y: 14},{x: 6, y: 14},{x: 5, y: 14},{x: 4, y: 14},{x: 3, y: 14},{x: 3, y: 14},{x: 3, y: 13}, {x: 3, y: 12}, {x: 3, y: 11},{x: 3, y: 10}],
                4:[{x: 7, y: 11}, {x: 7, y: 12}, {x: 7, y: 10}, {x: 7, y: 9}, {x: 7, y: 8}, {x: 7, y: 7}, {x: 7, y: 6}, {x: 7, y: 5},],
                5:[{x: 5, y: 9}, {x: 5, y: 8}, {x: 5, y: 7}, {x: 5, y: 6}, {x: 5, y: 5}, {x: 5, y: 10}, {x: 5, y: 11}, {x: 5, y: 12},],
                6: [{x: 3, y: 7}, {x: 3, y: 6}, {x: 3, y: 8},],
                7:[{x: 11, y: 7}, {x: 11, y: 6}, {x: 11, y: 5}, {x: 11, y: 4}, {x: 11, y: 3}, {x: 11, y: 2}, {x: 11, y: 1}, {x: 10, y: 1}, {x: 9, y: 1}, {x: 8, y: 1}, {x: 7, y: 1}, {x: 6, y: 1}, {x: 5, y: 1}, {x: 4, y: 1}, {x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4},{x: 1, y: 5}, {x: 1, y: 6}, {x: 1, y: 7}, {x: 1, y: 8}, {x: 1, y: 9}, {x: 1, y: 10},{x: 1, y: 11}, {x: 1, y: 12}, {x: 1, y: 13},{x: 1, y: 14}],

                8: [{x: 10, y:3}, {x: 9, y: 3}, {x: 8, y:3}, {x:7, y:3}, {x: 6, y: 3}, {x: 5, y:3}, {x: 4, y:3}, {x: 3, y:3}, {x: 3, y:4}],
              

            };
    
            if (posicoesValidas[labAtual]) {
                var posicaoAleatoria = posicoesValidas[labAtual][Math.floor(Math.random() * posicoesValidas[labAtual].length)];
                player.x = posicaoAleatoria.x * tileSize + 2;
                player.y = posicaoAleatoria.y * tileSize + 2;
                numlabirinto.push(70);
            } else {
                console.log("Labirinto desconhecido ou sem posições válidas definidas");
            }
    
            speak('Retornado para Labirinto ' + (labAtual-1) + '.');
            checkEspeciais();
            console.log("Labirinto atualizado para o labirinto " + (labAtual-1) + "!");


        }
    }

    function checkForArmadilha2() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (maze[playerRow][playerColumn] === 13) {
            console.log('Armadilha2!');
           // speak('Armadilha!');
            audioArmadilha2.play();
    
            // Filtra as últimas 3 posições válidas
            var validPositions = ultimasPosicoes.filter(function(position) {
                return numlabirinto.includes(maze[position.linha][position.coluna]);
            });
    
            // Move aleatoriamente para uma das últimas posições válidas
            if (validPositions.length > 0) {
                var randomIndex = Math.floor(Math.random() * validPositions.length);
                var newPosition = validPositions[randomIndex];
    
                player.x = newPosition.coluna * tileSize + 2;
                player.y = newPosition.linha * tileSize + 2;
    
                var positionsToMove = 3 - randomIndex; // Se randomIndex for 0, positionsToMove será 3; se for 1, será 2; se for 2, será 1.
                console.log("Posição escolhida no array ultimasPosicoes: ", randomIndex + 1);
                if(positionsToMove == 1){
                    speak('Armadilha! Você recuou ' + positionsToMove + ' Posição');
                }else{
                    speak('Armadilha! Você recuou ' + positionsToMove + ' Posições');
                }
                
            } else {
                console.log("Não há posições anteriores válidas registradas para mover o jogador.");
            }
        }
    }
    
    
    

    function checkForArmadilha3() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (maze[playerRow][playerColumn] === 14) {
            console.log('Armadilha3!');
            speak('Armadilha!');
            audioArmadilha3.play();
    
            var storedArray = JSON.parse(localStorage.getItem('chaves'));
    
            if (Array.isArray(storedArray) && storedArray.length > 0) {
                var maiorNumero = Math.max(...storedArray);
    
                var indexMaiorNumero = storedArray.indexOf(maiorNumero);
                if (indexMaiorNumero !== -1) {
                    storedArray.splice(indexMaiorNumero, 1);
    
                    
                    localStorage.setItem('chaves', JSON.stringify(storedArray));
                    
                    speak('Perdeu a chave ' + maiorNumero);
                }
            } else {
                console.log('Array vazia ou inexistente no localStorage');
            }
        }
    }
    
    

    //para mudar o labirinto
    function mudalab(){
        lab1to2();
        lab2to3();
        lab2to6();
        lab6to7();
        lab2to6pt2();
        lab3to4();
        lab4to5();
        lab5to6();
    }

    function lab1to2() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (playerRow === 10 && playerColumn === 10) {
            labAtual = 3;
            maze[playerRow][playerColumn] = 0; 
            
            speak('Passagem do Labirinto 2.');
            audioPassagem.play();
            console.log("Labirinto atualizado para o labirinto 2!");

            numlabirinto.push(2,3,4,5,6,7,8);
        if (indexToRemove !== -1) {
            numlabirinto.splice(indexToRemove, 1);
        }
        }
    }

    function lab2to3() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (playerRow === 11 && playerColumn === 8) {
            labAtual = 4;
            speak('Passagem do Labirinto 3.');
            audioPassagem.play();
           
            numlabirinto.push(3);
            console.log("Labirinto atualizado para o labirinto 3!");
        }
    }

    function lab2to6() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (playerRow === 7 && playerColumn === 10) {
            labAtual = 7;
            maze[playerRow][playerColumn] = 0; 
        
            speak('Passagem do Labirinto 6.');
            audioPassagem.play();
            console.log("Labirinto atualizado para o labirinto 6!");
        }
    }

    
    function lab2to6pt2() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (playerRow === 11 && playerColumn === 2) {
            labAtual = 7;
            numlabirinto.push(3);

            speak('Passagem do Labirinto 6.');
            audioPassagem.play();
            console.log("Labirinto atualizado para o labirinto 6!");
        }
    }
    
    function lab6to7() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (playerRow === 3 && playerColumn === 10) {
            labAtual = 8;
             numlabirinto.push(7);
             speak('Passagem do Labirinto 7.');
             audioPassagem.play();
            console.log("Labirinto atualizado para o labirinto 7!");
        }
    }

    function lab3to4() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (playerRow === 9 && playerColumn === 6) {
            labAtual = 5;
             numlabirinto.push(4);
             speak('Passagem do Labirinto 4.');
            audioPassagem.play();
            console.log("Labirinto atualizado para o labirinto 4!");
        }
    }

    function lab4to5() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (playerRow === 7 && playerColumn === 4) {
            labAtual = 6;
             numlabirinto.push(5);
             speak('Passagem do Labirinto 5.');
            audioPassagem.play();
            console.log("Labirinto atualizado para o labirinto 5!");
        }
    }

    function lab5to6() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
    
        if (playerRow === 7 && playerColumn === 2) {
            labAtual = 7;
             numlabirinto.push(6);
             speak('Passagem do Labirinto 6.');
            audioPassagem.play();
            console.log("Labirinto atualizado para o labirinto 6!");
        }
    }
    



    
    

      //FUNCOES ESPECIAIS


        var pontosPerdidos = 0;

        function handleCollision(direction) {
            console.log("Colisão com parede " + direction + "! Não é possível mover nessa direção.");
            if(direction === 'direita'){
                audioParedeDireita.play();
            }else if(direction === 'esquerda'){
                audioParedeEsquerda.play();
            }else if(direction === 'superior'){
                audioParede.play();
            }else if(direction === 'inferior'){
                audioParedeInferior.play();
            }

            if (numeroPassos <= 0) {
                pontosPerdidos++;
                verificarEPerderChave();
            }
        }

        function verificarEPerderChave() {
            var chaves = JSON.parse(localStorage.getItem('chaves')) || [];
            var indexChaveAPerder = chaves.findIndex(chave => chave === pontosPerdidos);
        
            if (indexChaveAPerder !== -1) {
                var chavePerdida = chaves[indexChaveAPerder];
                
                chaves.splice(indexChaveAPerder, 1);
                localStorage.setItem('chaves', JSON.stringify(chaves));
        
                pontosPerdidos = 0;
                speak('Você perdeu a chave ' + chavePerdida + '. Chaves ' + chaves + 'restantes');
        
                // Verifica se o jogador ficou sem chaves
                if (chaves.length === 0) {
                    speak('Você perdeu todas as chaves! Voltou para Labirinto 1.');
                    setTimeout(function() {
                        location.reload(); // Recarrega a página
                    }, 3000); // Aguarda 3 segundos antes de recarregar
                }
            }
        }
        





    function keyupHandler(e) {
        // Só pq precisa ter 
    }

    var numeroDeColunas = maze[0].length;
    console.log("Número de colunas no tabuleiro: ", numeroDeColunas);
    var numeroDeLinhas = maze.length;
    console.log("Número de linhas no tabuleiro: ", numeroDeLinhas);

    function logPlayerPosition() {
        var playerRow = Math.floor(player.y / tileSize);
        var playerColumn = Math.floor(player.x / tileSize);
        console.log("Posição do jogador: X =", player.x, ", Y =", player.y, ", Linha =", playerRow, ", Coluna =", playerColumn);
        mudalab();
        // Mostra as últimas posições no console
        console.log("Últimas 3 posições:", ultimasPosicoes);

    }

    function render() {
        ctx.save();

        ctx.translate(-camera.x, -camera.y);

        // Desenha o labirinto
        for (var row in maze) {
            for (var column in maze[row]) {
                var tile = maze[row][column];
                var x = column * tileSize;
                var y = row * tileSize;

                if (tile === 1) {
                    ctx.fillStyle = "black";
                } else if (tile === 2) {
                    ctx.fillStyle = "white";
                }else if (tile === 15) {
                ctx.fillStyle = "white";
                } else if (tile === 16) {
                    ctx.fillStyle = "white";
                }else if (tile === 12) {
                    ctx.fillStyle = "white";
                }else if (tile === 11) {
                    ctx.fillStyle = "white";
                }
                else if (tile === 10) {
                    ctx.fillStyle = "white";
                }
                else if (tile === 13) {
                    ctx.fillStyle = "white";
                }
                else if (tile === 14) {
                    ctx.fillStyle = "white";
                }
                 else if (tile === 0) {
                    ctx.fillStyle = "red";
                } else if (tile === 70) {
                    ctx.fillStyle = "green";
                }else if (tile >= 3 && tile <= 8) {
                    ctx.fillStyle = "white";
                }

                ctx.fillRect(x, y, tileSize, tileSize);
            }
        }

    var playerImg = document.getElementById("playerImg");

    var playerWidth = player.width * 4;  
    var playerHeight = player.height * 4; 

    ctx.drawImage(playerImg, player.x, player.y, playerWidth, playerHeight);

    ctx.restore();
    }

    function loop() {
        render();
        updateCamera();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    
     

})();