//
// 		FUNÇÕES DA SEÇÃO GARAGEM

// EXIBIR MODAL COM DETALHES DA MOTO
function exibirDetalhes() {
	var modalDetalhes = document.getElementById("modalDetalhesMoto");

	modalDetalhes.style = "display: flex;";
}

// MARCAR MOTO COMO "JÁ POSSUI"
function marcarMoto() {
	// var possuiMoto = [];
	// var indexAtual = 0;
	// var motosNaGaragem = [];
	var modelo = motosNaGaragem[indexAtual];
	var temMotoVar;
	var fkMotoVar;

	var checkMoto = document.getElementById("modeloCheck");
	var botaoCompra = document.getElementById("botaoComprar");
	var botaoVenda = document.getElementById("botaoVender");

	if (modelo == "shadow-750") {
		fkMotoVar = shadow750.idMoto;
	} else if (modelo == "shadow-600") {
		fkMotoVar = shadow600.idMoto;
	} else if (modelo == "boulevard-800") {
		fkMotoVar = boulevard800.idMoto;
	} else if (modelo == "virago-535") {
		fkMotoVar = virago535.idMoto;
	} else if (modelo == "dragstar-650") {
		fkMotoVar = dragstar650.idMoto;
	} else if (modelo == "midnight-950") {
		fkMotoVar = midnight950.idMoto;
	} else if (modelo == "vulcan-900") {
		fkMotoVar = vulcan900.idMoto;
	} else {
		console.log(`erro ao resgatar nome da moto.. valor da variavel:${modelo}`);
		return false;
	}

	if (possuiMoto[indexAtual] == 1) {
		botaoVenda.style = "display: none;";
		botaoCompra.style = "display: flex;";
		checkMoto.src = "./assets/icones/buyed.png";
		checkMoto.style = "filter: opacity(30%);";
		possuiMoto[indexAtual] = 0;
		temMotoVar = 0;
	} else if (possuiMoto[indexAtual] == 0) {
		botaoVenda.style = "display: flex;";
		botaoCompra.style = "display: none;";
		checkMoto.src = "./assets/icones/buyed-check.png";
		checkMoto.style = "filter: brightness(90%);";
		possuiMoto[indexAtual] = 1;
		temMotoVar = 1;
	} else {
		console.log(
			`erro ao (des)marcar moto.. valor da variavel:${possuiMoto[indexAtual]}`
		);
	}
	fetch("/garagens/possuiMoto", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			fkMotoServer: fkMotoVar,
			temMotoServer: temMotoVar,
		}),
	})
		.then(function (resposta) {
			console.log("resposta: ", resposta);

			if (resposta.ok) {
				// motosNaGaragem.push(motosNaLoja[indexAtualLoja]);
				// possuiMoto.push(0);
				// atualizarValorGaragem();
				// fecharModais();
				// alertaErro.style.display = "flex";
				// mensagem_erro.innerHTML = "Moto adicionada a sua garagem...";
			} else {
				throw "Houve um erro ao marcar a moto como comprada!";
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});
	return false;
}

//
// 		FUNÇÕES DA SEÇÃO LOJA

