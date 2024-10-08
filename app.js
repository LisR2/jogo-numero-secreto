let listaDeNumerosSorteados = [];
let numeroLimite= 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirtextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

function mensagemInicial(){
exibirtextoNaTela('h1', 'Jogo do número secreto');
exibirtextoNaTela('p', 'Escolha um número de 1 a 10');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você acertou o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}`;
        exibirtextoNaTela('h1', 'Acertou!');
        exibirtextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exibirtextoNaTela('p', 'O número secreto é maior');
        } else {
            exibirtextoNaTela('p', 'O número secreto é menor');
        }
        tentativas++;
    }
    
    // Limpar o campo de input após a tentativa
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista==numeroLimite){
        listaDeNumerosSorteados=[];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}


function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = ''; // Limpa o campo de input
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}