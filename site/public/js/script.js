//
// FUNÇÃO DE MENU DO HEADER
function menu() {
	var hamburguer = document.getElementById("menuHamburguer");
	var close = document.getElementById("closeMenuNavbar");
	var menu = document.getElementById("menuOpcoes");

	if (close.style.display != "block") {
		hamburguer.style = "display: none;";
		menu.style = "display: flex;";
		menu.classList = `menuOn`;

		setTimeout(() => {
			close.style = "display: block;";
			menu.classList = ``;
		}, 1000);
	} else if (close.style.display == "block") {
		close.style = "display: none;";
		menu.classList = `menuOff`;

		setTimeout(() => {
			menu.style = "display: none;";
			hamburguer.style = "display: flex;";
			menu.classList = ``;
		}, 950);
	}
}

//
// FUNÇÕES DA SEÇÃO LOGIN/CADASTRO

function cadastrar() {
	//Recupere o valor da nova input pelo nome do id
	// Agora vá para o método fetch logo abaixo
	var usuarioVar = usuarioCadastro.value;
	var nomeVar = nomeCadastro.value;
	var sobrenomeVar = sobrenomeCadastro.value;
	var cidadeVar = cidadeCadastro.value;
	var emailVar = emailCadastro.value;
	var senhaVar = senhaCadastro.value;
	var confirmacaoSenhaVar = confimarSenha.value;
	if (usuarioVar.length <= 1) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Nome do usuário inválido<br><br>O campo usuário deve conter mais de 01 caractere";

		return false;
	} else if (nomeVar.length <= 1) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Nome inválido<br><br>O campo nome deve conter mais de 01 caractere";

		return false;
	} else if (sobrenomeVar.length <= 1) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Sobrenome inválido<br><br>O campo sobrenome deve conter mais de 01 caractere";

		return false;
	} else if (cidadeVar.length <= 1) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Cidade inválida<br><br>O campo cidade deve conter mais de 01 caractere";

		return false;
	} else if (emailVar.indexOf("@") < 0 || emailVar.indexOf(".") < 0) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Email inválido<br><br>O email deve conter os caracteres @ e .";

		return false;
	} else if (senhaVar.length <= 5) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"senha inválido<br><br>A senha deve conter ao menos 06 caracteres";

		return false;
		lit;
	} else if (confirmacaoSenhaVar != senhaVar) {
		alertaErro.style.display = "flex";
		mensagem_erro.innerHTML =
			"Confirmação de senha inválida<br><br>Ambas as senhas devem ser iguais";

		return false;
	} else {
		setInterval(sumirMensagem, 4000);
	}

	// Enviando o valor da nova input
	fetch("/usuarios/cadastrar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			// crie um atributo que recebe o valor recuperado aqui
			// Agora vá para o arquivo routes/usuario.js
			usuarioServer: usuarioVar,
			nomeServer: nomeVar,
			sobrenomeServer: sobrenomeVar,
			cidadeServer: cidadeVar,
			emailServer: emailVar,
			senhaServer: senhaVar,
		}),
	})
		.then(function (resposta) {
			console.log("resposta: ", resposta);

			if (resposta.ok) {
				alertaErro.style.display = "flex";

				mensagem_erro.innerHTML =
					"Cadastro realizado com sucesso! Redirecionando para tela de Login...";

				setTimeout(() => {
					loginCadastro(`login`);
				}, "2000");

				limparFormulario();
			} else {
				throw "Houve um erro ao tentar realizar o cadastro!";
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});

	return false;
}

