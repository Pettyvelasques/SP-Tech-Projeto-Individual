var idUsuario = sessionStorage.ID_USUARIO;
var idGaragem = sessionStorage.ID_GARAGEM;
console.log(idUsuario);
console.log(idGaragem);

var userSession =
	sessionStorage.NOME_USUARIO + sessionStorage.SOBRENOME_USUARIO[0] + `.`;
nomeUsuario.innerHTML = userSession.toUpperCase();

function obterDadosDash() {
	console.log(`entrei na funcao obter dados da dashboard`);
	fetch(`/medidas/obterDadosDash`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			fkUsuarioServer: idUsuario,
			fkGaragemServer: idGaragem,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO entrar()!");

			if (resposta.ok) {
				console.log(`resposta: ${resposta}`);

				resposta.json().then((json) => {
					var quantMotosGaragem = json.quantGaragem;
					var quantMotosCompradas = json.quantComprada;
					var precoMotosGaragem = json.valorGaragem;
					var precoMotosCompradas = json.valorComprada;
					var motosGaragem = json.motosGaragem;
					var motosNaLoja = json.motosLoja;

					atualizaDashPerfil(
						quantMotosGaragem,
						quantMotosCompradas,
						precoMotosGaragem,
						precoMotosCompradas
					);
					filtrarDadosDash(motosGaragem);
					atualizarGraficos(motosNaLoja);
				});
			} else {
				console.log("Houve um erro ao realizar os selects!");

				resposta.text().then((texto) => {
					console.error(texto);
				});
			}
		})
		.catch(function (erro) {
			console.log(erro);
		});
	return false;
}

function atualizarGraficos(data) {
	console.log(`entrei na funcao atualizar dados dos gráficos`);
	var motos = data;

	for (contador = 0; contador < motos.length; contador++) {
		var indexMoto = motos[contador];

		labelGraficos.push(indexMoto.modelo);
		var ccPotencia = indexMoto.cilindrada / indexMoto.potencia;
		dadosCcPotencia.push(ccPotencia.toFixed(0));
		var ccTorque = indexMoto.cilindrada / indexMoto.torque;
		dadosCcTorque.push(ccTorque.toFixed(0));
		var rsPotencia = indexMoto.preco / indexMoto.potencia;
		dadosRsPotencia.push(rsPotencia.toFixed(0));
		var rsTorque = indexMoto.preco / indexMoto.torque;
		dadosRsTorque.push(rsTorque.toFixed(0));
	}
	plotarGraficos(graficccPotencia, dadosCcPotencia);
	plotarGraficos(graficccTorque, dadosCcTorque);
	plotarGraficos(graficrsPotencia, dadosRsPotencia);
	plotarGraficos(graficrsTorque, dadosRsTorque);
}

