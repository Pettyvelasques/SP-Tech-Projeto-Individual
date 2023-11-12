var motosNaGaragem = ["CRF-1100L", "CG-160"];
var imagemMotoAtual = document.getElementById("motocicletaAtual");
var imagemMotoOut = document.getElementById("motocicletaGetIn");
var imagemMotoIn = document.getElementById("motocicletaGetOut");
var motoAtual = imagemMotoAtual.classList;
var indexAtual = 0;
var executandoAnimacao = 0;

function anteriorMotocicleta() {
	if (executandoAnimacao == 1) {
		return false;
	}
	executandoAnimacao = 1;
	if (motoAtual.value != -1) {
		indexAtual = motosNaGaragem.indexOf(motoAtual.value);
	}
	if (indexAtual == 0) {
		imagemMotoIn.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual = motosNaGaragem.length - 1;
		imagemMotoAtual.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoAtual.classList = `${motosNaGaragem[indexAtual]}`;

		imagemMotoOut.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
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
		imagemMotoIn.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual -= 1;
		imagemMotoAtual.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoAtual.classList = `${motosNaGaragem[indexAtual]}`;

		imagemMotoOut.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
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
function proximaMotocicleta() {
	if (executandoAnimacao == 1) {
		return false;
	}
	executandoAnimacao = 1;
	if (motoAtual.value != -1) {
		indexAtual = motosNaGaragem.indexOf(motoAtual.value);
	}
	if (indexAtual == motosNaGaragem.length - 1) {
		imagemMotoIn.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual = 0;
		imagemMotoAtual.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoAtual.classList = `${motosNaGaragem[indexAtual]}`;

		imagemMotoOut.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
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
		imagemMotoIn.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual += 1;
		imagemMotoAtual.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
		imagemMotoAtual.classList = `${motosNaGaragem[indexAtual]}`;

		imagemMotoOut.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.png`;
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

function exibirDetalhes() {
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	modalDetalhes.style = "display: flex;";
	console.log(modalDetalhes.style.display);
}

function fecharDetalhes() {
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	modalDetalhes.style = "display: none;";
}

function entrarGaragem() {
	var entrada = document.getElementById("telaEntrada");
	var garagem = document.getElementById("telaGaragem");
	var loja = document.getElementById("telaLoja");

	entrada.style = "display: none;";
	garagem.style = "display: block;";
	loja.style = "display: none;";
}

function sairGaragem() {
	var entrada = document.getElementById("telaEntrada");
	var garagem = document.getElementById("telaGaragem");
	var loja = document.getElementById("telaLoja");

	entrada.style = "display: flex;";
	garagem.style = "display: none;";
	loja.style = "display: none;";
}

function entrarLoja() {
	var entrada = document.getElementById("telaEntrada");
	var loja = document.getElementById("telaLoja");
	var garagem = document.getElementById("telaGaragem");

	entrada.style = "display: none;";
	loja.style = "display: block;";
	garagem.style = "display: none;";
}

function sairLoja() {
	var entrada = document.getElementById("telaEntrada");
	var loja = document.getElementById("telaLoja");
	var garagem = document.getElementById("telaGaragem");

	entrada.style = "display: flex;";
	loja.style = "display: none;";
	garagem.style = "display: none;";
}

function marcarMoto() {
	var checkMoto = document.getElementById("modeloCheck");
	var botaoCompra = document.getElementById("botaoComprar");
	var botaoVenda = document.getElementById("botaoVender");

	botaoVenda.style = "display: flex;";
	botaoCompra.style = "display: none;";
	checkMoto.src = "../Rascunhos/Banco-de-Imagens/No-BG/buyed-check.png";
	checkMoto.style = "filter: brightness(90%);";
}
function desmarcarMoto() {
	var checkMoto = document.getElementById("modeloCheck");
	var botaoCompra = document.getElementById("botaoComprar");
	var botaoVenda = document.getElementById("botaoVender");

	botaoVenda.style = "display: none;";
	botaoCompra.style = "display: flex;";
	checkMoto.src = "../Rascunhos/Banco-de-Imagens/No-BG/buyed.png";
	checkMoto.style = "filter: opacity(30%);";
}