// MODAL PARA ADIÇÃO DE MOTOS NA GARAGEM
function modalModificarGaragem() {
	var adicionadaGaragem = motosNaGaragem.indexOf(motosNaLoja[indexAtualLoja]);
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

function motoNaGaragem() {
	var modelo = motosNaLoja[indexAtualLoja];
	var indiceModelo = motosNaGaragem.indexOf(modelo);
	var motoComprada = possuiMoto[indiceModelo];

	var fkUsuarioVar = sessionStorage.ID_USUARIO;
	var fkGaragemVar = sessionStorage.ID_GARAGEM;
	var fkMotoVar;

	if (modelo == "shadow-750") {
		fkMotoVar = shadow750.idMoto;
	} else if (modelo == "shadow-600") {
		fkMotoVar = shadow600.idMoto;
	} else if (modelo == "boulevard-800") {
		fkMotoVar = boulevard800.idMoto;
	} else if (modelo == "virago-535") {
		fkMotoVar = virago535.idMoto;
	} else if (modelo == "dragstar-650") {
		fkMotoVar = dragstar650.idMoto;
	} else if (modelo == "midnight-950") {
		fkMotoVar = midnight950.idMoto;
	} else if (modelo == "vulcan-900") {
		fkMotoVar = vulcan900.idMoto;
	} else {
		console.log(`erro ao resgatar nome da moto.. valor da variavel:${modelo}`);
		return false;
	}

	if (motoComprada == 1) {
		console.log(
			`Impossível remover da garagem uma moto que você ainda não vendeu!`
		);
		return false;
	} else if (indiceModelo == -1) {
		fetch("/garagens/cadastrar", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// crie um atributo que recebe o valor recuperado aqui
				// Agora vá para o arquivo routes/usuario.js
				fkUsuarioServer: fkUsuarioVar,
				fkGaragemServer: fkGaragemVar,
				fkMotoServer: fkMotoVar,
			}),
		})
			.then(function (resposta) {
				console.log("resposta: ", resposta);

				if (resposta.ok) {
					motosNaGaragem.push(motosNaLoja[indexAtualLoja]);
					possuiMoto.push(0);

					atualizarValorGaragem();
					fecharModais();
					// alertaErro.style.display = "flex";

					// mensagem_erro.innerHTML = "Moto adicionada a sua garagem...";
				} else {
					throw "Houve um erro ao adicionar a moto na garagem!";
				}
			})
			.catch(function (resposta) {
				console.log(`#ERRO: ${resposta}`);
			});
		return false;
	} else if (indiceModelo != -1) {
		fetch("/garagens/deletar", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// crie um atributo que recebe o valor recuperado aqui
				// Agora vá para o arquivo routes/usuario.js
				fkUsuarioServer: fkUsuarioVar,
				fkGaragemServer: fkGaragemVar,
				fkMotoServer: fkMotoVar,
			}),
		})
			.then(function (resposta) {
				console.log("resposta: ", resposta);

				if (resposta.ok) {
					motosNaGaragem.splice(indiceModelo, 1);
					possuiMoto.splice(indiceModelo, 1);

					atualizarValorGaragem();
					fecharModais();
					// alertaErro.style.display = "flex";

					// mensagem_erro.innerHTML = "Moto removida da sua garagem...";
				} else {
					throw "Houve um erro ao remover a moto da garagem!";
				}
			})
			.catch(function (resposta) {
				console.log(`#ERRO: ${resposta}`);
			});
		return false;
	}
}

//
// 		FUNÇÕES GLOBAIS

//FUNÇÃO MOSTRA INFORMAÇÕES SOBRE VALOR DA GARAGEM
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
	sessionStorage.clear();
	window.location.href = "./index.html";
}

