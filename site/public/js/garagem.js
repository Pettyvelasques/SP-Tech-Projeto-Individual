//
// 		FUNÇÕES DA SEÇÃO GARAGEM

// EXIBIR MODAL COM DETALHES DA MOTO
function exibirDetalhes() {
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	modalDetalhes.style = "display: flex;";
}

// MARCAR MOTO COMO "JÁ POSSUI"
function marcarMoto() {
	var checkMoto = document.getElementById("modeloCheck");
	var botaoCompra = document.getElementById("botaoComprar");
	var botaoVenda = document.getElementById("botaoVender");

	if (possuiMoto == true) {
		botaoVenda.style = "display: none;";
		botaoCompra.style = "display: flex;";
		checkMoto.src = ".//assets/icones/buyed.png";
		checkMoto.style = "filter: opacity(30%);";
		possuiMoto = false;
	} else if (possuiMoto == false) {
		botaoVenda.style = "display: flex;";
		botaoCompra.style = "display: none;";
		checkMoto.src = ".//assets/icones/buyed-check.png";
		checkMoto.style = "filter: brightness(90%);";
		possuiMoto = true;
	} else {
		console.log(`erro ao (des)marcar moto.. valor da variavel:${possuiMoto}`);
	}
}

//
// 		FUNÇÕES DA SEÇÃO LOJA

// MODAL PARA ADIÇÃO DE MOTOS NA GARAGEM
function modalModificarGaragem() {
	var adicionadaGaragem = motosNaGaragem.indexOf(motosLoja[indexAtualLoja]);
	var modalAdd = document.getElementById("modalAdicionar");
	var modalRemove = document.getElementById("modalRemover");

	if (adicionadaGaragem == -1) {
		modalAdd.style = "display: flex";
		modalRemove.style = "display: none";
	} else if (adicionadaGaragem != -1) {
		modalRemove.style = "display: flex";
		modalAdd.style = "display: none";
	} else {
		console.log(
			`erro ao exibir modal de adição de motos na garagem.. valor da variavel:${adicionadaGaragem}`
		);
	}
}

// FUNÇÃO DO MODAL PARA ADICIONAR MOTOS NA GARAGEM

function motoNaGaragem(msg) {
	var possuiNaGaragem = msg;
	var adicionadaGaragem = motosNaGaragem.indexOf(motosLoja[indexAtualLoja]);

	if (possuiMoto == true) {
		console.log(
			`Impossível remover da garagem uma moto que você ainda não vendeu!`
		);
	} else if (possuiNaGaragem == false && possuiMoto == false) {
		motosNaGaragem.push(motosLoja[indexAtualLoja]);
	} else if (possuiNaGaragem == true && possuiMoto == false) {
		motosNaGaragem.splice(adicionadaGaragem, 1);
	} else {
		console.log(
			`erro ao adicionar/remover moto na garagem.. valor da variavel:${msg}`
		);
	}
	atualizarValorGaragem();
	fecharModais();
}

//
// 		FUNÇÕES GLOBAIS

//
function mostraInfo(locate) {
	var modal;
	if (locate == "garagem") {
		modal = document.getElementById("infoPrecoGaragem");
	} else if (locate == "loja") {
		modal = document.getElementById("infoPrecoLoja");
	}
	modal.style = "display: flex;";
}

function ocultaInfo() {
	var garagem = document.getElementById("infoPrecoGaragem");
	var loja = document.getElementById("infoPrecoLoja");

	garagem.style = "display: none;";
	loja.style = "display: none;";
}

//
function toDash() {
	window.location.href = "./dashboard/dashboard.html";
}
function deslogar() {
	window.location.href = "./index.html";
}

// 		SELEÇÃO DE TELAS
function trocarTela(tela) {
	var entrada = document.getElementById("telaEntrada");
	var loja = document.getElementById("telaLoja");
	var garagem = document.getElementById("telaGaragem");
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	entrada.style = "display: none;";
	loja.style = "display: none;";
	garagem.style = "display: none;";
	modalDetalhes.style = "display: none;";

	if (tela == "entrada") {
		entrada.style = "display: flex;";
	} else if (tela == "loja") {
		indexAtualLoja = motosLoja.length - 1;
		proximaMoto(`loja`);
		loja.style = "display: block;";
	} else if (tela == "garagem") {
		indexAtual = motosNaGaragem.length - 1;
		proximaMoto(`garagem`);
		garagem.style = "display: block;";
	} else {
		console.log(`Erro ao fazer seleção de tela... valor da variavel ${tela}`);
	}
	atualizarValorGaragem();
}

