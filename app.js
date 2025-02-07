let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do numero secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um numero entre 1 e 10'

let listaNumeroDeSorteados = [];
let numeroLimite = 100
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 45');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled')
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O numero é menor que o chute');
        }else{
            exibirTextoNaTela('p', 'O numero é maior');
        }
        tentativas++;
        limparCampo()
    }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * numeroLimite);
    let quantidadeDeElementosNaLista = listaNumeroDeSorteados.length;

    if (quantidadeDeElementosNaLista == 4){
        listaNumeroDeSorteados = [];
    }
    if (listaNumeroDeSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumeroDeSorteados.push(numeroEscolhido)
        console.log(listaNumeroDeSorteados)
        return numeroEscolhido;
    }
    
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true); 
}


