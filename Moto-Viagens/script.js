var motosNaGaragem = ["Shadow-750", "Shadow-600"];
var indexAtual = 0;

var motosLoja = [
	"Shadow-750",
	"Shadow-600",
	"Boulevard-800",
	"Virago-535",
	"Dragstar-650",
	"Midnight-star-950",
	"Vulcan-900",
];
var indexAtualLoja = 0;

var executandoAnimacao = 0;

// 		SEÇÃO TELA DE ENTRADA

// ENTRAR NA SEÇÃO GARAGEM
function entrarGaragem() {
	var entrada = document.getElementById("telaEntrada");
	var garagem = document.getElementById("telaGaragem");
	var loja = document.getElementById("telaLoja");

	entrada.style = "display: none;";
	garagem.style = "display: block;";
	loja.style = "display: none;";
}
// VOLTAR PARA TELA DE ENTRADA
function telaEntrada() {
	var entrada = document.getElementById("telaEntrada");
	var garagem = document.getElementById("telaGaragem");
	var loja = document.getElementById("telaLoja");

	entrada.style = "display: flex;";
	garagem.style = "display: none;";
	loja.style = "display: none;";
}
// ENTRAR NA SEÇÃO LOJA
function entrarLoja() {
	var entrada = document.getElementById("telaEntrada");
	var loja = document.getElementById("telaLoja");
	var garagem = document.getElementById("telaGaragem");

	entrada.style = "display: none;";
	loja.style = "display: block;";
	garagem.style = "display: none;";
}

// 		FUNÇÕES DA SEÇÃO GARAGEM