// FUNÇÃO PARA RODAR SLIDER
function anteriorMoto(locate) {
	if (executandoAnimacao == 1) {
		return false;
	}

	executandoAnimacao = 1;
	var imagemMotoAtual;
	var imagemMotoOut;
	var arrayMotos = [];
	var indiceAtual = 0;

	if (locate == "loja") {
		imagemMotoAtual = document.getElementById("motocicletaAtualLoja");
		imagemMotoOut = document.getElementById("motocicletaGetInLoja");
		var modalEspecificacoes = document.getElementById("modalMotosLoja");
		arrayMotos = motosLoja;
		indiceAtual = indexAtualLoja;
		modalEspecificacoes.style = `display: none`;
	} else if (locate == "garagem") {
		imagemMotoAtual = document.getElementById("motocicletaAtual");
		imagemMotoOut = document.getElementById("motocicletaGetIn");
		arrayMotos = motosNaGaragem;
		indiceAtual = indexAtual;
	} else {
		console.log(
			`erro ao recuperar localizacao do slider... valor da variavel ${locate}`
		);
		executandoAnimacao = 0;
		return false;
	}
	fecharModais();
	if (indiceAtual == 0) {
		if (locate == "loja") {
			indexAtualLoja = arrayMotos.length - 1;
		} else if (locate == "garagem") {
			indexAtual = arrayMotos.length - 1;
		}
		indiceAtual = arrayMotos.length - 1;
	} else {
		if (locate == "loja") {
			indexAtualLoja -= 1;
		} else if (locate == "garagem") {
			indexAtual -= 1;
		}
		indiceAtual -= 1;
	}
	imagemMotoOut.src = `.//assets/motos/${arrayMotos[indiceAtual]}.png`;
	imagemMotoOut.style = `margin-right: 1500px; margin-left: 0; display: block`;
	imagemMotoOut.classList = `motoLeftIn`;

	imagemMotoAtual.classList = `motoLeftOut`;

	mudarValoresModal(locate, arrayMotos[indiceAtual]);
	setTimeout(() => {
		imagemMotoOut.classList = ``;
		imagemMotoOut.style = `display: none`;

		imagemMotoAtual.src = `.//assets/motos/${arrayMotos[indiceAtual]}.png`;
		imagemMotoAtual.setAttribute("class", arrayMotos[indiceAtual]);
		imagemMotoAtual.style = `display: block`;

		if (locate == "loja") {
			modalEspecificacoes.style = `display: flex`;
		}
		executandoAnimacao = 0;
	}, 900);
}

// FUNÇÃO PARA RODAR SLIDER
function proximaMoto(locate) {
	if (executandoAnimacao == 1) {
		return false;
	}

	executandoAnimacao = 1;
	var imagemMotoAtual;
	var imagemMotoOut;
	var arrayMotos = [];
	var indiceAtual = 0;

	if (locate == "loja") {
		imagemMotoAtual = document.getElementById("motocicletaAtualLoja");
		imagemMotoOut = document.getElementById("motocicletaGetInLoja");
		var modalEspecificacoes = document.getElementById("modalMotosLoja");
		arrayMotos = motosLoja;
		indiceAtual = indexAtualLoja;
		modalEspecificacoes.style = `display: none`;
	} else if (locate == "garagem") {
		imagemMotoAtual = document.getElementById("motocicletaAtual");
		imagemMotoOut = document.getElementById("motocicletaGetIn");
		arrayMotos = motosNaGaragem;
		indiceAtual = indexAtual;
	} else {
		console.log(
			`erro ao recuperar localizacao do slider... valor da variavel ${locate}`
		);
		executandoAnimacao = 0;
		return false;
	}
	fecharModais();
	if (indiceAtual == arrayMotos.length - 1) {
		if (locate == "loja") {
			indexAtualLoja = 0;
		} else if (locate == "garagem") {
			indexAtual = 0;
		}
		indiceAtual = 0;
	} else {
		if (locate == "loja") {
			indexAtualLoja += 1;
		} else if (locate == "garagem") {
			indexAtual += 1;
		}
		indiceAtual += 1;
	}

	imagemMotoOut.src = `.//assets/motos/${arrayMotos[indiceAtual]}.png`;
	imagemMotoOut.style = `margin-right: 0; margin-left:1500px; display: block`;
	imagemMotoOut.classList = `motoRightIn`;

	imagemMotoAtual.classList = `motoRightOut`;

	mudarValoresModal(locate, arrayMotos[indiceAtual]);
	setTimeout(() => {
		imagemMotoOut.classList = ``;
		imagemMotoOut.style = `display: none`;

		imagemMotoAtual.src = `.//assets/motos/${arrayMotos[indiceAtual]}.png`;
		imagemMotoAtual.setAttribute("class", arrayMotos[indiceAtual]);
		imagemMotoAtual.style = `display: block`;

		executandoAnimacao = 0;

		if (locate == "loja") {
			modalEspecificacoes.style = `display: flex`;
		}
	}, 900);
}