function plotarGraficos(locate, dados) {
	console.log(`entrei na funcao para plotar os gráficos`);
	new Chart(locate, {
		type: "bar",
		data: {
			labels: labelGraficos,
			datasets: [
				{
					label: "",
					data: dados,
					backgroundColor: "#584634",
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
			plugins: {
				legend: {
					position: "none",
				},
			},
		},
	});
}

function atualizaDashPerfil(
	quantMotosGaragem,
	quantMotosCompradas,
	precoMotosGaragem,
	precoMotosCompradas
) {
	console.log(`entrei na funcao atualizar dados do perfil da dash`);
	var total = document.getElementById("totalMotos");
	var compradas = document.getElementById("totalCompradas");
	var valorTotal = document.getElementById("valorMotos");
	var valorCompradas = document.getElementById("valorInvestido");

	var valorGaragemTotal = precoMotosGaragem.toString();
	var correcaoString =
		valorGaragemTotal[valorGaragemTotal.length - 3] +
		valorGaragemTotal[valorGaragemTotal.length - 2] +
		valorGaragemTotal[valorGaragemTotal.length - 1];
	var correcaoPrecoTotal = valorGaragemTotal.replace(
		correcaoString,
		"." + correcaoString
	);

	var valorGaragemCompradas = precoMotosCompradas.toString();
	var correcaoString =
		valorGaragemCompradas[valorGaragemCompradas.length - 3] +
		valorGaragemCompradas[valorGaragemCompradas.length - 2] +
		valorGaragemCompradas[valorGaragemCompradas.length - 1];
	var correcaoPrecoCompradas = valorGaragemCompradas.replace(
		correcaoString,
		"." + correcaoString
	);

	total.innerText = quantMotosGaragem;
	compradas.innerText = quantMotosCompradas;
	valorTotal.innerText = correcaoPrecoTotal;
	valorCompradas.innerText = correcaoPrecoCompradas;
}

function filtrarDadosDash(motosGaragem) {
	console.log(`entrei na funcao filtrar dados da dash`);
	var motos = motosGaragem;
	var cara = ["", 0];
	var maior = ["", 0];
	var economica = ["", 0];
	var barata = ["", 0];
	var menor = ["", 0];
	var autonoma = ["", 0];

	for (contador = 0; contador < motos.length; contador++) {
		var indexMoto = motos[contador];

		if (indexMoto.preco > cara[1]) {
			var valorMotoAtual = indexMoto.preco.toString();
			var correcaoString =
				valorMotoAtual[valorMotoAtual.length - 3] +
				valorMotoAtual[valorMotoAtual.length - 2] +
				valorMotoAtual[valorMotoAtual.length - 1];
			var correcaoPrecoAtual = valorMotoAtual.replace(
				correcaoString,
				"." + correcaoString
			);

			cara[0] = indexMoto.modelo;
			cara[1] = correcaoPrecoAtual;
		}
		if (indexMoto.cilindrada > maior[1]) {
			maior[0] = indexMoto.modelo;
			maior[1] = indexMoto.cilindrada;
		}
		if (indexMoto.consumo > economica[1]) {
			economica[0] = indexMoto.modelo;
			economica[1] = indexMoto.consumo;
		}
		if (barata[1] == 0) {
			var valorMotoAtual = indexMoto.preco.toString();
			var correcaoString =
				valorMotoAtual[valorMotoAtual.length - 3] +
				valorMotoAtual[valorMotoAtual.length - 2] +
				valorMotoAtual[valorMotoAtual.length - 1];
			var correcaoPrecoAtual = valorMotoAtual.replace(
				correcaoString,
				"." + correcaoString
			);

			barata[0] = indexMoto.modelo;
			barata[1] = correcaoPrecoAtual;
		} else if (indexMoto.preco < barata[1]) {
			var valorMotoAtual = indexMoto.preco.toString();
			var correcaoString =
				valorMotoAtual[valorMotoAtual.length - 3] +
				valorMotoAtual[valorMotoAtual.length - 2] +
				valorMotoAtual[valorMotoAtual.length - 1];
			var correcaoPrecoAtual = valorMotoAtual.replace(
				correcaoString,
				"." + correcaoString
			);

			barata[0] = indexMoto.modelo;
			barata[1] = correcaoPrecoAtual;
		}
		if (menor[1] == 0) {
			menor[0] = indexMoto.modelo;
			menor[1] = indexMoto.cilindrada;
		} else if (indexMoto.cilindrada < menor[1]) {
			menor[0] = indexMoto.modelo;
			menor[1] = indexMoto.cilindrada;
		}

		var autonomia = indexMoto.tanque * indexMoto.consumo;
		if (autonomia > autonoma[1]) {
			autonoma[0] = indexMoto.modelo;
			autonoma[1] = autonomia;
		}
		atualizaDashGaragem(cara, maior, economica, barata, menor, autonoma);
	}
}

function atualizaDashGaragem(cara, maior, economica, barata, menor, autonoma) {
	console.log(`entrei na funcao atualizar dados da garagem da dash`);
	var nomeMaisCara = document.getElementById("motoMaisCara");
	var valorMaisCara = document.getElementById("precoMaisCara");
	nomeMaisCara.innerHTML = cara[0];
	valorMaisCara.innerHTML = cara[1];

	var nomeMaior = document.getElementById("motoMaiorCilindrada");
	var valorMaior = document.getElementById("ccMaiorMoto");
	nomeMaior.innerHTML = maior[0];
	valorMaior.innerHTML = maior[1];

	var nomeMaisEconomica = document.getElementById("motoMaisEconomica");
	var valorMaisEconomica = document.getElementById("consumoMaisEconomica");
	nomeMaisEconomica.innerHTML = economica[0];
	valorMaisEconomica.innerHTML = economica[1];

	var nomeMaisBarata = document.getElementById("motoMaisBarata");
	var valorMaisBarata = document.getElementById("precoMaisBarata");
	nomeMaisBarata.innerHTML = barata[0];
	valorMaisBarata.innerHTML = barata[1];

	var nomeMenor = document.getElementById("motoMenorCilindrada");
	var valorMenor = document.getElementById("ccMenorMoto");
	nomeMenor.innerHTML = menor[0];
	valorMenor.innerHTML = menor[1];

	var nomeMaiorAutonomia = document.getElementById("motoMaiorAutonomia");
	var valorMaiorAutonomia = document.getElementById("autonomia");
	nomeMaiorAutonomia.innerHTML = autonoma[0];
	valorMaiorAutonomia.innerHTML = autonoma[1];
}
function toGarage() {
	window.location.href = "../garagem.html";
}

window.onload = obterDadosDash();