// FUNÇÃO PARA RODAR SLIDER
function anteriorMotocicleta() {
	var imagemMotoAtual = document.getElementById("motocicletaAtual");
	var imagemMotoOut = document.getElementById("motocicletaGetIn");
	var imagemMotoIn = document.getElementById("motocicletaGetOut");
	var motoAtual = imagemMotoAtual.classList;

	if (executandoAnimacao == 1) {
		return false;
	}
	executandoAnimacao = 1;
	indexAtual = motosNaGaragem.indexOf(motoAtual.value);

	if (indexAtual == 0) {
		imagemMotoIn.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual = motosNaGaragem.length - 1;
		imagemMotoAtual.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoAtual.setAttribute("class", motosNaGaragem[indexAtual]);

		imagemMotoOut.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoOut.style = `display: block`;

		imagemMotoIn.classList = `motoLeftOut`;
		imagemMotoOut.classList = `motoLeftIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
			executandoAnimacao = 0;
		}, 950);
	} else {
		imagemMotoIn.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual -= 1;
		imagemMotoAtual.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoAtual.setAttribute("class", motosNaGaragem[indexAtual]);

		imagemMotoOut.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoOut.style = `display: block`;

		imagemMotoIn.classList = `motoLeftOut`;
		imagemMotoOut.classList = `motoLeftIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
			executandoAnimacao = 0;
		}, 950);
	}
}
// FUNÇÃO PARA RODAR SLIDER
function proximaMotocicleta() {
	var imagemMotoAtual = document.getElementById("motocicletaAtual");
	var imagemMotoOut = document.getElementById("motocicletaGetIn");
	var imagemMotoIn = document.getElementById("motocicletaGetOut");
	var motoAtual = imagemMotoAtual.classList;

	if (executandoAnimacao == 1) {
		return false;
	}
	executandoAnimacao = 1;
	indexAtual = motosNaGaragem.indexOf(motoAtual.value);

	if (indexAtual == motosNaGaragem.length - 1) {
		imagemMotoIn.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual = 0;
		imagemMotoAtual.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoAtual.setAttribute("class", motosNaGaragem[indexAtual]);

		imagemMotoOut.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoOut.style = `margin-right: 0; margin-left:1500px; display: block`;

		imagemMotoIn.classList = `motoRightOut`;
		imagemMotoOut.classList = `motoRightIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
			executandoAnimacao = 0;
		}, 950);
	} else {
		imagemMotoIn.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual += 1;
		imagemMotoAtual.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoAtual.setAttribute("class", motosNaGaragem[indexAtual]);

		imagemMotoOut.src = `./Banco-de-Motos/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoOut.style = `margin-right: 0; margin-left:1500px; display: block`;

		imagemMotoIn.classList = `motoRightOut`;
		imagemMotoOut.classList = `motoRightIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
			executandoAnimacao = 0;
		}, 950);
	}
}
// EXIBIR MODAL COM DETALHES DA MOTO
function exibirDetalhes() {
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	modalDetalhes.style = "display: flex;";
	console.log(modalDetalhes.style.display);
}
// FECHAR MODAL DE DETALHES
function fecharDetalhes() {
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	modalDetalhes.style = "display: none;";
}
// MARCAR MOTO COMO "JÁ POSSUI"
function marcarMoto() {
	var checkMoto = document.getElementById("modeloCheck");
	var botaoCompra = document.getElementById("botaoComprar");
	var botaoVenda = document.getElementById("botaoVender");

	botaoVenda.style = "display: flex;";
	botaoCompra.style = "display: none;";
	checkMoto.src = "../Rascunhos/Banco-de-Imagens/No-BG/buyed-check.png";
	checkMoto.style = "filter: brightness(90%);";
}
// DESMARCAR MOTO COMO "JÁ POSSUI"
function desmarcarMoto() {
	var checkMoto = document.getElementById("modeloCheck");
	var botaoCompra = document.getElementById("botaoComprar");
	var botaoVenda = document.getElementById("botaoVender");

	botaoVenda.style = "display: none;";
	botaoCompra.style = "display: flex;";
	checkMoto.src = "../Rascunhos/Banco-de-Imagens/No-BG/buyed.png";
	checkMoto.style = "filter: opacity(30%);";
}

// 		FUNÇÕES DA SEÇÃO LOJA

// FUNÇÃO PARA RODAR SLIDER
function backwardMotorcycle() {
	var imagemMotoAtual = document.getElementById("motocicletaAtualLoja");
	var imagemMotoOut = document.getElementById("motocicletaGetInLoja");
	var imagemMotoIn = document.getElementById("motocicletaGetOutLoja");
	var modalEspecificacoes = document.getElementById("modalMotosLoja");
	var motoAtual = imagemMotoAtual.classList;

	if (executandoAnimacao == 1) {
		return false;
	}
	executandoAnimacao = 1;
	modalEspecificacoes.style = `display: none`;
	indexAtualLoja = motosLoja.indexOf(motoAtual.value);

	if (indexAtualLoja == 0) {
		imagemMotoIn.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtualLoja = motosNaGaragem.length - 1;
		imagemMotoAtual.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoAtual.setAttribute("class", motosLoja[indexAtualLoja]);
		// console.log(imagemMotoAtual.className);

		imagemMotoOut.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoOut.style = `display: block`;

		imagemMotoIn.classList = `motoLeftOut`;
		imagemMotoOut.classList = `motoLeftIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
			executandoAnimacao = 0;
			modalEspecificacoes.style = `display: flex`;
		}, 950);
	} else {
		imagemMotoIn.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtualLoja -= 1;
		imagemMotoAtual.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoAtual.setAttribute("class", motosLoja[indexAtualLoja]);
		// console.log(imagemMotoAtual.className);

		imagemMotoOut.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoOut.style = `display: block`;

		imagemMotoIn.classList = `motoLeftOut`;
		imagemMotoOut.classList = `motoLeftIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
			executandoAnimacao = 0;
			modalEspecificacoes.style = `display: flex`;
		}, 950);
	}
}
// FUNÇÃO PARA RODAR SLIDER
function forwardMotorcycle() {
	var imagemMotoAtual = document.getElementById("motocicletaAtualLoja");
	var imagemMotoOut = document.getElementById("motocicletaGetInLoja");
	var imagemMotoIn = document.getElementById("motocicletaGetOutLoja");
	var modalEspecificacoes = document.getElementById("modalMotosLoja");
	var motoAtual = imagemMotoAtual.classList;

	if (executandoAnimacao == 1) {
		return false;
	}
	executandoAnimacao = 1;
	modalEspecificacoes.style = `display: none`;
	indexAtualLoja = motosLoja.indexOf(motoAtual.value);

	if (indexAtualLoja == motosLoja.length - 1) {
		imagemMotoIn.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtualLoja = 0;
		imagemMotoAtual.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoAtual.setAttribute("class", motosLoja[indexAtualLoja]);

		imagemMotoOut.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoOut.style = `margin-right: 0; margin-left:1500px; display: block`;

		imagemMotoIn.classList = `motoRightOut`;
		imagemMotoOut.classList = `motoRightIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
			executandoAnimacao = 0;
			modalEspecificacoes.style = `display: flex`;
		}, 950);
	} else {
		imagemMotoIn.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtualLoja += 1;
		imagemMotoAtual.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoAtual.setAttribute("class", motosLoja[indexAtualLoja]);

		imagemMotoOut.src = `./Banco-de-Motos/${motosLoja[indexAtualLoja]}.png`;
		imagemMotoOut.style = `margin-right: 0; margin-left:1500px; display: block`;

		imagemMotoIn.classList = `motoRightOut`;
		imagemMotoOut.classList = `motoRightIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
			executandoAnimacao = 0;
			modalEspecificacoes.style = `display: flex`;
		}, 950);
	}
}
function modalAdicionar() {
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	modalDetalhes.style = "display: flex;";
}