// FUNÇÃO PARA ATUALIZAR O VALOR DA GARAGEM
function atualizarValorGaragem() {
	var valorSecaoGaragem = document.getElementById("precoTotalGaragem");
	var valorSecaoLoja = document.getElementById("precoTotalLoja");
	var valorGaragem = 0;

	for (contador = 0; contador < motosNaGaragem.length; contador++) {
		var motoIndex = motosNaGaragem[contador];

		if (motoIndex == "shadow-750") {
			valorGaragem += Number(shadow750.preco);
		} else if (motoIndex == "shadow-600") {
			valorGaragem += Number(shadow600.preco);
		} else if (motoIndex == "boulevard-800") {
			valorGaragem += Number(boulevard800.preco);
		} else if (motoIndex == "virago-535") {
			valorGaragem += Number(virago535.preco);
		} else if (motoIndex == "dragstar-650") {
			valorGaragem += Number(dragstar650.preco);
		} else if (motoIndex == "midnight-950") {
			valorGaragem += Number(midnight950.preco);
		} else if (motoIndex == "vulcan-900") {
			valorGaragem += Number(vulcan900.preco);
		}
	}

	valorGaragem = valorGaragem.toString();
	var correcaoPreco = valorGaragem.replace(
		valorGaragem[valorGaragem.length - 4],
		valorGaragem[valorGaragem.length - 4] + "."
	);
	valorSecaoGaragem.innerHTML = correcaoPreco + ",00";
	valorSecaoLoja.innerHTML = correcaoPreco + ",00";
}

// FECHAR MODAL DE DETALHES
function fecharModais() {
	var modalAdd = document.getElementById("modalAdicionar");
	var modalRemove = document.getElementById("modalRemover");
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	modalAdd.style = "display: none";
	modalRemove.style = "display: none";
	modalDetalhes.style = "display: none;";
}

