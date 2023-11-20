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
		}, 1000);
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

function sumirMensagem() {
	alertaErro.style.display = "none";
}

function logar() {
	var username = document.getElementById("inputUsernameLogin");
	var password = document.getElementById("inputSenhaLogin");

	if (
		username.value == usuarioPatrick.username &&
		password.value == usuarioPatrick.senha
	) {
		window.location.href = "../garagem.html";
	} else {
		console.log(`erro ao logar, usuario e/ou senha invalido(s)`);
	}
}

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

//
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

// DECLARAÇÃO DOS OBJETOS
const usuarioPatrick = {
	username: "pettyvelasques",
	senha: "pet123",
};