// 		SELEÇÃO DE TELAS
function trocarTela(tela) {
	var entrada = document.getElementById("telaEntrada");
	var loja = document.getElementById("telaLoja");
	var garagem = document.getElementById("telaGaragem");
	var modalDetalhes = document.getElementById("modalDetalhesMoto");
	var userSession =
		sessionStorage.NOME_USUARIO +
		` ` +
		sessionStorage.SOBRENOME_USUARIO[0] +
		`.`;
	var cidadeSession = sessionStorage.CIDADE_USUARIO;

	entrada.style = "display: none;";
	loja.style = "display: none;";
	garagem.style = "display: none;";
	modalDetalhes.style = "display: none;";

	if (tela == "entrada") {
		entrada.style = "display: flex;";
	} else if (tela == "loja") {
		var username = document.getElementById("userNomeLoja");
		var cidade = document.getElementById("userCidadeLoja");
		username.innerHTML = userSession.toUpperCase();
		cidade.innerHTML = cidadeSession.toUpperCase();

		indexAtualLoja = motosNaLoja.length - 1;
		proximaMoto(`loja`);
		loja.style = "display: block;";
	} else if (tela == "garagem") {
		var username = document.getElementById("userNomeGaragem");
		var cidade = document.getElementById("userCidadeGaragem");
		username.innerHTML = userSession.toUpperCase();
		cidade.innerHTML = cidadeSession.toUpperCase();

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
		arrayMotos = motosNaLoja;
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
	imagemMotoAtual.classList = `motoLeftOut`;

	imagemMotoOut.src = `./assets/motos/${arrayMotos[indiceAtual]}.png`;
	imagemMotoOut.style = `margin-right: 1500px; margin-left: 0; display: block`;
	imagemMotoOut.classList = `motoLeftIn`;

	mudarValoresModal(locate, arrayMotos[indiceAtual]);

	setTimeout(() => {
		imagemMotoAtual.src = `./assets/motos/${arrayMotos[indiceAtual]}.png`;
		imagemMotoAtual.setAttribute("class", arrayMotos[indiceAtual]);
		imagemMotoAtual.style = `display: block`;

		imagemMotoOut.classList = ``;
		imagemMotoOut.style = `display: none`;

		executandoAnimacao = 0;

		if (locate == "loja") {
			modalEspecificacoes.style = `display: flex`;
		}
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
		arrayMotos = motosNaLoja;
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
	imagemMotoAtual.classList = `motoRightOut`;

	imagemMotoOut.src = `./assets/motos/${arrayMotos[indiceAtual]}.png`;
	imagemMotoOut.style = `margin-right: 0; margin-left:1500px; display: block`;
	imagemMotoOut.classList = `motoRightIn`;

	mudarValoresModal(locate, arrayMotos[indiceAtual]);

	setTimeout(() => {
		imagemMotoAtual.src = `./assets/motos/${arrayMotos[indiceAtual]}.png`;
		imagemMotoAtual.setAttribute("class", arrayMotos[indiceAtual]);
		imagemMotoAtual.style = `display: block`;

		imagemMotoOut.classList = ``;
		imagemMotoOut.style = `display: none`;

		executandoAnimacao = 0;

		if (locate == "loja") {
			modalEspecificacoes.style = `display: flex`;
		}
	}, 900);
}

//
function atualizarMotosGaragem(data) {
	var motos = JSON.parse(data);

	for (contador = 0; contador < motos.length; contador++) {
		var indexMoto = motos[contador];

		if (indexMoto.modelo == "Shadow 750") {
			motosNaGaragem.push(`shadow-750`);
			possuiMoto.push(indexMoto.motoComprada);
		} else if (indexMoto.modelo == "Shadow 600") {
			motosNaGaragem.push(`shadow-600`);
			possuiMoto.push(indexMoto.motoComprada);
		} else if (indexMoto.modelo == "Boulevard 800") {
			motosNaGaragem.push(`boulevard-800`);
			possuiMoto.push(indexMoto.motoComprada);
		} else if (indexMoto.modelo == "Virago 535") {
			motosNaGaragem.push(`virago-535`);
			possuiMoto.push(indexMoto.motoComprada);
		} else if (indexMoto.modelo == "Dragstar 650") {
			motosNaGaragem.push(`dragstar-650`);
			possuiMoto.push(indexMoto.motoComprada);
		} else if (indexMoto.modelo == "Midnight 950") {
			motosNaGaragem.push(`midnight-950`);
			possuiMoto.push(indexMoto.motoComprada);
		} else if (indexMoto.modelo == "Vulcan 900") {
			motosNaGaragem.push(`vulcan-900`);
			possuiMoto.push(indexMoto.motoComprada);
		}
	}
	console.log(`motos na garagem ${motosNaGaragem}`);
}

function atualizarMotosLoja(data) {
	var motos = JSON.parse(data);

	for (contador = 0; contador < motos.length; contador++) {
		var indexMoto = motos[contador];

		if (indexMoto.modelo == "Shadow 750") {
			motosNaLoja.push(`shadow-750`);
			shadow750 = motos[contador];
		} else if (indexMoto.modelo == "Shadow 600") {
			motosNaLoja.push(`shadow-600`);
			shadow600 = motos[contador];
		} else if (indexMoto.modelo == "Boulevard 800") {
			motosNaLoja.push(`boulevard-800`);
			boulevard800 = motos[contador];
		} else if (indexMoto.modelo == "Virago 535") {
			motosNaLoja.push(`virago-535`);
			virago535 = motos[contador];
		} else if (indexMoto.modelo == "Dragstar 650") {
			motosNaLoja.push(`dragstar-650`);
			dragstar650 = motos[contador];
		} else if (indexMoto.modelo == "Midnight 950") {
			motosNaLoja.push(`midnight-950`);
			midnight950 = motos[contador];
		} else if (indexMoto.modelo == "Vulcan 900") {
			motosNaLoja.push(`vulcan-900`);
			vulcan900 = motos[contador];
		}
	}
	console.log(`motos na loja ${motosNaLoja}`);
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
	var correcaoString =
		valorGaragem[valorGaragem.length - 3] +
		valorGaragem[valorGaragem.length - 2] +
		valorGaragem[valorGaragem.length - 1];
	var correcaoPreco = valorGaragem.replace(
		correcaoString,
		"." + correcaoString
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

		var checkMoto = document.getElementById("modeloCheck");
		var botaoCompra = document.getElementById("botaoComprar");
		var botaoVenda = document.getElementById("botaoVender");
		imagem.src = `./assets/motos/${value}.png`;
	}

	var motoAtualPreco = motoAtual.preco.toString();
	var correcaoPreco = motoAtualPreco.replace(
		motoAtualPreco[motoAtualPreco.length - 4],
		motoAtualPreco[motoAtualPreco.length - 4] + "."
	);
	preco.innerHTML = "R$ " + correcaoPreco + ",00";

	logo.src = `./assets/logomarcas/logo-${motoAtual.marca}.png`;
	marca.innerHTML = motoAtual.marca;
	modelo.innerHTML = motoAtual.modelo;
	cilindrada.innerHTML = motoAtual.cilindrada;
	potencia.innerHTML = motoAtual.potencia;
	torque.innerHTML = motoAtual.torque;
	consumo.innerHTML = motoAtual.consumo;
	tanque.innerHTML = motoAtual.tanque;
	if (locate == "garagem" && possuiMoto[indexAtual] == 0) {
		botaoVenda.style = "display: none;";
		botaoCompra.style = "display: flex;";
		checkMoto.src = "./assets/icones/buyed.png";
		checkMoto.style = "filter: opacity(30%);";
	} else if (locate == "garagem" && possuiMoto[indexAtual] == 1) {
		botaoVenda.style = "display: flex;";
		botaoCompra.style = "display: none;";
		checkMoto.src = "./assets/icones/buyed-check.png";
		checkMoto.style = "filter: brightness(90%);";
	}
}

//
// DECLARAÇÃO DAS VARIAVEIS GLOBAIS
var executandoAnimacao = 0;
var possuiMoto = [];

var indexAtual = 0;
var motosNaGaragem = [];

var indexAtualLoja = 0;
var motosNaLoja = [];

//
// DECLARAÇÃO DOS OBJETOS MOTOS
var shadow750 = {};

var shadow600 = {};

var boulevard800 = {};

var virago535 = {};

var dragstar650 = {};

var midnight950 = {};

var vulcan900 = {};

var motosGaragem = sessionStorage.MOTOS_USUARIO;
var motosLoja = sessionStorage.MOTOS_LOJA;
atualizarMotosGaragem(motosGaragem);
atualizarMotosLoja(motosLoja);
