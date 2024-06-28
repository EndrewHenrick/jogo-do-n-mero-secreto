let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio(); //variável que armazena o numero secreto que é aleatório.
let tentativas = 1; //variavel que mostra a quantidade de tentativas que o usuário teve até acertar / a variavel começa com 1 para caso o usuario acerte de primeira.

function exibirTextoNaTela(tag, texto) { //função que altera a mensagem na tela / é criado uma função pra isso para que possa ser usado mais de uma vez e para não precisar repetir o mesmo código todas as vezes.
    let campo = document.querySelector(tag); //aqui é mostrado em qual local do HTML será exibido a mensagem.
    campo.innerHTML = texto; // aqui é onde será escrito a mensagem.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() { //função para mostrar a mensagem inicial.
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial(); //execução da função para exibir a mensagem inicial.

console.log(numeroSecreto); //para mostrar o numero secreto no console(caso queira saber qual é o número secreto)

function verificarChute() { // função que verifica se o usuário acertou ou não o numero secreto e dá as condições conforme a situação;
    let chute = document.querySelector('input').value; //determina que o chute vai receber o valor do espaço 'input' (onde o usuário vai digitar a resposta).

    if (chute == numeroSecreto) { //é executado quando o usuário acerta o numero secreto.
        exibirTextoNaTela('h1', 'acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';// operador ternário para mudar a palavra "tentativa(s)".
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');//habilita o botã "novo jogo" quando o usuário acerta o numero secreto.
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é MENOR');
    } else {
        exibirTextoNaTela('p', 'O número secreto é MAIOR');
    }
    tentativas++; // acrecenta o numero de tentativas a cada vez que o usuário erra o numero secreto.
    limparCampo(); // executa a função de limpar o campo "input".
}

function gerarNumeroAleatorio() { // função que gera um numero aleatório
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() { // função que limpa o espaço "input" toda vez que o usuário chuta.
    chute = document.querySelector('input'); // seleciona o espaço onde o usuário digita.
    chute.value = ''; // faz com que o espaço fique vazio.
}

function reiniciarJogo() { //função que é executada quando o usuário começa um novo jogo.
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}