// FUNÇÃO PARA MUDAR OS VALORES DAS MOTOS NOS MODAIS
function mudarValoresModal(locate, value) {
	var motoAtual = "";

	if (value == "shadow-750") {
		motoAtual = shadow750;
	} else if (value == "shadow-600") {
		motoAtual = shadow600;
	} else if (value == "boulevard-800") {
		motoAtual = boulevard800;
	} else if (value == "virago-535") {
		motoAtual = virago535;
	} else if (value == "dragstar-650") {
		motoAtual = dragstar650;
	} else if (value == "midnight-950") {
		motoAtual = midnight950;
	} else if (value == "vulcan-900") {
		motoAtual = vulcan900;
	} else {
		console.log(`erro ao resgatar nome da moto.. valor da variavel:${value}`);
		return false;
	}

	if (locate == "loja") {
		var modelo = document.getElementById("detalhesModeloLoja");
		var logo = document.getElementById("logoMarcaLoja");
		var preco = document.getElementById("detalhesPrecoLoja");
		var marca = document.getElementById("detalhesMarcaLoja");
		var cilindrada = document.getElementById("detalhesCilindradaLoja");
		var potencia = document.getElementById("detalhesPotenciaLoja");
		var torque = document.getElementById("detalhesTorqueLoja");
		var consumo = document.getElementById("detalhesConsumoLoja");
		var tanque = document.getElementById("detalhesTanqueLoja");
		var addMarca = document.getElementById("adicionarMarca");
		var addModelo = document.getElementById("adicionarModelo");
		var removeMarca = document.getElementById("removerMarca");
		var removeModelo = document.getElementById("removerModelo");

		addMarca.innerHTML = motoAtual.marca;
		addModelo.innerHTML = motoAtual.modelo;
		removeMarca.innerHTML = motoAtual.marca;
		removeModelo.innerHTML = motoAtual.modelo;
	} else if (locate == "garagem") {
		var imagem = document.getElementById("detalhesImagem");
		var logo = document.getElementById("logoMarca");
		var modelo = document.getElementById("detalhesModelo");
		var preco = document.getElementById("detalhesPreco");
		var marca = document.getElementById("detalhesMarca");
		var cilindrada = document.getElementById("detalhesCilindrada");
		var potencia = document.getElementById("detalhesPotencia");
		var torque = document.getElementById("detalhesTorque");
		var consumo = document.getElementById("detalhesConsumo");
		var tanque = document.getElementById("detalhesTanque");

		imagem.src = `.//assets/motos/${value}.png`;
	}

	var correcaoPreco = motoAtual.preco.replace(
		motoAtual.preco[motoAtual.preco.length - 4],
		motoAtual.preco[motoAtual.preco.length - 4] + "."
	);
	preco.innerHTML = "R$ " + correcaoPreco + ",00";

	logo.src = `.//assets/logomarcas/logo-${motoAtual.marca}.png`;
	marca.innerHTML = motoAtual.marca;
	modelo.innerHTML = motoAtual.modelo;
	cilindrada.innerHTML = motoAtual.cilindrada;
	potencia.innerHTML = motoAtual.potencia;
	torque.innerHTML = motoAtual.torque;
	consumo.innerHTML = motoAtual.consumo;
	tanque.innerHTML = motoAtual.tanque;
}

//
// DECLARAÇÃO DAS VARIAVEIS GLOBAIS
var executandoAnimacao = 0;
var possuiMoto = false;

var indexAtual = 0;
var motosNaGaragem = ["shadow-750", "shadow-600"];

var indexAtualLoja = 0;
var motosLoja = [
	"shadow-750",
	"shadow-600",
	"boulevard-800",
	"virago-535",
	"dragstar-650",
	"midnight-950",
	"vulcan-900",
];

//
// DECLARAÇÃO DOS OBJETOS MOTOS
const shadow750 = {
	modelo: "Shadow 750",
	marca: "Honda",
	preco: "41435",
	cilindrada: "745",
	potencia: "45,5",
	torque: "6,5",
	consumo: "18,5",
	tanque: "14,6",
};

const shadow600 = {
	modelo: "Shadow 600",
	marca: "Honda",
	preco: "26669",
	cilindrada: "583",
	potencia: "39",
	torque: "5,1",
	consumo: "18",
	tanque: "11",
};

const boulevard800 = {
	modelo: "Boulevard 800",
	marca: "Suzuki",
	preco: "42329",
	cilindrada: "805",
	potencia: "55",
	torque: "6,7",
	consumo: "15",
	tanque: "15,5",
};

const virago535 = {
	modelo: "Virago 535",
	marca: "Yamaha",
	preco: "19800",
	cilindrada: "535",
	potencia: "45",
	torque: "4,56",
	consumo: "17,1",
	tanque: "13,5",
};

const dragstar650 = {
	modelo: "Dragstar 650",
	marca: "Yamaha",
	preco: "28101",
	cilindrada: "649",
	potencia: "39,4",
	torque: "5,1",
	consumo: "19",
	tanque: "16",
};

const midnight950 = {
	modelo: "Midnight 950",
	marca: "Yamaha",
	preco: "45412",
	cilindrada: "942",
	potencia: "53,6",
	torque: "7,83",
	consumo: "17",
	tanque: "17",
};

const vulcan900 = {
	modelo: "Vulcan 900",
	marca: "Kawasaki",
	preco: "38125",
	cilindrada: "903",
	potencia: "50",
	torque: "8",
	consumo: "18,2",
	tanque: "20",
};

const usuarioPatrick = {
	username: "pettyvelasques",
	senha: "pet123",
};