function entrar() {
	var usernameVar = inputUsernameLogin.value;
	var senhaVar = inputSenhaLogin.value;

	if (usernameVar == "" || senhaVar == "") {
		cardErro.style.display = "block";
		mensagem_erro.innerHTML = "usuário e/ou senha inválidos!";
		return false;
	} else {
		setInterval(sumirMensagem, 5000);
	}

	console.log("FORM LOGIN: ", usernameVar);
	console.log("FORM SENHA: ", senhaVar);

	fetch("/usuarios/autenticar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			usernameServer: usernameVar,
			senhaServer: senhaVar,
		}),
	})
		.then(function (resposta) {
			console.log("ESTOU NO THEN DO entrar()!");

			if (resposta.ok) {
				console.log(resposta);

				resposta.json().then((json) => {
					sessionStorage.ID_USUARIO = json.id;
					sessionStorage.USERNAME_USUARIO = json.username;
					sessionStorage.NOME_USUARIO = json.nome;
					sessionStorage.SOBRENOME_USUARIO = json.sobrenome;
					sessionStorage.CIDADE_USUARIO = json.cidade;
					sessionStorage.ID_GARAGEM = json.idGaragem;
					sessionStorage.MOTOS_USUARIO = JSON.stringify(json.motosUsuario);
					sessionStorage.MOTOS_LOJA = JSON.stringify(json.motosLoja);

					setTimeout(function () {
						window.location = "./garagem.html";
					}, 1000); // apenas para exibir o loading
				});
			} else {
				console.log("Houve um erro ao tentar realizar o login!");

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

function sumirMensagem() {
	alertaErro.style.display = "none";
}

// ANTIGA FUNÇÃO DE LOGIN, ANTES DE CONECTAR O BANCO DE DADOS
// function logar() {
// 	var username = document.getElementById("inputUsernameLogin");
// 	var password = document.getElementById("inputSenhaLogin");

// 	if (
// 		username.value == usuarioPatrick.username &&
// 		password.value == usuarioPatrick.senha
// 	) {
// 		window.location.href = "../garagem.html";
// 	} else {
// 		console.log(`erro ao logar, usuario e/ou senha invalido(s)`);
// 	}
// }

// FUNÇÃO PARA EXIBIR/OCULTAR SENHA NA TELA DE LOGIN
function mostrarSenha() {
	var icone = document.getElementById("eyePassword");
	var inputSenha = document.getElementById("inputSenhaLogin");

	if (inputSenha.getAttribute("type") == "password") {
		inputSenha.setAttribute("type", "text");
		icone.src = "../assets/icones/hide-password-icon.png";
	} else if (inputSenha.getAttribute("type") == "text") {
		inputSenha.setAttribute("type", "password");
		icone.src = "../assets/icones/show-password-icon.png";
	} else {
		console.log(
			`erro ao resgatar tipo da input de senha... valor da variavel ${inputSenha.getAttribute(
				"type"
			)}`
		);
	}
}

//FUNCAO PARA ALTERNAR TELA ENTRE LOGIN E CADASTRO
function loginCadastro(tela) {
	var cadastro = document.getElementById("containerCadastro");
	var login = document.getElementById("containerLogin");
	var loginCadastro = document.getElementById("telaLoginCadastro");

	cadastro.style = "display: none;";
	login.style = "display: none;";

	if (tela == "login") {
		login.style = "display: flex;";
		loginCadastro.style = "justify-content: start;";
	} else if (tela == "cadastro") {
		cadastro.style = "display: flex;";
		loginCadastro.style = "justify-content: end;";
	} else {
		console.log(
			`erro ao identificar tela de direcionamento... valor da variavel${tela}`
		);
	}
}

// SEÇÃO CARROSSEL PAISAGENS
var indexAtual = 0;
var sentido = 1;
var totalItems = document.querySelectorAll(".carrosselItem").length;
var carrossel = document.getElementById("carrossel");

function atualizarSlide() {
	carrossel.style.transform = "translateX(" + -indexAtual * 100 + "%)";
}

function proximoSlide() {
	if (indexAtual < totalItems && sentido == 1) {
		indexAtual = (indexAtual + 1) % totalItems;
	} else if (indexAtual > 0 && sentido == 0) {
		indexAtual = (indexAtual - 1 + totalItems) % totalItems;
	}

	if (indexAtual == totalItems - 1) {
		sentido = 0;
	} else if (indexAtual == 0) {
		sentido = 1;
	}
	atualizarSlide();
}
setInterval(proximoSlide, 3000);

// SEÇÃO CARROSSEL MINHAS VIAGENS MOTO
var indexAtual2 = 0;
var sentido2 = 1;
var totalItems2 = document.querySelectorAll(".carrosselItem2").length;
var carrosselAutor = document.getElementById("carrosselAutor");

function atualizarSlide2() {
	carrosselAutor.style.transform = "translateX(" + -indexAtual * 100 + "%)";
}

function proximoSlide2() {
	if (indexAtual2 < totalItems2 && sentido2 == 1) {
		indexAtual2 = (indexAtual2 + 1) % totalItems2;
	} else if (indexAtual2 > 0 && sentido2 == 0) {
		indexAtual2 = (indexAtual2 - 1 + totalItems2) % totalItems2;
	}

	if (indexAtual2 == totalItems2 - 1) {
		sentido2 = 0;
	} else if (indexAtual2 == 0) {
		sentido2 = 1;
	}
	atualizarSlide2();
}
setInterval(proximoSlide2, 3000);
